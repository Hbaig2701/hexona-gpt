"use client";

import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check, Download } from "lucide-react";
import { markdownComponents, linkifyInternalPaths } from "@/lib/markdown-components";

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
  gptSlug?: string;
}

const SPEC_MARKER = "<!--PROJECT_SPEC_MD-->";

function inferSpecFilename(specMd: string): string {
  const match = specMd.match(/^#\s+(.+?)\s*[—–-]\s*Technical Specification/m);
  if (match) {
    const slug = match[1]
      .replace(/[[\]]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 50);
    if (slug) return `${slug}-spec.md`;
  }
  return "project-spec.md";
}

export default function MessageBubble({ role, content, images, streaming, gptSlug }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const markdownRef = useRef<HTMLDivElement>(null);

  const isSpecMessage =
    role === "assistant" && gptSlug === "project-spec" && content.trimStart().startsWith(SPEC_MARKER);
  const specMd = isSpecMessage
    ? content.replace(/^\s*<!--PROJECT_SPEC_MD-->\s*\n?/, "")
    : content;

  function handleDownloadSpec() {
    const blob = new Blob([specMd], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = inferSpecFilename(specMd);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  }

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

  // Strip Perplexity-style citation references like [1], [2][3], then defensively
  // wrap bare /advisors/<slug>-style internal paths so they render as real links.
  const cleanContent = isUser
    ? content
    : linkifyInternalPaths(specMd.replace(/\[\d+\]/g, ""));

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
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {cleanContent}
            </ReactMarkdown>
            {streaming && (
              <span className="inline-block w-1.5 h-4 bg-hex-teal animate-pulse ml-0.5 align-middle" />
            )}
          </div>
        )}

        {/* Action buttons */}
        {!streaming && !isUser && (
          <div className="absolute -top-2 -right-2 flex gap-1.5 items-center">
            {isSpecMessage && (
              <button
                onClick={handleDownloadSpec}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-hex-teal text-hex-dark-900 text-xs font-semibold shadow-sm hover:brightness-110 transition"
              >
                {downloaded ? (
                  <>
                    <Check size={12} /> Saved
                  </>
                ) : (
                  <>
                    <Download size={12} /> Download .md
                  </>
                )}
              </button>
            )}
            <button
              onClick={handleCopy}
              title="Copy"
              className={`p-1.5 rounded-lg bg-hex-dark-600 border border-hex-dark-500 text-hex-text-muted hover:text-hex-text-primary transition-opacity ${
                isSpecMessage ? "" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              {copied ? <Check size={12} className="text-hex-success" /> : <Copy size={12} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
