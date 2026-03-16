"use client";

import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check } from "lucide-react";

interface MessageImage {
  base64Data: string;
  mediaType: string;
  fileName: string;
}

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
  images?: MessageImage[];
  streaming?: boolean;
}

export default function MessageBubble({ role, content, images, streaming }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const markdownRef = useRef<HTMLDivElement>(null);

  function handleCopy() {
    // Copy as rich text (HTML) so it pastes nicely into Google Docs, Gmail, etc.
    // Wrap in a light-themed container so pasted content doesn't carry the dark background.
    if (markdownRef.current) {
      const innerHtml = markdownRef.current.innerHTML;
      const html = `<div style="background:#ffffff;color:#000000;font-family:sans-serif;font-size:14px;line-height:1.6">${innerHtml}</div>`;
      const plainText = markdownRef.current.innerText;
      try {
        navigator.clipboard.write([
          new ClipboardItem({
            "text/html": new Blob([html], { type: "text/html" }),
            "text/plain": new Blob([plainText], { type: "text/plain" }),
          }),
        ]);
      } catch {
        navigator.clipboard.writeText(plainText);
      }
    } else {
      navigator.clipboard.writeText(content);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const isUser = role === "user";

  // Strip Perplexity-style citation references like [1], [2][3], etc.
  const cleanContent = isUser ? content : content.replace(/\[\d+\]/g, "");

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
          <div>
            {images && images.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={`data:${img.mediaType};base64,${img.base64Data}`}
                    alt={img.fileName}
                    className="max-w-[200px] max-h-[200px] rounded-lg object-cover"
                  />
                ))}
              </div>
            )}
            <p className="whitespace-pre-wrap">{content}</p>
          </div>
        ) : (
          <div className="markdown-content" ref={markdownRef}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {cleanContent}
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
