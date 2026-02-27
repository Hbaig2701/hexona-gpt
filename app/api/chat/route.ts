import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { buildContextLayers, assembleSystemPrompt } from "@/lib/ai/context-builder";
import { getRouting, streamChat, estimateCost } from "@/lib/ai/router";
import { getDefaultSystemPrompt } from "@/lib/ai/system-prompts";

export const dynamic = "force-dynamic";
// Rate limit: 50 messages per hour per user
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(userId);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(userId, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return true;
  }

  if (entry.count >= 50) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  // Check active status
  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { isActive: true } });
  if (!user?.isActive) {
    return new Response(JSON.stringify({ error: "Account inactive" }), { status: 403 });
  }

  if (!checkRateLimit(session.user.id)) {
    return new Response(
      JSON.stringify({ error: "You've reached the message limit (50/hour). Please try again later." }),
      { status: 429 }
    );
  }

  const body = await req.json();
  const { gptSlug, clientId, conversationId, message, attachments } = body;

  if (!gptSlug || !message?.trim()) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
  }

  // Get GPT config from DB, fall back to defaults
  const gptConfig = await prisma.gptConfig.findUnique({ where: { gptSlug } });

  if (gptConfig && !gptConfig.isActive) {
    return new Response(JSON.stringify({ error: "This GPT is currently unavailable" }), { status: 403 });
  }

  // Build context layers
  const contextLayers = await buildContextLayers({
    userId: session.user.id,
    gptSlug,
    clientId,
    userMessage: message,
  });

  // Get system prompt
  const basePrompt = gptConfig?.systemPrompt || getDefaultSystemPrompt(gptSlug);
  const fullSystemPrompt = assembleSystemPrompt(basePrompt, contextLayers);

  // Get or create conversation
  let convId = conversationId;
  if (!convId) {
    const conversation = await prisma.conversation.create({
      data: {
        userId: session.user.id,
        gptSlug,
        clientId: clientId || null,
      },
    });
    convId = conversation.id;
  }

  // Build attachment context
  let messageWithAttachments = message;
  if (attachments?.length) {
    const attachmentTexts = attachments.map(
      (a: { type: string; fileName: string; extractedText: string }) =>
        `[Attached ${a.type}: ${a.fileName}]\n${a.extractedText}`
    );
    messageWithAttachments = `${message}\n\n${attachmentTexts.join("\n\n")}`;
  }

  // Save user message
  await prisma.message.create({
    data: {
      conversationId: convId,
      role: "USER",
      content: message,
    },
  });

  // Load conversation history using sliding window + summary for older context.
  // Keep the last 10 messages verbatim. If the conversation is longer, prepend
  // the conversation summary so the model retains full context without blowing
  // through token limits.
  const RECENT_MESSAGE_COUNT = 10;

  const [recentMessages, totalMessageCount, conversation] = await Promise.all([
    prisma.message.findMany({
      where: { conversationId: convId },
      orderBy: { createdAt: "desc" },
      take: RECENT_MESSAGE_COUNT,
    }),
    prisma.message.count({ where: { conversationId: convId } }),
    prisma.conversation.findUnique({
      where: { id: convId },
      select: { summary: true },
    }),
  ]);

  // Reverse to chronological order
  recentMessages.reverse();

  const chatMessages: { role: "user" | "assistant"; content: string }[] = [];

  // If there are older messages beyond our window, inject the summary as context
  if (totalMessageCount > RECENT_MESSAGE_COUNT && conversation?.summary) {
    chatMessages.push({
      role: "user",
      content: `[Earlier conversation summary: ${conversation.summary}]`,
    });
    chatMessages.push({
      role: "assistant",
      content: "Understood, I have the context from our earlier conversation. Let's continue.",
    });
  }

  chatMessages.push(
    ...recentMessages.map((m) => ({
      role: (m.role === "USER" ? "user" : "assistant") as "user" | "assistant",
      content: m.content,
    }))
  );

  // Replace last user message with the one that has attachments
  if (attachments?.length && chatMessages.length > 0) {
    chatMessages[chatMessages.length - 1] = {
      role: "user",
      content: messageWithAttachments,
    };
  }

  // Get model routing
  const routing = getRouting(gptSlug, gptConfig?.modelOverride);

  // Stream response via SSE
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      let fullResponse = "";

      // Send conversation ID first
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ conversationId: convId })}\n\n`)
      );

      await streamChat({
        provider: routing.provider,
        model: routing.model,
        systemPrompt: fullSystemPrompt,
        messages: chatMessages,
        temperature: gptConfig?.temperature ?? undefined,
        callbacks: {
          onToken(token) {
            fullResponse += token;
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ content: token })}\n\n`)
            );
          },
          async onDone(usage) {
            // Save assistant message
            await prisma.message.create({
              data: {
                conversationId: convId,
                role: "ASSISTANT",
                content: fullResponse,
                tokensUsed: usage.inputTokens + usage.outputTokens,
              },
            });

            // Log usage
            await prisma.usageLog.create({
              data: {
                userId: session.user.id,
                gptSlug,
                provider: routing.provider,
                model: routing.model,
                tokensInput: usage.inputTokens,
                tokensOutput: usage.outputTokens,
                estimatedCost: estimateCost(routing.model, usage.inputTokens, usage.outputTokens),
              },
            });

            // Update conversation timestamp
            await prisma.conversation.update({
              where: { id: convId },
              data: { updatedAt: new Date() },
            });

            // Auto-title generation (after first response)
            const messageCount = await prisma.message.count({ where: { conversationId: convId } });
            if (messageCount === 2) {
              generateTitle(convId, message, fullResponse).catch(console.error);
            }

            // Memory summarization: keep summary fresh so sliding window always
            // has context. Summarize after every 4 messages (2 exchanges).
            if (messageCount >= 4 && messageCount % 4 === 0) {
              triggerMemorySummarization(session.user.id, gptSlug, convId).catch(console.error);
            }

            // Update last active
            prisma.user.update({
              where: { id: session.user.id },
              data: { lastActiveAt: new Date() },
            }).catch(() => {});

            controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
            controller.close();
          },
          onError(error) {
            console.error("Stream error:", error.message, { provider: routing.provider, model: routing.model });
            // Surface a useful error message instead of a generic one
            const userMessage = error.message?.includes("rate")
              ? "Rate limit reached. Please wait a moment and try again."
              : error.message?.includes("context_length") || error.message?.includes("too many tokens")
              ? "This conversation is too long. Please start a new conversation."
              : `Something went wrong (${routing.provider}). Please try again.`;
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ error: userMessage })}\n\n`
              )
            );
            controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
            controller.close();
          },
        },
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

// Background: Auto-title generation using Haiku
async function generateTitle(conversationId: string, userMessage: string, aiResponse: string) {
  try {
    const Anthropic = (await import("@anthropic-ai/sdk")).default;
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 30,
      messages: [
        {
          role: "user",
          content: `Generate a very short title (max 5 words) for this conversation. Just the title, nothing else.\n\nUser: ${userMessage.slice(0, 200)}\nAI: ${aiResponse.slice(0, 200)}`,
        },
      ],
    });

    const title = (response.content[0] as { text: string }).text?.trim().replace(/^["']|["']$/g, "");
    if (title) {
      await prisma.conversation.update({
        where: { id: conversationId },
        data: { title },
      });
    }
  } catch (error) {
    console.error("Title generation error:", error);
  }
}

// Background: Incremental memory summarization
// Instead of re-reading the whole conversation each time, we take the existing
// summary + only the latest messages and ask the LLM to produce an updated summary.
// This keeps costs flat regardless of conversation length.
async function triggerMemorySummarization(userId: string, gptSlug: string, conversationId: string) {
  try {
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      select: { summary: true },
    });

    const existingSummary = conversation?.summary || "";

    // Only fetch the last 6 messages (the recent window since last summarization)
    const recentMessages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "desc" },
      take: 6,
    });

    if (recentMessages.length === 0) return;

    const recentText = recentMessages
      .reverse()
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");

    const Anthropic = (await import("@anthropic-ai/sdk")).default;
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const prompt = existingSummary
      ? `Here is the existing summary of this conversation:\n"${existingSummary}"\n\nHere are the latest messages:\n${recentText}\n\nUpdate the summary to incorporate the new information. Keep it to 3-4 concise sentences covering all key facts, decisions, and context that would be useful for continuity. Only output the updated summary.`
      : `Summarize this conversation in 2-3 concise sentences. Focus on key facts, decisions, and context that would be useful for continuity.\n\n${recentText}`;

    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 250,
      messages: [{ role: "user", content: prompt }],
    });

    const summary = (response.content[0] as { text: string }).text?.trim();
    if (summary) {
      await Promise.all([
        prisma.gptMemory.upsert({
          where: { userId_gptSlug: { userId, gptSlug } },
          create: { userId, gptSlug, memoryBlob: summary },
          update: { memoryBlob: summary },
        }),
        prisma.conversation.update({
          where: { id: conversationId },
          data: { summary },
        }),
      ]);
    }
  } catch (error) {
    console.error("Memory summarization error:", error);
  }
}
