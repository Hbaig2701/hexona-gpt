import { NextRequest } from "next/server";
import { streamChat } from "@/lib/ai/router";
import { PROMPT_WRITER_PROMPTS, isPromptWriterTool } from "@/lib/prompt-writer/prompts";

export const dynamic = "force-dynamic";

// Public, unauthenticated endpoint for the /prompt-writer lead magnet.
// Stateless by design: the client sends the full conversation each turn and
// nothing is persisted. Guardrails below exist because there is no user id
// to rate-limit or bill against.

const MAX_MESSAGE_CHARS = 4000;
const MAX_HISTORY_MESSAGES = 24;
const RATE_LIMIT_PER_HOUR = 20;

// In-memory, per-instance (same tradeoff as /api/chat's limiter).
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    // Opportunistic cleanup so the map doesn't grow unbounded on a public route
    if (rateLimitMap.size > 5000) {
      rateLimitMap.forEach((value, key) => {
        if (now > value.resetAt) rateLimitMap.delete(key);
      });
    }
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return true;
  }

  if (entry.count >= RATE_LIMIT_PER_HOUR) return false;
  entry.count++;
  return true;
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({
        error: "You've reached the free usage limit for now. Please try again in an hour.",
      }),
      { status: 429 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), { status: 400 });
  }

  const { tool, messages } = body;

  if (!isPromptWriterTool(tool)) {
    return new Response(JSON.stringify({ error: "Unknown tool" }), { status: 400 });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: "Missing messages" }), { status: 400 });
  }

  const valid = messages.every(
    (m) =>
      m &&
      (m.role === "user" || m.role === "assistant") &&
      typeof m.content === "string" &&
      m.content.length > 0 &&
      m.content.length <= MAX_MESSAGE_CHARS
  );
  if (!valid || messages[messages.length - 1].role !== "user") {
    return new Response(JSON.stringify({ error: "Invalid messages" }), { status: 400 });
  }

  const chatMessages = messages
    .slice(-MAX_HISTORY_MESSAGES)
    .map((m) => ({ role: m.role as "user" | "assistant", content: m.content as string }));

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      await streamChat({
        provider: "anthropic",
        model: "claude-haiku-4-5-20251001",
        systemPrompt: PROMPT_WRITER_PROMPTS[tool],
        messages: chatMessages,
        temperature: 0.6,
        callbacks: {
          onToken(token) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ content: token })}\n\n`)
            );
          },
          onDone() {
            controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
            controller.close();
          },
          onError(error) {
            console.error("[prompt-writer] stream error:", error.message);
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({
                  error: "Something went wrong generating your prompt. Please try again.",
                })}\n\n`
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
