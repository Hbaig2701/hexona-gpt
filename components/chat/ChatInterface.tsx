"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import ContextBadge from "./ContextBadge";
import ConversationHistory from "./ConversationHistory";
import SuggestedPrompts from "@/components/gpts/SuggestedPrompts";
import HandoffChips from "./HandoffChips";
import { getGptBySlug } from "@/lib/gpt-catalog";
import { History, Plus } from "lucide-react";
import Button from "@/components/ui/Button";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt?: string;
}

interface AttachmentData {
  type: string;
  fileName: string;
  extractedText: string;
}

interface ChatInterfaceProps {
  gptSlug: string;
  clientId?: string;
  clientName?: string;
}

export default function ChatInterface({ gptSlug, clientId, clientName }: ChatInterfaceProps) {
  const searchParams = useSearchParams();
  const initialConversationId = searchParams.get("conversation");

  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(initialConversationId);
  const [loading, setLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const freshChatRef = useRef(false); // true when user explicitly clicks "+ New"
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Smooth streaming buffer
  const streamBufferRef = useRef("");
  const displayedRef = useRef("");
  const rafRef = useRef<number | null>(null);

  const flushBuffer = useCallback(() => {
    if (displayedRef.current.length < streamBufferRef.current.length) {
      // Reveal characters in batches for smooth flow
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

  const gpt = getGptBySlug(gptSlug);

  // Auto-resume: find the most recent conversation for this GPT (and client if scoped)
  useEffect(() => {
    if (!conversationId && !freshChatRef.current) {
      const params = new URLSearchParams({ gptSlug, limit: "1" });
      if (clientId) params.set("clientId", clientId);
      else params.set("standalone", "1");
      fetch(`/api/conversations?${params}`)
        .then((r) => r.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0 && data[0]._count?.messages > 0) {
            setConversationId(data[0].id);
          }
        })
        .catch(() => {});
    }
  }, [clientId, gptSlug]); // eslint-disable-line react-hooks/exhaustive-deps

  // Load existing conversation
  useEffect(() => {
    if (conversationId) {
      fetch(`/api/conversations/${conversationId}`)
        .then((r) => {
          if (!r.ok) throw new Error();
          return r.json();
        })
        .then((data) => {
          if (data.messages) {
            setMessages(
              data.messages.map((m: { id: string; role: string; content: string; createdAt: string }) => ({
                id: m.id,
                role: m.role === "USER" ? "user" : "assistant",
                content: m.content,
                createdAt: m.createdAt,
              }))
            );
          }
        })
        .catch(() => setConversationId(null));
    }
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent]);

  const handleSend = useCallback(async (text: string, attachments?: AttachmentData[]) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      id: `temp-${Date.now()}`,
      role: "user",
      content: text,
    };

    // Optimistic UI
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    resetBuffer();
    setStreamingContent("");

    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    let fullContent = "";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gptSlug,
          clientId,
          conversationId,
          message: text,
          attachments,
        }),
        signal: abortController.signal,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to send message");
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
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
                if (parsed.conversationId && !conversationId) {
                  setConversationId(parsed.conversationId);
                }
                if (parsed.content) {
                  fullContent += parsed.content;
                  pushToBuffer(fullContent);
                }
                if (parsed.error) {
                  throw new Error(parsed.error);
                }
              } catch (e) {
                if (e instanceof Error && e.message !== "Unexpected end of JSON input") {
                  // Actual error from parsed data
                  if ((e as Error).message && !(e as Error).message.includes("JSON")) {
                    throw e;
                  }
                }
              }
            }
          }
        }
      }

      // Cancel buffer animation and show final content immediately
      resetBuffer();
      setStreamingContent("");

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: fullContent,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      // If aborted (stop button), save whatever was generated so far
      if (abortController.signal.aborted && fullContent) {
        resetBuffer();
        setStreamingContent("");
        const partialMsg: Message = {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content: fullContent,
        };
        setMessages((prev) => [...prev, partialMsg]);
      } else if (!abortController.signal.aborted) {
        const errMsg: Message = {
          id: `err-${Date.now()}`,
          role: "assistant",
          content: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        };
        resetBuffer();
        setStreamingContent("");
        setMessages((prev) => [...prev, errMsg]);
      } else {
        // Aborted with no content - just clean up
        resetBuffer();
        setStreamingContent("");
      }
    } finally {
      abortControllerRef.current = null;
      setLoading(false);
    }
  }, [gptSlug, clientId, conversationId, loading, flushBuffer]);

  function startNewConversation() {
    freshChatRef.current = true;
    setMessages([]);
    setConversationId(null);
    setStreamingContent("");
  }

  function loadConversation(id: string) {
    setMessages([]);
    setConversationId(id);
    setShowHistory(false);
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[var(--hex-dark-500)]">
        <div>
          <h2 className="font-display text-lg font-semibold text-[var(--hex-text-primary)]">
            {gpt?.name || gptSlug}
          </h2>
          {clientName && (
            <ContextBadge clientName={clientName} />
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={startNewConversation}>
            <Plus size={14} /> New
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShowHistory(!showHistory)}>
            <History size={14} /> History
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        {messages.length === 0 && !streamingContent && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-[var(--hex-text-secondary)] mb-6">
              {gpt?.description || "Start a conversation"}
            </p>
            {gpt?.suggestedPrompts && (
              <SuggestedPrompts prompts={gpt.suggestedPrompts} onSelect={handleSend} />
            )}
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={msg.id}>
            <MessageBubble role={msg.role} content={msg.content} />
            {msg.role === "assistant" &&
              msg.content.length > 200 &&
              index === messages.length - 1 &&
              !loading && (
                <HandoffChips gptSlug={gptSlug} clientId={clientId} />
              )}
          </div>
        ))}

        {streamingContent && (
          <MessageBubble role="assistant" content={streamingContent} streaming />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={handleSend} onStop={() => abortControllerRef.current?.abort()} loading={loading} />

      {/* Conversation History Panel */}
      {showHistory && (
        <ConversationHistory
          gptSlug={gptSlug}
          clientId={clientId}
          currentId={conversationId}
          onSelect={loadConversation}
          onClose={() => setShowHistory(false)}
        />
      )}
    </div>
  );
}
