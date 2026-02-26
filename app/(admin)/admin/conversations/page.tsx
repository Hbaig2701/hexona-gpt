"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import MessageBubble from "@/components/chat/MessageBubble";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GPT_CATALOG } from "@/lib/gpt-catalog";
import { Suspense } from "react";

interface ConversationListItem {
  id: string;
  gptSlug: string;
  title?: string;
  updatedAt: string;
  user: { name?: string; email: string };
  client?: { businessName: string };
  _count: { messages: number };
}

interface ConversationDetail {
  id: string;
  gptSlug: string;
  title?: string;
  user: { name?: string; email: string };
  client?: { businessName: string };
  messages: {
    id: string;
    role: string;
    content: string;
    tokensUsed?: number;
    createdAt: string;
  }[];
}

function ConversationViewerContent() {
  const searchParams = useSearchParams();
  const initialUserId = searchParams.get("userId");

  const [conversations, setConversations] = useState<ConversationListItem[]>([]);
  const [selectedConv, setSelectedConv] = useState<ConversationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterGpt, setFilterGpt] = useState("");
  const [filterUser, setFilterUser] = useState(initialUserId || "");

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (filterGpt) params.set("gptSlug", filterGpt);
    if (filterUser) params.set("userId", filterUser);

    fetch(`/api/admin/conversations?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setConversations(data.conversations || []);
        setTotalPages(data.totalPages || 1);
      })
      .finally(() => setLoading(false));
  }, [page, filterGpt, filterUser]);

  async function openConversation(id: string) {
    const res = await fetch(`/api/admin/conversations?id=${id}`);
    const data = await res.json();
    setSelectedConv(data);
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="font-display text-2xl font-bold text-hex-text-primary mb-6">Conversation Viewer</h1>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <select
          value={filterGpt}
          onChange={(e) => { setFilterGpt(e.target.value); setPage(1); }}
          className="px-3 py-2 bg-hex-dark-600 border border-hex-dark-500 rounded text-hex-text-primary text-sm focus:outline-none focus:border-hex-teal"
        >
          <option value="">All GPTs</option>
          {GPT_CATALOG.map((g) => (
            <option key={g.slug} value={g.slug}>{g.name}</option>
          ))}
        </select>
        <input
          type="text"
          value={filterUser}
          onChange={(e) => { setFilterUser(e.target.value); setPage(1); }}
          placeholder="Filter by user ID..."
          className="px-3 py-2 bg-hex-dark-600 border border-hex-dark-500 rounded text-hex-text-primary text-sm focus:outline-none focus:border-hex-teal placeholder:text-hex-text-muted"
        />
      </div>

      <div className="flex gap-6">
        {/* Conversation List */}
        <div className="flex-1 space-y-2">
          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => <div key={i} className="h-16 bg-hex-dark-700 rounded-lg animate-pulse" />)}
            </div>
          ) : conversations.length === 0 ? (
            <Card hoverable={false} className="text-center py-8">
              <p className="text-hex-text-muted">No conversations found</p>
            </Card>
          ) : (
            <>
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => openConversation(conv.id)}
                  className={`w-full text-left card-base p-4 transition-all ${
                    selectedConv?.id === conv.id ? "border-hex-teal/40" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-hex-text-primary font-medium">
                          {conv.user.name || conv.user.email}
                        </span>
                        <Badge variant="teal">{conv.gptSlug}</Badge>
                      </div>
                      <p className="text-xs text-hex-text-muted mt-0.5">
                        {conv.title || "Untitled"} • {conv._count.messages} msgs
                        {conv.client && ` • ${conv.client.businessName}`}
                      </p>
                    </div>
                    <span className="text-xs text-hex-text-muted">
                      {new Date(conv.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </button>
              ))}

              {/* Pagination */}
              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page <= 1}
                  className="p-2 text-hex-text-muted hover:text-hex-text-primary disabled:opacity-30"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-sm text-hex-text-secondary">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page >= totalPages}
                  className="p-2 text-hex-text-muted hover:text-hex-text-primary disabled:opacity-30"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Conversation Detail */}
        {selectedConv && (
          <div className="w-96 card-base p-4 max-h-[70vh] overflow-y-auto sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-hex-text-primary font-medium">
                  {selectedConv.title || "Untitled"}
                </p>
                <p className="text-xs text-hex-text-muted">
                  {selectedConv.user.name || selectedConv.user.email} • {selectedConv.gptSlug}
                </p>
              </div>
              <button onClick={() => setSelectedConv(null)} className="text-hex-text-muted hover:text-hex-text-primary">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3">
              {selectedConv.messages.map((msg) => (
                <div key={msg.id}>
                  <MessageBubble
                    role={msg.role === "USER" ? "user" : "assistant"}
                    content={msg.content}
                  />
                  {msg.tokensUsed && (
                    <p className="text-[10px] text-hex-text-muted mt-0.5 text-right">
                      {msg.tokensUsed} tokens
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminConversationsPage() {
  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto animate-pulse h-64 bg-hex-dark-700 rounded-lg" />}>
      <ConversationViewerContent />
    </Suspense>
  );
}
