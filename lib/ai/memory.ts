import { prisma } from "@/lib/db/prisma";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function summarizeConversation(
  userId: string,
  gptSlug: string,
  conversationId: string
): Promise<void> {
  const messages = await prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
    take: 30,
  });

  if (messages.length < 2) return;

  const conversation = messages
    .map((m) => `${m.role}: ${m.content.slice(0, 500)}`)
    .join("\n");

  const response = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 200,
    messages: [
      {
        role: "user",
        content: `Summarize the key facts and context from this conversation in 2-3 sentences. Focus on information useful for future conversations. Be concise.\n\n${conversation}`,
      },
    ],
  });

  const summary = (response.content[0] as { type: string; text: string }).text?.trim();
  if (!summary) return;

  await prisma.gptMemory.upsert({
    where: { userId_gptSlug: { userId, gptSlug } },
    create: { userId, gptSlug, memoryBlob: summary },
    update: { memoryBlob: summary },
  });

  // Also save to conversation summary
  await prisma.conversation.update({
    where: { id: conversationId },
    data: { summary },
  });
}
