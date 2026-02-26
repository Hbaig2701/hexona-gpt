"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

interface Conversation {
  id: string;
  title?: string;
  createdAt: string;
  updatedAt: string;
}

interface ConversationHistoryProps {
  gptSlug: string;
  clientId?: string;
  currentId?: string | null;
  onSelect: (id: string) => void;
  onClose: () => void;
}

export default function ConversationHistory({
  gptSlug,
  clientId,
  currentId,
  onSelect,
  onClose,
}: ConversationHistoryProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams({ gptSlug });
    if (clientId) params.set("clientId", clientId);

    fetch(`/api/conversations?${params}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setConversations(data);
      })
      .finally(() => setLoading(false));
  }, [gptSlug, clientId]);

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 bottom-0 w-80 bg-hex-dark-800 border-l border-hex-dark-500 z-50 flex flex-col"
      >
        <div className="flex items-center justify-between p-4 border-b border-hex-dark-500">
          <h3 className="font-display text-sm font-semibold text-hex-text-primary">
            Conversation History
          </h3>
          <button onClick={onClose} className="text-hex-text-muted hover:text-hex-text-primary">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-hex-dark-700 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : conversations.length === 0 ? (
            <p className="text-hex-text-muted text-sm text-center py-8">No conversations yet</p>
          ) : (
            conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => onSelect(conv.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors text-sm ${
                  conv.id === currentId
                    ? "bg-hex-teal/10 border border-hex-teal/20 text-hex-teal"
                    : "hover:bg-hex-dark-700 text-hex-text-secondary"
                }`}
              >
                <p className="truncate font-medium text-hex-text-primary">
                  {conv.title || "Untitled"}
                </p>
                <p className="text-xs text-hex-text-muted mt-0.5">
                  {new Date(conv.updatedAt).toLocaleDateString()}
                </p>
              </button>
            ))
          )}
        </div>
      </motion.div>
    </>
  );
}
