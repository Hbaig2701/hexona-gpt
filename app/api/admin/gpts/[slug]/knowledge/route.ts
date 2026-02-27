import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/db/prisma";
import { indexDocument, deleteDocumentChunks } from "@/lib/ai/rag";
import { getDefaultSystemPrompt } from "@/lib/ai/system-prompts";

export const dynamic = "force-dynamic";
export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  const { slug } = await params;
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  // Ensure GptConfig exists
  await prisma.gptConfig.upsert({
    where: { gptSlug: slug },
    create: {
      gptSlug: slug,
      systemPrompt: getDefaultSystemPrompt(slug),
    },
    update: {},
  });

  const buffer = Buffer.from(await file.arrayBuffer());
  let content = "";
  const name = file.name.toLowerCase();

  if (name.endsWith(".pdf")) {
    const pdfParse = (await import("pdf-parse")).default;
    const result = await pdfParse(buffer);
    content = result.text;
  } else if (name.endsWith(".docx")) {
    const mammoth = await import("mammoth");
    const result = await mammoth.extractRawText({ buffer });
    content = result.value;
  } else if (name.endsWith(".txt") || name.endsWith(".md")) {
    content = buffer.toString("utf-8");
  } else {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
  }

  const doc = await prisma.knowledgeDocument.create({
    data: {
      gptSlug: slug,
      name: file.name,
      content,
    },
  });

  // Index in background
  try {
    const chunkCount = await indexDocument(doc.id);
    return NextResponse.json({ id: doc.id, name: file.name, chunkCount });
  } catch (error) {
    console.error("Indexing error:", error);
    return NextResponse.json({ id: doc.id, name: file.name, chunkCount: 0, warning: "Indexing failed - pgvector may not be set up" });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const docId = searchParams.get("docId");

  if (!docId) return NextResponse.json({ error: "docId required" }, { status: 400 });

  await params; // consume params

  try {
    await deleteDocumentChunks(docId);
  } catch {
    // pgvector might not be set up
  }

  await prisma.knowledgeDocument.delete({ where: { id: docId } });
  return NextResponse.json({ success: true });
}
