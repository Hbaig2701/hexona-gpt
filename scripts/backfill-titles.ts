// One-off: backfill titles for conversations that have at least one user+assistant
// exchange but no title. Safe to run multiple times - skips conversations that
// already got a title in the meantime.
//
// Usage: npx tsx --env-file=.env scripts/backfill-titles.ts
//
// Cost note: each title is one Haiku call (~30 output tokens). 64 untitled
// conversations ≈ $0.01 total - negligible.
import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "../lib/db/prisma";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

(async () => {
  const untitled = await prisma.conversation.findMany({
    where: {
      title: null,
      messages: { some: { role: "ASSISTANT" } },
    },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
        take: 2,
        select: { role: true, content: true },
      },
    },
  });

  console.log(`Found ${untitled.length} untitled conversations with at least one assistant reply.`);

  let succeeded = 0;
  let skipped = 0;
  let failed = 0;

  for (const conv of untitled) {
    const userMsg = conv.messages.find((m) => m.role === "USER");
    const aiMsg = conv.messages.find((m) => m.role === "ASSISTANT");
    if (!userMsg || !aiMsg) {
      skipped++;
      continue;
    }

    try {
      const res = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 30,
        messages: [{
          role: "user",
          content: `Generate a very short title (max 5 words) for this conversation. Just the title, nothing else.\n\nUser: ${userMsg.content.slice(0, 200)}\nAI: ${aiMsg.content.slice(0, 200)}`,
        }],
      });
      const title = (res.content[0] as { text: string }).text?.trim().replace(/^["']|["']$/g, "");
      if (!title) {
        failed++;
        continue;
      }
      const result = await prisma.conversation.updateMany({
        where: { id: conv.id, title: null },
        data: { title },
      });
      if (result.count > 0) {
        succeeded++;
        console.log(`  ${conv.id} -> "${title}"`);
      } else {
        skipped++;
      }
    } catch (err) {
      failed++;
      console.error(`  ${conv.id}: ${(err as Error).message}`);
    }
  }

  console.log(`\nDone. Succeeded: ${succeeded}, skipped: ${skipped}, failed: ${failed}`);
  await prisma.$disconnect();
})();
