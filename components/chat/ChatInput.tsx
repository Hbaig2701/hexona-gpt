"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, X } from "lucide-react";

interface AttachmentData {
  type: string;
  fileName: string;
  extractedText: string;
}

interface AttachmentFile {
  file: File;
  name: string;
  processing: boolean;
  data?: AttachmentData;
  error?: string;
}

interface ChatInputProps {
  onSend: (message: string, attachments?: AttachmentData[]) => void;
  loading: boolean;
}

export default function ChatInput({ onSend, loading }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState<AttachmentFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Autofocus on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // Re-focus after response finishes generating
  useEffect(() => {
    if (!loading) {
      textareaRef.current?.focus();
    }
  }, [loading]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleSend() {
    if (!input.trim() && attachments.length === 0) return;
    if (loading) return;

    const readyAttachments = attachments
      .filter((a) => a.data && !a.processing)
      .map((a) => a.data!);

    onSend(input.trim(), readyAttachments.length > 0 ? readyAttachments : undefined);
    setInput("");
    setAttachments([]);
  }

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Limit to 3 files
    const toProcess = files.slice(0, 3 - attachments.length);

    for (const file of toProcess) {
      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name} is too large. Max file size is 10MB.`);
        continue;
      }

      const attachment: AttachmentFile = { file, name: file.name, processing: true };
      setAttachments((prev) => [...prev, attachment]);

      try {
        const isAudio = file.type.startsWith("audio/") || /\.(mp3|m4a|wav|webm|ogg)$/i.test(file.name);
        const endpoint = isAudio ? "/api/attachments/transcribe" : "/api/attachments/upload";

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(endpoint, { method: "POST", body: formData });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Upload failed");

        setAttachments((prev) =>
          prev.map((a) =>
            a.name === file.name
              ? {
                  ...a,
                  processing: false,
                  data: {
                    type: isAudio ? "voice_note" : data.type || "text",
                    fileName: file.name,
                    extractedText: data.extractedText || data.transcript || "",
                  },
                }
              : a
          )
        );
      } catch (error) {
        setAttachments((prev) =>
          prev.map((a) =>
            a.name === file.name
              ? { ...a, processing: false, error: (error as Error).message }
              : a
          )
        );
      }
    }

    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeAttachment(name: string) {
    setAttachments((prev) => prev.filter((a) => a.name !== name));
  }

  return (
    <div className="border-t border-[var(--hex-dark-500)] pt-4">
      {/* Attachment chips */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {attachments.map((a) => (
            <div
              key={a.name}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs ${
                a.error
                  ? "bg-hex-error/10 border border-hex-error/20 text-hex-error"
                  : a.processing
                  ? "bg-hex-dark-600 border border-hex-dark-500 text-hex-text-muted animate-pulse"
                  : "bg-hex-teal/10 border border-hex-teal/20 text-hex-teal"
              }`}
            >
              <span className="truncate max-w-[150px]">{a.name}</span>
              {a.processing && <span>Processing...</span>}
              {a.data && <span>Ready</span>}
              {a.error && <span>{a.error}</span>}
              <button onClick={() => removeAttachment(a.name)} className="hover:opacity-70">
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-end gap-2">
        {/* File attachment button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2.5 rounded-lg text-[var(--hex-text-muted)] hover:text-[var(--hex-text-primary)] hover:bg-hex-dark-700 transition-colors"
          disabled={loading || attachments.length >= 3}
        >
          <Paperclip size={18} />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          accept=".pdf,.doc,.docx,.txt,.md,.mp3,.m4a,.wav,.webm,.ogg"
          multiple
          className="hidden"
        />

        {/* Text input */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          rows={1}
          className="flex-1 px-4 py-3 bg-[var(--hex-dark-600)] border border-[var(--hex-dark-500)] rounded-lg text-[var(--hex-text-primary)] placeholder:text-[var(--hex-text-muted)] focus:outline-none focus:border-hex-teal transition-colors resize-none max-h-32"
          style={{ minHeight: "44px" }}
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={loading || (!input.trim() && attachments.length === 0)}
          className="p-2.5 rounded-lg bg-gradient-to-br from-hex-teal to-[#0095A8] text-hex-dark-900 disabled:opacity-50 disabled:cursor-not-allowed teal-glow transition-all hover:opacity-90"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
