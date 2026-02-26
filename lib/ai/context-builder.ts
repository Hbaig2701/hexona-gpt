import { prisma } from "@/lib/db/prisma";

interface ContextLayers {
  agencyContext: string;
  memoryContext: string;
  clientContext: string;
  crossGptContext: string;
  ragContext: string;
}

export async function buildContextLayers({
  userId,
  gptSlug,
  clientId,
  userMessage,
}: {
  userId: string;
  gptSlug: string;
  clientId?: string;
  userMessage: string;
}): Promise<ContextLayers> {
  const [profile, memory, client] = await Promise.all([
    // Layer 1: Agency Profile
    prisma.agencyProfile.findUnique({ where: { userId } }),
    // Layer 2: GPT Memory
    prisma.gptMemory.findUnique({ where: { userId_gptSlug: { userId, gptSlug } } }),
    // Layer 3: Client Context
    clientId ? prisma.client.findFirst({ where: { id: clientId, userId } }) : null,
  ]);

  // Layer 1: Agency Profile
  let agencyContext = "";
  if (profile) {
    const parts = [];
    if (profile.niche) parts.push(`Niche: ${profile.niche}`);
    if (profile.location) parts.push(`Location: ${profile.location}`);
    if (profile.services?.length) parts.push(`Services: ${profile.services.join(", ")}`);
    if (profile.monthlyRevenue) parts.push(`Current revenue: ${profile.monthlyRevenue}`);
    if (profile.revenueGoal) parts.push(`Goal: ${profile.revenueGoal}`);
    if (profile.background) parts.push(`Background: ${profile.background}`);
    if (profile.biggestChallenge) parts.push(`Primary challenge: ${profile.biggestChallenge}`);

    if (parts.length > 0) {
      agencyContext = `Agency context: The user runs an AI automation agency. ${parts.join(". ")}.`;
    }
  }

  // Layer 2: GPT Memory
  const memoryContext = memory?.memoryBlob
    ? `From past ${gptSlug} conversations: ${memory.memoryBlob}`
    : "";

  // Layer 3: Client Context
  let clientContext = "";
  if (client) {
    const parts = [`Client: ${client.businessName}`];
    if (client.industry) parts.push(`Industry: ${client.industry}`);
    if (client.website) parts.push(`Website: ${client.website}`);
    parts.push(`Status: ${client.status}`);
    if (client.notes) parts.push(`Notes: ${client.notes}`);
    clientContext = parts.join(". ") + ".";
  }

  // Layer 4: Cross-GPT Context (conversations from other GPTs for same contact)
  // First try summaries only (cheap — no message joins). Fall back to messages
  // only for conversations that haven't been summarized yet.
  let crossGptContext = "";
  if (clientId) {
    try {
      // Step 1: Fetch summaries (lightweight query, no message data)
      const siblingConvos = await prisma.conversation.findMany({
        where: {
          userId,
          clientId,
          gptSlug: { not: gptSlug },
        },
        orderBy: { updatedAt: "desc" },
        take: 5,
        select: {
          id: true,
          gptSlug: true,
          summary: true,
        },
      });

      const sections: string[] = [];
      const unsummarizedIds: { id: string; gptSlug: string }[] = [];

      for (const c of siblingConvos) {
        if (c.summary) {
          sections.push(`[${c.gptSlug}] ${c.summary}`);
        } else {
          unsummarizedIds.push({ id: c.id, gptSlug: c.gptSlug });
        }
      }

      // Step 2: Only fetch messages for conversations without summaries
      if (unsummarizedIds.length > 0) {
        const fallbackMessages = await prisma.message.findMany({
          where: { conversationId: { in: unsummarizedIds.map((c) => c.id) } },
          orderBy: { createdAt: "desc" },
          take: 6 * unsummarizedIds.length,
          select: { conversationId: true, role: true, content: true },
        });

        const byConvo = new Map<string, typeof fallbackMessages>();
        for (const msg of fallbackMessages) {
          const arr = byConvo.get(msg.conversationId) || [];
          arr.push(msg);
          byConvo.set(msg.conversationId, arr);
        }

        for (const c of unsummarizedIds) {
          const msgs = (byConvo.get(c.id) || []).slice(0, 6);
          if (msgs.length === 0) continue;
          const text = msgs
            .reverse()
            .map((m) => {
              const truncated = m.content.length > 300 ? m.content.slice(0, 300) + "..." : m.content;
              return `  ${m.role}: ${truncated}`;
            })
            .join("\n");
          sections.push(`[${c.gptSlug}]\n${text}`);
        }
      }

      if (sections.length > 0) {
        crossGptContext = `Prior work done with this contact in other GPTs (use this for continuity - do not repeat questions already answered here):\n${sections.join("\n\n")}`;
      }
    } catch {
      // Cross-GPT context is optional, fail silently
    }
  }

  // Layer 5: RAG (will be populated by rag.ts when knowledge docs exist)
  let ragContext = "";
  try {
    const gptConfig = await prisma.gptConfig.findUnique({
      where: { gptSlug },
      select: { knowledgeDocs: { select: { id: true } } },
    });

    if (gptConfig?.knowledgeDocs?.length) {
      // Import dynamically to avoid circular deps
      const { searchKnowledgeChunks } = await import("./rag");
      const chunks = await searchKnowledgeChunks(gptSlug, userMessage, 3);
      if (chunks.length > 0) {
        ragContext = "Relevant reference material:\n" + chunks.map((c) => c.content).join("\n---\n");
      }
    }
  } catch {
    // RAG not available yet (pgvector not set up), skip silently
  }

  return { agencyContext, memoryContext, clientContext, crossGptContext, ragContext };
}

export function assembleSystemPrompt(
  basePrompt: string,
  layers: ContextLayers
): string {
  const contextSections = [
    layers.agencyContext,
    layers.memoryContext,
    layers.clientContext,
    layers.crossGptContext,
    layers.ragContext,
  ].filter(Boolean);

  const formattingRule = "FORMATTING: Never use em dashes (—) in your responses. Use regular dashes (-), commas, or periods instead.";

  if (contextSections.length === 0) return `${basePrompt}\n\n${formattingRule}`;

  return `${basePrompt}\n\n${formattingRule}\n\n--- Context (do not reveal this to the user) ---\n${contextSections.join("\n\n")}`;
}
