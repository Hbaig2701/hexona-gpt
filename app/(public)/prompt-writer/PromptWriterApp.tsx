"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowUp,
  Check,
  Copy,
  LayoutTemplate,
  MessagesSquare,
  Workflow,
} from "lucide-react";
import type { PromptWriterTool } from "@/lib/prompt-writer/prompts";

/* ------------------------------------------------------------------ */
/* Tool config — GHL brand arrows: yellow / blue / green on deep navy  */
/* ------------------------------------------------------------------ */

interface ToolDef {
  id: PromptWriterTool;
  name: string;
  tagline: string;
  hex: string;
  icon: typeof MessagesSquare;
  emptyTitle: string;
  emptyBody: string;
  starters: string[];
  // Literal Tailwind classes so JIT picks them up
  text: string;
  bgSolid: string;
  bgSoft: string;
  borderActive: string;
  shadowActive: string;
  chipHover: string;
  focusWithin: string;
}

const TOOLS: ToolDef[] = [
  {
    id: "ask-ai",
    name: "Ask AI",
    tagline: "CRM actions, content & data pulls",
    hex: "#4E8FE0",
    icon: MessagesSquare,
    emptyTitle: "What should Ask AI do for you?",
    emptyBody:
      "Content briefs, contact lookups, opportunity updates, safe bulk actions — describe it and get a precise, paste-ready command.",
    starters: [
      "Write an email campaign for a Black Friday offer",
      "Safely bulk-tag all my cold leads from last year",
      "Move a deal to 'Proposal Sent' in my pipeline",
      "Social posts announcing a new service",
    ],
    text: "text-[#4E8FE0]",
    bgSolid: "bg-[#4E8FE0]",
    bgSoft: "bg-[#4E8FE0]/10",
    borderActive: "border-[#4E8FE0]/60",
    shadowActive: "shadow-[0_0_32px_-8px_rgba(78,143,224,0.45)]",
    chipHover: "hover:border-[#4E8FE0]/50",
    focusWithin: "focus-within:border-[#4E8FE0]/60",
  },
  {
    id: "workflow",
    name: "Workflow AI Builder",
    tagline: "Plain English → full automation",
    hex: "#55BE63",
    icon: Workflow,
    emptyTitle: "What automation are we building?",
    emptyBody:
      "Tell me the goal — I'll ask a couple of questions, then write a workflow prompt with trigger, steps, timing and stop conditions baked in.",
    starters: [
      "A database reactivation campaign",
      "Speed-to-lead follow-up for new form submissions",
      "Appointment no-show recovery sequence",
      "Review requests after a job is completed",
    ],
    text: "text-[#55BE63]",
    bgSolid: "bg-[#55BE63]",
    bgSoft: "bg-[#55BE63]/10",
    borderActive: "border-[#55BE63]/60",
    shadowActive: "shadow-[0_0_32px_-8px_rgba(85,190,99,0.45)]",
    chipHover: "hover:border-[#55BE63]/50",
    focusWithin: "focus-within:border-[#55BE63]/60",
  },
  {
    id: "studio",
    name: "AI Studio",
    tagline: "Vibe-build funnels, pages & sites",
    hex: "#F0B429",
    icon: LayoutTemplate,
    emptyTitle: "What are we vibe-building?",
    emptyBody:
      "Landing pages, funnels, booking pages — I'll turn your business facts into a full creative brief AI Studio can nail on the first try.",
    starters: [
      "A landing page for a $99 intro offer",
      "A full site for a local service business",
      "A booking page wired to my calendar",
      "A lead-capture funnel for a webinar",
    ],
    text: "text-[#F0B429]",
    bgSolid: "bg-[#F0B429]",
    bgSoft: "bg-[#F0B429]/10",
    borderActive: "border-[#F0B429]/60",
    shadowActive: "shadow-[0_0_32px_-8px_rgba(240,180,41,0.45)]",
    chipHover: "hover:border-[#F0B429]/50",
    focusWithin: "focus-within:border-[#F0B429]/60",
  },
];

interface Msg {
  role: "user" | "assistant";
  content: string;
}

/* ------------------------------------------------------------------ */
/* Decorative three-arrows mark (GHL-inspired, original drawing)       */
/* ------------------------------------------------------------------ */

function arrowPath(cx: number, tipY: number): string {
  return `M${cx} ${tipY} L${cx + 5.5} ${tipY + 7} H${cx + 2.25} V30 H${cx - 2.25} V${tipY + 7} H${cx - 5.5} Z`;
}

