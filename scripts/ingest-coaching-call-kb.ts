import "dotenv/config";
import fs from "fs";

/**
 * Ingests the coaching-call knowledge documents and indexes them for RAG.
 *
 * Mirrors lib/ai/rag.ts exactly: same chunk size (500 words, 50 overlap), same
 * embedding model, same chunk id scheme. Goes over the REST API rather than
 * Prisma because the direct Postgres host is not reachable from here.
 *
 *   npx tsx --env-file=.env scripts/ingest-coaching-call-kb.ts          (dry run)
 *   npx tsx --env-file=.env scripts/ingest-coaching-call-kb.ts --write  (ingest)
 */

const WRITE = process.argv.includes("--write");
const SUPABASE_URL = process.env.SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!;

const DOCS = [
  {
    gptSlug: "workflow",
    name: "GHL_KB_Field_Notes_Coaching_Calls.md",
    file: "/tmp/gpts/kb/GHL_KB_Field_Notes_Coaching_Calls.md",
  },
  {
    gptSlug: "sales",
    name: "Sales_Field_Notes_Coaching_Calls.md",
    file: "/tmp/gpts/kb/Sales_Field_Notes_Coaching_Calls.md",
  },
];

function cuid() {
  const rand = () => Math.random().toString(36).slice(2);
  return ("c" + Date.now().toString(36) + rand() + rand()).slice(0, 25);
}

// Identical to chunkText in lib/ai/rag.ts
function chunkText(text: string, chunkSize = 500, overlap = 50): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];
  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    const chunk = words.slice(i, i + chunkSize).join(" ");
    if (chunk.trim()) chunks.push(chunk.trim());
  }
  return chunks;
}

async function embed(text: string): Promise<number[]> {
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: text.slice(0, 8000),
    }),
  });
  if (!res.ok) throw new Error(`embeddings ${res.status} ${await res.text()}`);
  const json = await res.json();
  return json.data[0].embedding;
}

async function rest(p: string, init?: RequestInit) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${p}`, {
    ...init,
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res;
}

async function main() {
  const existing: { gptSlug: string; name: string }[] = await (
    await rest("KnowledgeDocument?select=gptSlug,name")
  ).json();

  for (const doc of DOCS) {
    const already = existing.some(
      (d) => d.gptSlug === doc.gptSlug && d.name === doc.name
    );
    if (already) {
      console.log(`skip (already ingested): ${doc.gptSlug} / ${doc.name}`);
      continue;
    }

    const content = fs.readFileSync(doc.file, "utf8");
    const chunks = chunkText(content);
    console.log(
      `${doc.gptSlug.padEnd(10)} ${doc.name}  ${content.length} chars -> ${chunks.length} chunks`
    );

    if (!WRITE) continue;

    const documentId = cuid();
    await rest("KnowledgeDocument", {
      method: "POST",
      body: JSON.stringify({
        id: documentId,
        gptSlug: doc.gptSlug,
        name: doc.name,
        content,
        uploadedAt: new Date().toISOString(),
      }),
      headers: { Prefer: "return=minimal" },
    });

    let i = 0;
    for (const chunk of chunks) {
      const embedding = await embed(chunk);
      await rest("KnowledgeChunk", {
        method: "POST",
        body: JSON.stringify({
          id: `chunk-${documentId}-${i}`,
          documentId,
          content: chunk,
          embedding: `[${embedding.join(",")}]`,
          chunkIndex: i,
        }),
        headers: { Prefer: "return=minimal" },
      });
      process.stdout.write(`  indexed chunk ${i + 1}/${chunks.length}\r`);
      i++;
    }
    console.log(`  indexed ${i} chunks                    `);
  }

  if (!WRITE) console.log("\nDRY RUN. Re-run with --write to ingest.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
