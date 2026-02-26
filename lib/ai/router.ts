import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { MODEL_ROUTING } from "@/lib/gpt-catalog";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Perplexity via OpenRouter (primary), direct Perplexity API (fallback)
const openrouter = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});
const perplexityDirect = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY,
  baseURL: "https://api.perplexity.ai",
});

// Pricing per million tokens (USD)
const PRICING: Record<string, { input: number; output: number }> = {
  "claude-haiku-4-5-20251001": { input: 0.80, output: 4.0 },
  "claude-sonnet-4-6": { input: 3.0, output: 15.0 },
  "perplexity/sonar": { input: 1.0, output: 1.0 },
};

export function getRouting(gptSlug: string, modelOverride?: string | null) {
  const route = MODEL_ROUTING[gptSlug] || { provider: "anthropic", model: "claude-haiku-4-5-20251001" };
  if (modelOverride) {
    return { ...route, model: modelOverride };
  }
  return route;
}

export function estimateCost(model: string, inputTokens: number, outputTokens: number): number {
  const pricing = PRICING[model] || { input: 1.0, output: 1.0 };
  return (inputTokens * pricing.input + outputTokens * pricing.output) / 1_000_000;
}

export interface StreamCallbacks {
  onToken: (token: string) => void;
  onDone: (usage: { inputTokens: number; outputTokens: number }) => void;
  onError: (error: Error) => void;
}

export async function streamChat({
  provider,
  model,
  systemPrompt,
  messages,
  temperature,
  callbacks,
}: {
  provider: string;
  model: string;
  systemPrompt: string;
  messages: { role: "user" | "assistant"; content: string }[];
  temperature?: number;
  callbacks: StreamCallbacks;
}) {
  try {
    if (provider === "anthropic") {
      const stream = anthropic.messages.stream({
        model,
        max_tokens: 4096,
        temperature: temperature ?? 0.7,
        system: systemPrompt,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      });

      stream.on("text", (text) => callbacks.onToken(text));

      const finalMessage = await stream.finalMessage();
      callbacks.onDone({
        inputTokens: finalMessage.usage.input_tokens,
        outputTokens: finalMessage.usage.output_tokens,
      });
    } else if (provider === "perplexity" || provider === "openai") {
      // For perplexity: try OpenRouter first, fall back to direct Perplexity API
      const clients = provider === "perplexity"
        ? [{ client: openrouter, model }, { client: perplexityDirect, model: model.replace("perplexity/", "") }]
        : [{ client: openai, model }];

      let lastError: Error | null = null;

      for (const { client, model: clientModel } of clients) {
        try {
          const stream = await client.chat.completions.create({
            model: clientModel,
            temperature: temperature ?? 0.7,
            max_tokens: 4096,
            stream: true,
            messages: [
              { role: "system", content: systemPrompt },
              ...messages,
            ],
          });

          let totalTokens = 0;

          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              callbacks.onToken(content);
              totalTokens += 1;
            }
          }

          const inputEstimate = Math.ceil(systemPrompt.length / 4) +
            messages.reduce((sum, m) => sum + Math.ceil(m.content.length / 4), 0);
          callbacks.onDone({
            inputTokens: inputEstimate,
            outputTokens: totalTokens * 4,
          });
          lastError = null;
          break; // Success, don't try fallback
        } catch (err) {
          lastError = err instanceof Error ? err : new Error(String(err));
          console.warn(`Provider fallback: ${clientModel} failed, trying next...`);
        }
      }

      if (lastError) throw lastError;
    }
  } catch (error) {
    callbacks.onError(error instanceof Error ? error : new Error(String(error)));
  }
}