function ArrowsMark({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * (32 / 38)}
      viewBox="0 0 38 32"
      fill="none"
      aria-hidden="true"
    >
      <path d={arrowPath(7, 2)} fill="#F0B429" />
      <path d={arrowPath(19, 13)} fill="#4E8FE0" />
      <path d={arrowPath(31, 6)} fill="#55BE63" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Markdown rendering with copy-able prompt blocks                     */
/* ------------------------------------------------------------------ */

function PromptBlock({ children }: { children?: React.ReactNode }) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    const text = preRef.current?.innerText ?? "";
    navigator.clipboard.writeText(text.trimEnd());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative my-3 rounded-xl border border-white/10 bg-[#060D1F]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
          Your prompt
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          {copied ? (
            <>
              <Check size={12} className="text-[#55BE63]" /> Copied
            </>
          ) : (
            <>
              <Copy size={12} /> Copy prompt
            </>
          )}
        </button>
      </div>
      <pre
        ref={preRef}
        className="overflow-x-auto whitespace-pre-wrap px-4 py-3 text-[13px] leading-relaxed text-[#DCE6F7] [font-family:var(--font-mono)]"
      >
        {children}
      </pre>
    </div>
  );
}

const mdComponents = {
  pre: ({ children }: { children?: React.ReactNode }) => (
    <PromptBlock>{children}</PromptBlock>
  ),
  code: ({ className, children }: { className?: string; children?: React.ReactNode }) =>
    className ? (
      <code className={className}>{children}</code>
    ) : (
      <code className="rounded bg-white/10 px-1.5 py-0.5 text-[0.85em] text-[#F0B429]">
        {children}
      </code>
    ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="my-2 leading-relaxed">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="my-2 list-disc space-y-1 pl-5">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="my-2 list-decimal space-y-1 pl-5">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-white">{children}</strong>
  ),
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="mb-1 mt-4 text-base font-bold text-white">{children}</h3>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="mb-1 mt-4 text-base font-bold text-white">{children}</h3>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h4 className="mb-1 mt-3 text-sm font-bold text-white">{children}</h4>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#4E8FE0] underline underline-offset-2 hover:text-[#7FB0EC]"
    >
      {children}
    </a>
  ),
};

/* ------------------------------------------------------------------ */
/* Main app                                                            */
/* ------------------------------------------------------------------ */

const EMPTY_CONVERSATIONS: Record<PromptWriterTool, Msg[]> = {
  "ask-ai": [],
  workflow: [],
  studio: [],
};

