"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Edit2, ExternalLink, Save, Trash2 } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import { getClientScopedGpts, GPT_CATEGORIES, type GPT } from "@/lib/gpt-catalog";

interface ClientData {
  id: string;
  businessName: string;
  website?: string;
  industry?: string;
  status: string;
  contactName?: string;
  contactEmail?: string;
  notes?: string;
  conversations: { id: string; gptSlug: string; title?: string; updatedAt: string }[];
}

const statusOptions = ["PROSPECT", "ACTIVE", "PAUSED", "CHURNED"];
const statusVariant: Record<string, "success" | "warning" | "error" | "teal" | "default"> = {
  ACTIVE: "success",
  PROSPECT: "teal",
  PAUSED: "warning",
  CHURNED: "error",
};

export default function ClientDashboardPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params.clientId as string;
  const [client, setClient] = useState<ClientData | null>(null);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<ClientData>>({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/clients/${clientId}`)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => {
        setClient(data);
        setEditForm(data);
      })
      .catch(() => router.push("/clients"))
      .finally(() => setLoading(false));
  }, [clientId, router]);

  async function handleSave() {
    setSaving(true);
    const res = await fetch(`/api/clients/${clientId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    if (res.ok) {
      const updated = await res.json();
      setClient({ ...client!, ...updated });
      setEditing(false);
    }
    setSaving(false);
  }

  async function handleDelete() {
    if (!confirm("Delete this contact? This cannot be undone.")) return;
    await fetch(`/api/clients/${clientId}`, { method: "DELETE" });
    router.push("/clients");
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto animate-pulse space-y-4">
        <div className="h-8 bg-hex-dark-700 rounded w-1/3" />
        <div className="h-32 bg-hex-dark-700 rounded" />
      </div>
    );
  }

  if (!client) return null;

  const clientGpts = getClientScopedGpts();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl font-bold text-[var(--hex-text-primary)]">
              {client.businessName}
            </h1>
            <Badge variant={statusVariant[client.status] || "default"}>
              {client.status}
            </Badge>
          </div>
          {client.website && (
            <a
              href={client.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-hex-teal text-sm flex items-center gap-1 mt-1 hover:underline"
            >
              {client.website} <ExternalLink size={12} />
            </a>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => setEditing(!editing)}>
            <Edit2 size={14} /> {editing ? "Cancel" : "Edit"}
          </Button>
          <Button variant="danger" size="sm" onClick={handleDelete}>
            <Trash2 size={14} />
          </Button>
        </div>
      </div>

      {/* Edit Form */}
      {editing && (
        <Card hoverable={false}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Business Name"
                value={editForm.businessName || ""}
                onChange={(e) => setEditForm({ ...editForm, businessName: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-[var(--hex-text-secondary)] mb-1.5">Status</label>
                <select
                  value={editForm.status || ""}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="w-full px-3 py-2 bg-[var(--hex-dark-600)] border border-[var(--hex-dark-500)] rounded text-[var(--hex-text-primary)] focus:outline-none focus:border-hex-teal"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Industry"
                value={editForm.industry || ""}
                onChange={(e) => setEditForm({ ...editForm, industry: e.target.value })}
              />
              <Input
                label="Website"
                value={editForm.website || ""}
                onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Contact Name"
                value={editForm.contactName || ""}
                onChange={(e) => setEditForm({ ...editForm, contactName: e.target.value })}
              />
              <Input
                label="Contact Email"
                value={editForm.contactEmail || ""}
                onChange={(e) => setEditForm({ ...editForm, contactEmail: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--hex-text-secondary)] mb-1.5">Notes</label>
              <textarea
                value={editForm.notes || ""}
                onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 bg-[var(--hex-dark-600)] border border-[var(--hex-dark-500)] rounded text-[var(--hex-text-primary)] focus:outline-none focus:border-hex-teal resize-none"
              />
            </div>
            <Button onClick={handleSave} loading={saving}>
              <Save size={14} /> Save Changes
            </Button>
          </div>
        </Card>
      )}

      {/* Client-Scoped GPT Cards */}
      <div>
        <h2 className="font-display text-lg font-semibold text-[var(--hex-text-primary)] mb-3">
          GPT Tools for {client.businessName}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {clientGpts.map((gpt) => (
            <ClientGPTCard key={gpt.slug} gpt={gpt} clientId={clientId} />
          ))}
        </div>
      </div>

      {/* Recent Conversations */}
      {client.conversations.length > 0 && (
        <div>
          <h2 className="font-display text-lg font-semibold text-[var(--hex-text-primary)] mb-3">
            Recent conversations
          </h2>
          <div className="space-y-2">
            {client.conversations.map((conv) => (
              <Link key={conv.id} href={`/clients/${clientId}/gpts/${conv.gptSlug}?conversation=${conv.id}`}>
                <Card className="cursor-pointer py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-hex-teal">{conv.gptSlug}</p>
                      <p className="text-[var(--hex-text-primary)]">
                        {conv.title || "Untitled"}
                      </p>
                    </div>
                    <p className="text-sm text-[var(--hex-text-secondary)]">
                      {new Date(conv.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ClientGPTCard({ gpt, clientId }: { gpt: GPT; clientId: string }) {
  const Icon = (LucideIcons as unknown as Record<string, React.ElementType>)[gpt.icon] || LucideIcons.Zap;
  const category = GPT_CATEGORIES[gpt.category];

  return (
    <Link href={`/clients/${clientId}/gpts/${gpt.slug}`}>
      <Card className="cursor-pointer h-full">
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${category.color}20` }}
          >
            <Icon size={20} style={{ color: category.color }} />
          </div>
          <div>
            <p className="text-[var(--hex-text-primary)] font-medium">{gpt.name}</p>
            <p className="text-[var(--hex-text-secondary)] text-sm mt-0.5 line-clamp-2">{gpt.description}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
