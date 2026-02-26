import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/db/prisma";
import { getDefaultSystemPrompt } from "@/lib/ai/system-prompts";

export const dynamic = "force-dynamic";
export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  const { slug } = await params;

  const config = await prisma.gptConfig.findUnique({
    where: { gptSlug: slug },
    include: {
      promptVersions: { orderBy: { savedAt: "desc" }, take: 10 },
      knowledgeDocs: {
        select: { id: true, name: true, uploadedAt: true, _count: { select: { chunks: true } } },
      },
    },
  });

  if (!config) {
    // Return default config structure
    return NextResponse.json({
      gptSlug: slug,
      systemPrompt: getDefaultSystemPrompt(slug),
      isActive: true,
      modelOverride: null,
      temperature: null,
      badge: null,
      suggestedPrompts: [],
      promptVersions: [],
      knowledgeDocs: [],
    });
  }

  return NextResponse.json(config);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  const { slug } = await params;
  const body = await req.json();

  const config = await prisma.gptConfig.upsert({
    where: { gptSlug: slug },
    create: {
      gptSlug: slug,
      systemPrompt: body.systemPrompt || getDefaultSystemPrompt(slug),
      isActive: body.isActive ?? true,
      modelOverride: body.modelOverride || null,
      temperature: body.temperature ?? null,
      badge: body.badge || null,
      suggestedPrompts: body.suggestedPrompts || [],
    },
    update: {
      systemPrompt: body.systemPrompt,
      isActive: body.isActive,
      modelOverride: body.modelOverride,
      temperature: body.temperature,
      badge: body.badge,
      suggestedPrompts: body.suggestedPrompts,
    },
  });

  // Save prompt version if system prompt changed
  if (body.systemPrompt) {
    await prisma.promptVersion.create({
      data: {
        gptSlug: slug,
        prompt: body.systemPrompt,
      },
    });
  }

  return NextResponse.json(config);
}