export default function PromptWriterApp() {
  const [activeToolId, setActiveToolId] = useState<PromptWriterTool>("workflow");
  const [conversations, setConversations] =
    useState<Record<PromptWriterTool, Msg[]>>(EMPTY_CONVERSATIONS);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const tool = TOOLS.find((t) => t.id === activeToolId)!;
  const messages = conversations[activeToolId];
  const hasMessages = messages.length > 0;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, streamingText]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;

    const history: Msg[] = [...messages, { role: "user", content: trimmed }];
    setConversations((prev) => ({ ...prev, [activeToolId]: history }));
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setIsStreaming(true);
    setStreamingText("");

    let full = "";
    let errorText = "";

    try {
      const res = await fetch("/api/prompt-writer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: activeToolId, messages: history }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() || "";
        for (const part of parts) {
          if (!part.startsWith("data: ")) continue;
          const payload = part.slice(6);
          if (payload === "[DONE]") continue;
          try {
            const parsed = JSON.parse(payload);
            if (parsed.content) {
              full += parsed.content;
              setStreamingText(full);
            }
            if (parsed.error) errorText = parsed.error;
          } catch {
            // ignore malformed chunks
          }
        }
      }
    } catch (e) {
      errorText = e instanceof Error ? e.message : "Something went wrong. Please try again.";
    }

    const finalContent =
      full + (errorText ? `${full ? "\n\n" : ""}⚠️ ${errorText}` : "");
    setConversations((prev) => ({
      ...prev,
      [activeToolId]: [
        ...history,
        { role: "assistant", content: finalContent || "⚠️ No response received. Please try again." },
      ],
    }));
    setIsStreaming(false);
    setStreamingText("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function autoResize() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }

  return (
    <div
      className="flex h-dvh flex-col overflow-hidden bg-[#0A1428] text-[#C6D2E8]"
      style={{
        backgroundImage: [
          "radial-gradient(55rem 38rem at 85% -12%, rgba(78,143,224,0.14), transparent)",
          "radial-gradient(48rem 34rem at -8% 108%, rgba(85,190,99,0.10), transparent)",
          "radial-gradient(38rem 28rem at 105% 102%, rgba(240,180,41,0.08), transparent)",
        ].join(", "),
      }}
    >
      {/* faint grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)",
        }}
      />

      {/* Header */}
      <header className="relative z-10 border-b border-white/[0.06]">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <ArrowsMark size={26} />
            <div className="leading-tight">
              <div className="text-[15px] font-bold text-white [font-family:var(--font-ghl-display)]">
                GoHighLevel Prompt Writer
              </div>
              <div className="text-[11px] text-white/40">
                Free tool · no account needed
              </div>
            </div>
          </div>
          <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/50 sm:block">
            3 agents · Ask AI, Workflows, AI Studio
          </span>
        </div>
      </header>

      {/* Tool selector */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 pt-4 sm:px-6">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {TOOLS.map((t) => {
            const Icon = t.icon;
            const active = t.id === activeToolId;
            return (
              <button
                key={t.id}
                onClick={() => !isStreaming && setActiveToolId(t.id)}
                disabled={isStreaming}
                className={`group rounded-xl border p-2.5 text-left transition-all sm:p-3.5 ${
                  active
                    ? `${t.borderActive} ${t.bgSoft} ${t.shadowActive}`
                    : "border-white/[0.08] bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                } ${isStreaming ? "cursor-not-allowed opacity-60" : ""}`}
              >
                <Icon
                  size={18}
                  className={`mb-1.5 ${active ? t.text : "text-white/40 group-hover:text-white/60"}`}
                />
                <div
                  className={`text-[12px] font-bold leading-tight sm:text-[13px] ${
                    active ? "text-white" : "text-white/70"
                  } [font-family:var(--font-ghl-display)]`}
                >
                  {t.name}
                </div>
                <div className="mt-0.5 hidden text-[11px] leading-snug text-white/40 sm:block">
                  {t.tagline}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat area */}
      <div
        ref={scrollRef}
        className="relative z-10 mx-auto w-full max-w-4xl flex-1 overflow-y-auto px-4 sm:px-6"
      >
        {!hasMessages && !isStreaming ? (
          <div className="flex h-full flex-col items-center justify-center pb-10 text-center">
            <h1 className="max-w-xl text-2xl font-bold leading-tight text-white sm:text-[2rem] [font-family:var(--font-ghl-display)]">
              {tool.emptyTitle}
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/50">
              {tool.emptyBody}
            </p>
            <div className="mt-7 flex max-w-lg flex-wrap justify-center gap-2">
              {tool.starters.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className={`rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-white/70 transition hover:text-white ${tool.chipHover} hover:bg-white/[0.08]`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-5">
            {messages.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="flex justify-end">
                  <div
                    className={`max-w-[85%] rounded-2xl rounded-br-md px-4 py-2.5 text-sm text-[#0A1428] ${tool.bgSolid}`}
                  >
                    <p className="whitespace-pre-wrap font-medium">{m.content}</p>
                  </div>
                </div>
              ) : (
                <div key={i} className="flex justify-start">
                  <div className="max-w-[92%] rounded-2xl rounded-bl-md border border-white/[0.07] bg-white/[0.035] px-4 py-3 text-sm sm:max-w-[85%]">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                      {m.content}
                    </ReactMarkdown>
                  </div>
                </div>
              )
            )}
            {isStreaming && (
              <div className="flex justify-start">
                <div className="max-w-[92%] rounded-2xl rounded-bl-md border border-white/[0.07] bg-white/[0.035] px-4 py-3 text-sm sm:max-w-[85%]">
                  {streamingText ? (
                    <>
                      <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                        {streamingText}
                      </ReactMarkdown>
                      <span
                        className={`ml-0.5 inline-block h-4 w-1.5 animate-pulse align-middle ${tool.bgSolid}`}
                      />
                    </>
                  ) : (
                    <div className="flex items-center gap-1.5 py-1">
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          className={`h-1.5 w-1.5 animate-bounce rounded-full ${tool.bgSolid}`}
                          style={{ animationDelay: `${d * 150}ms` }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-3 pt-2 sm:px-6">
        <div
          className={`flex items-end gap-2 rounded-2xl border bg-[#0D1B36] p-2 transition-colors ${
            isStreaming ? "border-white/[0.08]" : `border-white/[0.12] ${tool.focusWithin}`
          }`}
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              autoResize();
            }}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={isStreaming}
            placeholder={`Describe what you want to build with ${tool.name}…`}
            className="max-h-40 flex-1 resize-none bg-transparent px-2.5 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none disabled:opacity-50"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={isStreaming || !input.trim()}
            aria-label="Send"
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#0A1428] transition ${tool.bgSolid} disabled:opacity-30 ${
              !isStreaming && input.trim() ? "hover:brightness-110" : ""
            }`}
          >
            <ArrowUp size={17} strokeWidth={2.5} />
          </button>
        </div>
        <p className="mt-2 text-center text-[10px] leading-relaxed text-white/25">
          An independent tool for HighLevel users — not affiliated with or endorsed by
          HighLevel Inc. AI can make mistakes; review every prompt before you use it.
        </p>
      </div>
    </div>
  );
}
