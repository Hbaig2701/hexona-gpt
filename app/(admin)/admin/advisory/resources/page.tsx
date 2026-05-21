"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit3, Loader2, ExternalLink, Save, X } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import BackLink from "@/components/ui/BackLink";
import type { UserTier } from "@prisma/client";

const TIER_OPTIONS: UserTier[] = ["TIER_1", "TIER_2", "TIER_3"];

type Resource = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  url: string;
  category: string | null;
  thumbnailUrl: string | null;
  requiredTier: UserTier;
  order: number;
  isPublished: boolean;
};

export default function AdminResourcesPage() {
  const [items, setItems] = useState<Resource[] | null>(null);
  const [editing, setEditing] = useState<Resource | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [filterTier, setFilterTier] = useState<UserTier | "ALL">("ALL");

  async function reload() {
    const data = await fetch("/api/admin/advisory/resources").then((r) => r.json());
    setItems(data);
  }

  useEffect(() => {
    reload();
  }, []);

  async function deleteResource(id: string) {
    if (!confirm("Delete this resource?")) return;
    await fetch(`/api/admin/advisory/resources/${id}`, { method: "DELETE" });
    reload();
  }

  const filtered = items?.filter((r) => filterTier === "ALL" || r.requiredTier === filterTier);

  return (
    <div className="max-w-5xl mx-auto">
      <BackLink href="/admin/advisory" label="Back to Advisory Admin" className="mb-4" />
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-hex-text-primary">Resources</h1>
        <Button onClick={() => setShowCreate(true)}>
          <Plus size={14} /> New Resource
        </Button>
      </div>

      <div className="flex gap-2 mb-4">
        {(["ALL", ...TIER_OPTIONS] as const).map((t) => (
          <button
            key={t}
            onClick={() => setFilterTier(t)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              filterTier === t
                ? "bg-hex-teal/15 text-hex-teal"
                : "bg-hex-dark-700 text-hex-text-muted hover:text-hex-text-primary"
            }`}
          >
            {t === "ALL" ? "All tiers" : t.replace("_", " ")}
          </button>
        ))}
      </div>

      {showCreate && (
        <ResourceForm
          onClose={() => setShowCreate(false)}
          onSaved={() => {
            setShowCreate(false);
            reload();
          }}
        />
      )}

      {editing && (
        <ResourceForm
          resource={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            reload();
          }}
        />
      )}

      {items === null ? (
        <div className="flex items-center justify-center py-12 text-hex-text-muted gap-2">
          <Loader2 size={14} className="animate-spin" /> Loading…
        </div>
      ) : filtered && filtered.length === 0 ? (
        <Card hoverable={false} className="text-center py-10">
          <p className="text-hex-text-muted text-sm">No resources yet.</p>
        </Card>
      ) : (
        <div className="space-y-2">
          {filtered?.map((r) => (
            <Card key={r.id} hoverable={false} className="flex items-center gap-3 !py-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-medium text-hex-text-primary text-sm truncate">{r.title}</p>
                  <Badge variant="teal">{r.requiredTier.replace("_", " ")}</Badge>
                  {r.category && (
                    <span className="text-xs text-hex-text-muted">{r.category}</span>
                  )}
                  {!r.isPublished && <Badge>Draft</Badge>}
                </div>
                {r.description && (
                  <p className="text-xs text-hex-text-muted truncate mt-0.5">{r.description}</p>
                )}
                <p className="text-xs text-hex-text-muted/70 truncate font-mono mt-0.5">
                  {r.url || "(no url)"}
                </p>
              </div>
              {r.url && (
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-hex-text-muted hover:text-hex-teal"
                  title="Open"
                >
                  <ExternalLink size={14} />
                </a>
              )}
              <button
                onClick={() => setEditing(r)}
                className="p-2 text-hex-text-muted hover:text-hex-text-primary"
                title="Edit"
              >
                <Edit3 size={14} />
              </button>
              <button
                onClick={() => deleteResource(r.id)}
                className="p-2 text-red-400/70 hover:text-red-400"
                title="Delete"
              >
                <Trash2 size={14} />
              </button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function ResourceForm({
  resource,
  onClose,
  onSaved,
}: {
  resource?: Resource;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    title: resource?.title ?? "",
    slug: resource?.slug ?? "",
    description: resource?.description ?? "",
    url: resource?.url ?? "",
    category: resource?.category ?? "",
    requiredTier: resource?.requiredTier ?? ("TIER_1" as UserTier),
    thumbnailUrl: resource?.thumbnailUrl ?? "",
    isPublished: resource?.isPublished ?? true,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || saving) return;
    setSaving(true);
    setError(null);
    const url = resource
      ? `/api/admin/advisory/resources/${resource.id}`
      : "/api/admin/advisory/resources";
    const res = await fetch(url, {
      method: resource ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      setError(err.error || "Failed to save");
      return;
    }
    onSaved();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 overflow-y-auto p-4 pt-12" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-hex-dark-800 border border-hex-dark-500 rounded-xl w-full max-w-xl shadow-xl">
        <div className="px-6 py-4 border-b border-hex-dark-500 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-hex-text-primary">
            {resource ? "Edit Resource" : "New Resource"}
          </h3>
          <button onClick={onClose} className="p-1 text-hex-text-muted hover:text-hex-text-primary">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={save} className="px-6 py-4 space-y-4">
          <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          {resource && (
            <Input label="URL Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          )}
          <div>
            <label className="block text-sm font-medium text-hex-text-secondary mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-hex-dark-600 border border-hex-dark-500 rounded text-hex-text-primary text-sm focus:outline-none focus:border-hex-teal resize-y"
            />
          </div>
          <Input
            label="Link URL"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            placeholder="https://docs.google.com/…"
          />
          <Input
            label="Category (optional)"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            placeholder="Templates / Guides / Samples / Flowcharts"
          />
          <Input
            label="Thumbnail URL (optional)"
            value={form.thumbnailUrl}
            onChange={(e) => setForm({ ...form, thumbnailUrl: e.target.value })}
          />
          <div>
            <label className="block text-sm font-medium text-hex-text-secondary mb-1.5">Required Tier</label>
            <select
              value={form.requiredTier}
              onChange={(e) => setForm({ ...form, requiredTier: e.target.value as UserTier })}
              className="w-full px-3 py-2 bg-hex-dark-600 border border-hex-dark-500 rounded text-hex-text-primary text-sm focus:outline-none focus:border-hex-teal"
            >
              {TIER_OPTIONS.map((t) => (
                <option key={t} value={t}>{t.replace("_", " ")}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm text-hex-text-secondary">Published</label>
            <button
              type="button"
              onClick={() => setForm({ ...form, isPublished: !form.isPublished })}
              className={`w-10 h-5 rounded-full transition-colors relative ${
                form.isPublished ? "bg-hex-success" : "bg-hex-dark-500"
              }`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                  form.isPublished ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
          {error && <p className="text-sm text-hex-error">{error}</p>}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" loading={saving}>
              <Save size={14} /> Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
