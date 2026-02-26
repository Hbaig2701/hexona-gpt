import OpenAI from "openai";
import { prisma } from "@/lib/db/prisma";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text.slice(0, 8000), // Limit input size
  });
  return response.data[0].embedding;
}

export function chunkText(text: string, chunkSize = 500, overlap = 50): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];

  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    const chunk = words.slice(i, i + chunkSize).join(" ");
    if (chunk.trim()) chunks.push(chunk.trim());
  }

  return chunks;
}

export async function indexDocument(documentId: string): Promise<number> {
  const doc = await prisma.knowledgeDocument.findUnique({
    where: { id: documentId },
  });

  if (!doc) throw new Error("Document not found");

  const chunks = chunkText(doc.content);

  // Process chunks in batches
  let chunkIndex = 0;
  for (const chunk of chunks) {
    const embedding = await generateEmbedding(chunk);

    // Use raw SQL for pgvector insert
    await prisma.$executeRaw`
      INSERT INTO "KnowledgeChunk" (id, "documentId", content, embedding, "chunkIndex")
      VALUES (${`chunk-${documentId}-${chunkIndex}`}, ${documentId}, ${chunk}, ${embedding}::vector, ${chunkIndex})
    `;

    chunkIndex++;
  }

  return chunkIndex;
}

export async function searchKnowledgeChunks(
  gptSlug: string,
  query: string,
  topK = 3
): Promise<{ content: string; score: number }[]> {
  const queryEmbedding = await generateEmbedding(query);

  // Use pgvector similarity search
  const results = await prisma.$queryRaw<{ content: string; score: number }[]>`
    SELECT kc.content, 1 - (kc.embedding <=> ${queryEmbedding}::vector) as score
    FROM "KnowledgeChunk" kc
    JOIN "KnowledgeDocument" kd ON kc."documentId" = kd.id
    WHERE kd."gptSlug" = ${gptSlug}
    ORDER BY kc.embedding <=> ${queryEmbedding}::vector
    LIMIT ${topK}
  `;

  return results.filter((r) => r.score > 0.3); // Filter low relevance
}

export async function deleteDocumentChunks(documentId: string): Promise<void> {
  await prisma.$executeRaw`
    DELETE FROM "KnowledgeChunk" WHERE "documentId" = ${documentId}
  `;
}
