import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/db/prisma";
import { GPT_CATALOG } from "@/lib/gpt-catalog";

export const dynamic = "force-dynamic";
export async function GET() {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  // Get all GPT configs from DB
  const configs = await prisma.gptConfig.findMany({
    include: {
      _count: { select: { knowledgeDocs: true, promptVersions: true } },
    },
  });

  // Merge with catalog for any that don't have DB configs yet
  const configMap = new Map(configs.map((c) => [c.gptSlug, c]));

  const result = GPT_CATALOG.map((gpt) => ({
    ...gpt,
    config: configMap.get(gpt.slug) || null,
  }));

  return NextResponse.json(result);
}
