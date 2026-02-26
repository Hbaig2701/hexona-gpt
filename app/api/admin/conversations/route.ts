import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const gptSlug = searchParams.get("gptSlug");
  const userId = searchParams.get("userId");
  const clientId = searchParams.get("clientId");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 20;
  const sort = searchParams.get("sort") || "newest";
  const conversationId = searchParams.get("id");

  // Single conversation detail
  if (conversationId) {
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        user: { select: { name: true, email: true } },
        client: { select: { businessName: true } },
        messages: {
          orderBy: { createdAt: "asc" },
          include: { attachments: true },
        },
      },
    });
    return NextResponse.json(conversation);
  }

  const where: Record<string, unknown> = {};
  if (gptSlug) where.gptSlug = gptSlug;
  if (userId) where.userId = userId;
  if (clientId) where.clientId = clientId;

  const orderBy: Record<string, string> = {};
  if (sort === "oldest") orderBy.createdAt = "asc";
  else orderBy.updatedAt = "desc";

  const [conversations, total] = await Promise.all([
    prisma.conversation.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        user: { select: { name: true, email: true } },
        client: { select: { businessName: true } },
        _count: { select: { messages: true } },
      },
    }),
    prisma.conversation.count({ where }),
  ]);

  return NextResponse.json({ conversations, total, page, totalPages: Math.ceil(total / limit) });
}
