"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check } from "lucide-react";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

export default function MessageBubble({ role, content, streaming }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} group`}>
      <div
        className={`relative max-w-[80%] rounded-xl px-4 py-3 text-sm ${
          isUser
            ? "bg-gradient-to-br from-hex-teal to-[#0095A8] text-hex-dark-900"
            : "card-base border-l-2 border-l-hex-teal/30"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{content}</p>
        ) : (
          <div className="markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
            {streaming && (
              <span className="inline-block w-1.5 h-4 bg-hex-teal animate-pulse ml-0.5 align-middle" />
            )}
          </div>
        )}

        {/* Copy button */}
        {!streaming && !isUser && (
          <button
            onClick={handleCopy}
            className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-hex-dark-600 border border-hex-dark-500 text-hex-text-muted hover:text-hex-text-primary"
          >
            {copied ? <Check size={12} className="text-hex-success" /> : <Copy size={12} />}
          </button>
        )}
      </div>
    </div>
  );
}
