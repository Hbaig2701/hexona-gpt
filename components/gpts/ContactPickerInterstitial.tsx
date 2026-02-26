"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import type { GPT } from "@/lib/gpt-catalog";

interface ContactItem {
  id: string;
  businessName: string;
  industry?: string;
  status: string;
}

const statusVariant: Record<string, "success" | "warning" | "error" | "teal" | "default"> = {
  ACTIVE: "success",
  PROSPECT: "teal",
  PAUSED: "warning",
  CHURNED: "error",
};

export default function ContactPickerInterstitial({ gpt }: { gpt: GPT }) {
  const router = useRouter();
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/clients")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setContacts(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = contacts.filter(
    (c) =>
      c.businessName.toLowerCase().includes(search.toLowerCase()) ||
      c.industry?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-md mx-auto pt-12">
      <div className="card-base p-6">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-[rgba(0,196,204,0.1)] flex items-center justify-center mx-auto mb-3">
            <Search size={22} className="text-hex-teal" />
          </div>
          <h2 className="font-display text-lg font-semibold text-[var(--hex-text-primary)]">
            This GPT works with a specific contact
          </h2>
          <p className="text-[var(--hex-text-muted)] text-sm mt-1">
            {gpt.name} needs to be linked to a contact to work properly. Pick an existing one or create a new one.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--hex-text-muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search contacts..."
            className="w-full pl-9 pr-3 py-2.5 bg-[var(--hex-dark-600)] border border-[var(--hex-dark-500)] rounded-lg text-sm text-[var(--hex-text-primary)] placeholder:text-[var(--hex-text-muted)] focus:outline-none focus:border-hex-teal transition-colors"
          />
        </div>

        {/* Contact list */}
        <div className="max-h-64 overflow-y-auto space-y-1 mb-4">
          {loading ? (
            <div className="py-6 text-center text-[var(--hex-text-muted)] text-sm">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="py-6 text-center text-[var(--hex-text-muted)] text-sm">
              {contacts.length === 0 ? "No contacts yet" : "No matches found"}
            </div>
          ) : (
            filtered.map((contact) => (
              <button
                key={contact.id}
                onClick={() => router.push(`/clients/${contact.id}/gpts/${gpt.slug}`)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left hover:bg-[var(--hex-dark-700)] transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-sm text-[var(--hex-text-primary)] truncate">{contact.businessName}</p>
                  {contact.industry && (
                    <p className="text-xs text-[var(--hex-text-muted)] truncate">{contact.industry}</p>
                  )}
                </div>
                <Badge variant={statusVariant[contact.status] || "default"}>
                  {contact.status}
                </Badge>
              </button>
            ))
          )}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-[var(--hex-dark-500)]" />
          <span className="text-xs text-[var(--hex-text-muted)]">or</span>
          <div className="flex-1 h-px bg-[var(--hex-dark-500)]" />
        </div>

        {/* Create new */}
        <Button
          variant="secondary"
          className="w-full"
          onClick={() =>
            router.push(`/clients/new?redirectTo=/clients/{clientId}/gpts/${gpt.slug}`)
          }
        >
          <Plus size={16} /> Create new contact
        </Button>
      </div>
    </div>
  );
}
