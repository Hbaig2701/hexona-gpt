"use client";

import { useState, useRef, useEffect } from "react";
import { Wand2, ChevronDown, ChevronUp, Send, Check, Loader2, Maximize2, Minimize2 } from "lucide-react";

interface Edit {
  oldText: string;
  newText: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  edits?: Edit[];
  updatedPrompt?: string | null;
  applied?: boolean;
}

interface PromptEditorChatProps {
  currentPrompt: string;
  gptSlug: string;
  onApplyPrompt: (newPrompt: string) => void;
}

function DiffBlock({ edit, defaultExpanded }: { edit: Edit; defaultExpanded: boolean }) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const isLong = edit.oldText.length > 150 || edit.newText.length > 150;

  return (
    <div className="rounded-lg overflow-hidden border border-hex-dark-500 text-xs font-mono">
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between px-3 py-1 bg-hex-dark-600 text-hex-text-muted hover:text-hex-text-primary transition-colors"
        >
          <span>{expanded ? "Collapse" : "Expand full diff"}</span>
          {expanded ? <Minimize2 size={10} /> : <Maximize2 size={10} />}
        </button>
      )}
      <div className="bg-hex-error/10 text-hex-error/80 px-3 py-2 border-b border-hex-dark-500">
        <span className="text-hex-error mr-1 select-none">-</span>
        <span className={expanded || !isLong ? "whitespace-pre-wrap break-words" : "line-clamp-2"}>
          {edit.oldText}
        </span>
      </div>
      <div className="bg-hex-success/10 text-hex-success/80 px-3 py-2">
        <span className="text-hex-success mr-1 select-none">+</span>
        <span className={expanded || !isLong ? "whitespace-pre-wrap break-words" : "line-clamp-2"}>
          {edit.newText}
        </span>
      </div>
    </div>
  );
}

export default function PromptEditorChat({ currentPrompt, gptSlug, onApplyPrompt }: PromptEditorChatProps) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMessages([]);
    setInput("");
  }, [gptSlug]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const history = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const res = await fetch(`/api/admin/gpts/${gptSlug}/prompt-editor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPrompt,
          instruction: text,
          history,
        }),
      });

      if (!res.ok) throw new Error("Failed to get response");

      const data = await res.json();

      const aiMsg: Message = {
        role: "assistant",
        content: data.explanation || "Here are the changes.",
        edits: data.edits || [],
        updatedPrompt: data.updatedPrompt || null,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleApply(index: number) {
    const msg = messages[index];
    if (!msg.updatedPrompt) return;
    onApplyPrompt(msg.updatedPrompt);
    setMessages((prev) =>
      prev.map((m, i) => (i === index ? { ...m, applied: true } : m))
    );
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="border border-hex-dark-500 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center bg-hex-dark-700">
        <button
          onClick={() => setOpen(!open)}
          className="flex-1 flex items-center justify-between px-4 py-3 hover:bg-hex-dark-600 transition-colors"
        >
          <span className="flex items-center gap-2 text-sm font-medium text-hex-text-primary">
            <Wand2 size={14} className="text-hex-teal" />
            Prompt Editor
          </span>
          {open ? (
            <ChevronUp size={14} className="text-hex-text-muted" />
          ) : (
            <ChevronDown size={14} className="text-hex-text-muted" />
          )}
        </button>
        {open && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-3 py-3 text-hex-text-muted hover:text-hex-text-primary transition-colors border-l border-hex-dark-500"
            title={expanded ? "Collapse panel" : "Expand panel"}
          >
            {expanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        )}
      </div>

      {open && (
        <div className="bg-hex-dark-800 border-t border-hex-dark-500">
          {/* Messages area — taller when expanded */}
          <div className={`overflow-y-auto p-4 space-y-3 ${expanded ? "max-h-[70vh]" : "max-h-80"}`}>
            {messages.length === 0 && (
              <p className="text-xs text-hex-text-muted text-center py-4">
                Tell me what to change. e.g. &quot;Make the tone more direct&quot; or &quot;The pricing answer was wrong — it should recommend $2k-5k instead&quot;
              </p>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`text-sm ${msg.role === "user" ? "text-right" : ""}`}>
                {msg.role === "user" ? (
                  <div className="inline-block bg-hex-teal/15 text-hex-text-primary rounded-lg px-3 py-2 max-w-[85%] text-left">
                    {msg.content}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="bg-hex-dark-700 text-hex-text-secondary rounded-lg px-3 py-2">
                      {msg.content}
                    </div>

                    {/* Show specific edits — full text, expandable */}
                    {msg.edits && msg.edits.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs text-hex-text-muted font-medium">
                          {msg.edits.length} edit{msg.edits.length > 1 ? "s" : ""}:
                        </p>
                        {msg.edits.map((edit, j) => (
                          <DiffBlock key={j} edit={edit} defaultExpanded={expanded} />
                        ))}
                      </div>
                    )}

                    {msg.updatedPrompt && (
                      <button
                        onClick={() => handleApply(i)}
                        disabled={msg.applied}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          msg.applied
                            ? "bg-hex-success/15 text-hex-success cursor-default"
                            : "bg-hex-teal/15 text-hex-teal hover:bg-hex-teal/25"
                        }`}
                      >
                        {msg.applied ? (
                          <>
                            <Check size={12} /> Applied
                          </>
                        ) : (
                          <>
                            <Check size={12} /> Apply Changes
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-hex-text-muted">
                <Loader2 size={12} className="animate-spin" />
                Thinking...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-hex-dark-500 p-3 flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe what to change..."
              rows={1}
              className="flex-1 px-3 py-2 bg-hex-dark-600 border border-hex-dark-500 rounded-lg text-hex-text-primary text-sm placeholder:text-hex-text-muted focus:outline-none focus:border-hex-teal resize-none max-h-20"
              style={{ minHeight: "36px" }}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="p-2 rounded-lg bg-gradient-to-br from-hex-teal to-[#0095A8] text-hex-dark-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:opacity-90"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
