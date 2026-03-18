import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/db/prisma";
import { indexDocument, deleteDocumentChunks } from "@/lib/ai/rag";

export const dynamic = "force-dynamic";

// GET: Check knowledge base health for this GPT
export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  const { slug } = await params;

  const docs = await prisma.knowledgeDocument.findMany({
    where: { gptSlug: slug },
    select: {
      id: true,
      name: true,
      content: true,
      _count: { select: { chunks: true } },
    },
  });

  const results = docs.map((doc) => ({
    id: doc.id,
    name: doc.name,
    contentLength: doc.content.length,
    chunkCount: doc._count.chunks,
    needsReindex: doc._count.chunks === 0 && doc.content.length > 0,
  }));

  return NextResponse.json({
    gptSlug: slug,
    totalDocs: docs.length,
    totalChunks: results.reduce((sum, d) => sum + d.chunkCount, 0),
    docsNeedingReindex: results.filter((d) => d.needsReindex).length,
    documents: results,
  });
}

// POST: Re-index all documents for this GPT
export async function POST(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  const { slug } = await params;

  const docs = await prisma.knowledgeDocument.findMany({
    where: { gptSlug: slug },
    select: { id: true, name: true },
  });

  const results = [];
  for (const doc of docs) {
    try {
      // Delete existing chunks first
      await deleteDocumentChunks(doc.id);
      // Re-index
      const chunkCount = await indexDocument(doc.id);
      results.push({ id: doc.id, name: doc.name, chunkCount, status: "success" });
    } catch (error) {
      results.push({ id: doc.id, name: doc.name, chunkCount: 0, status: "failed", error: String(error) });
    }
  }

  return NextResponse.json({
    gptSlug: slug,
    reindexed: results.filter((r) => r.status === "success").length,
    failed: results.filter((r) => r.status === "failed").length,
    documents: results,
  });
}
