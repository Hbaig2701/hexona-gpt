"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Button from "@/components/ui/Button";

interface AgencyData {
  niche: string;
  services: string[];
  location: string;
  monthlyRevenue: string;
  revenueGoal: string;
  experienceLevel: string;
  background: string;
  biggestChallenge: string;
}

interface Message {
  role: "assistant" | "user";
  content: string;
}

interface OnboardingChatProps {
  onComplete: (data: AgencyData) => void;
  onEarlyExit: () => void;
}

export default function OnboardingChat({ onComplete, onEarlyExit }: OnboardingChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey! I'm here to learn about your agency so we can personalize all your AI tools. Let's start — what services do you offer or want to offer? (e.g., AI voice agents, CRM automation, chatbots, etc.)",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Smooth streaming buffer
  const streamBufferRef = useRef("");
  const displayedRef = useRef("");
  const rafRef = useRef<number | null>(null);

  const flushBuffer = useCallback(() => {
    if (displayedRef.current.length < streamBufferRef.current.length) {
      const remaining = streamBufferRef.current.length - displayedRef.current.length;
      const charsToAdd = Math.max(1, Math.ceil(remaining * 0.3));
      displayedRef.current = streamBufferRef.current.slice(
        0,
        displayedRef.current.length + charsToAdd
      );
      setStreamingContent(displayedRef.current);
      rafRef.current = requestAnimationFrame(flushBuffer);
    } else {
      rafRef.current = null;
    }
  }, []);

  function pushToBuffer(text: string) {
    streamBufferRef.current = text;
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(flushBuffer);
    }
  }

  function resetBuffer() {
    streamBufferRef.current = "";
    displayedRef.current = "";
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent]);

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);
    resetBuffer();
    setStreamingContent("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gptSlug: "agency-onboarding",
          message: userMessage,
          conversationId, // Reuse conversation so the AI sees full history
        }),
      });

      if (!res.ok) throw new Error("Chat request failed");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;
              try {
                const parsed = JSON.parse(data);
                // Capture conversationId from first response
                if (parsed.conversationId && !conversationId) {
                  setConversationId(parsed.conversationId);
                }
                if (parsed.content) {
                  fullContent += parsed.content;
                  pushToBuffer(fullContent);
                }
                if (parsed.agencyData) {
                  onComplete(parsed.agencyData);
                  return;
                }
              } catch {
                // partial JSON, skip
              }
            }
          }
        }
      }

      resetBuffer();
      setStreamingContent("");
      setMessages((prev) => [...prev, { role: "assistant", content: fullContent }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Could you try again?" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const userMessageCount = messages.filter((m) => m.role === "user").length;
  const hasUserMessages = userMessageCount > 0;
  const maxSteps = 5;
  const progress = Math.min(userMessageCount / maxSteps, 1);

  async function handleExit() {
    // If the user provided info, trigger memory summarization so it's saved
    if (conversationId && hasUserMessages) {
      try {
        await fetch("/api/memory/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gptSlug: "agency-onboarding", conversationId }),
        });
      } catch {
        // Non-critical, continue anyway
      }
    }

    onEarlyExit();
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-[var(--hex-text-muted)]">
            {userMessageCount === 0
              ? "Getting started"
              : userMessageCount >= maxSteps
                ? "Almost done!"
                : `Step ${userMessageCount} of ~${maxSteps}`}
          </span>
          <span className="text-xs text-[var(--hex-text-muted)]">
            {Math.round(progress * 100)}%
          </span>
        </div>
        <div className="h-1.5 bg-[var(--hex-dark-600)] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-hex-teal to-[#0095A8] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.max(progress * 100, 2)}%` }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-xl px-4 py-3 text-sm ${
                msg.role === "user"
                  ? "bg-gradient-to-br from-hex-teal to-[#0095A8] text-hex-dark-900"
                  : "card-base border-l-2 border-l-hex-teal/30"
              }`}
            >
              {msg.role === "user" ? (
                <p className="whitespace-pre-wrap">{msg.content}</p>
              ) : (
                <div className="markdown-content">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}
        {streamingContent && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-xl px-4 py-3 text-sm card-base border-l-2 border-l-hex-teal/30">
              <div className="markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {streamingContent}
                </ReactMarkdown>
              </div>
              <span className="inline-block w-1.5 h-4 bg-hex-teal animate-pulse ml-0.5 align-middle" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          placeholder="Type your answer..."
          className="flex-1 px-4 py-3 bg-[var(--hex-dark-600)] border border-[var(--hex-dark-500)] rounded-lg text-[var(--hex-text-primary)] placeholder:text-[var(--hex-text-muted)] focus:outline-none focus:border-hex-teal transition-colors"
          disabled={loading}
        />
        <Button onClick={handleSend} loading={loading} disabled={!input.trim()}>
          Send
        </Button>
        <button
          onClick={handleExit}
          className={`px-4 py-3 text-sm transition-colors whitespace-nowrap ${
            hasUserMessages
              ? "text-hex-teal hover:text-hex-teal/80 font-medium"
              : "text-[var(--hex-text-muted)] hover:text-[var(--hex-text-primary)]"
          }`}
        >
          {hasUserMessages ? "Save & Exit" : "Skip"}
        </button>
      </div>
    </div>
  );
}
