"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit3, Loader2, ExternalLink, Save, X, GripVertical } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import BackLink from "@/components/ui/BackLink";
import type { UserTier } from "@prisma/client";
import { csvToTableData } from "@/lib/csv";

const TIER_OPTIONS: UserTier[] = ["TIER_1", "TIER_2", "TIER_3"];

type TableData = { headers: string[]; rows: string[][] };
type ListItem = {
  title: string;
  description?: string;
  links: Array<{ label: string; url: string }>;
};
type ListData = { items: ListItem[] };

type Resource = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  url: string;
  tableData: TableData | null;
  listData: ListData | null;
  documentMd: string | null;
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
  const initialMode: "link" | "list" | "table" | "document" = resource?.documentMd
    ? "document"
    : resource?.listData
    ? "list"
    : resource?.tableData
    ? "table"
    : "link";
  const [mode, setMode] = useState<"link" | "list" | "table" | "document">(initialMode);
  const [documentMd, setDocumentMd] = useState<string>(resource?.documentMd ?? "");
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
  const [listItems, setListItems] = useState<ListItem[]>(resource?.listData?.items ?? []);
  const [tableData, setTableData] = useState<TableData | null>(resource?.tableData ?? null);
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
    const body = {
      ...form,
      listData: mode === "list" && listItems.length > 0 ? { items: listItems } : null,
      tableData: mode === "table" ? tableData : null,
      documentMd: mode === "document" && documentMd.trim() ? documentMd : null,
    };
    const res = await fetch(url, {
      method: resource ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
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
          <div>
            <label className="block text-sm font-medium text-hex-text-secondary mb-1.5">Content type</label>
            <div className="flex gap-1 p-1 bg-hex-dark-700 rounded-lg border border-hex-dark-500">
              {([
                { k: "link", label: "External link" },
                { k: "list", label: "List" },
                { k: "table", label: "Table" },
                { k: "document", label: "Document" },
              ] as const).map((opt) => (
                <button
                  key={opt.k}
                  type="button"
                  onClick={() => setMode(opt.k)}
                  className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    mode === opt.k
                      ? "bg-hex-dark-900 text-hex-teal"
                      : "text-hex-text-muted hover:text-hex-text-secondary"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-hex-text-muted mt-1.5">
              {mode === "link" && "Opens an external URL in a new tab."}
              {mode === "list" && "Click-to-expand items with links — good for funnel templates, libraries."}
              {mode === "table" && "Sortable, searchable table — good for data with multiple columns."}
              {mode === "document" && "Long-form written guide (markdown). Renders inline with headings, lists, blockquotes."}
            </p>
          </div>

          <Input
            label={mode === "link" ? "Link URL" : "Original sheet URL (optional)"}
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            placeholder="https://docs.google.com/…"
          />

          {mode === "list" && (
            <ListEditor items={listItems} onChange={setListItems} />
          )}
          {mode === "table" && (
            <TableEditor value={tableData} onChange={setTableData} />
          )}
          {mode === "document" && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-hex-text-secondary">
                Markdown content
              </label>
              <textarea
                value={documentMd}
                onChange={(e) => setDocumentMd(e.target.value)}
                rows={16}
                placeholder={`# Title\n\nIntro paragraph.\n\n## Section\n- bullet\n- bullet`}
                className="w-full px-3 py-2 bg-hex-dark-600 border border-hex-dark-500 rounded text-hex-text-primary text-xs font-mono focus:outline-none focus:border-hex-teal resize-y"
              />
              <p className="text-xs text-hex-text-muted">
                Supports headings (#, ##, ###), lists, **bold**, *italic*, &gt; blockquotes, links, tables, --- horizontal rules.
              </p>
            </div>
          )}

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

function ListEditor({
  items,
  onChange,
}: {
  items: ListItem[];
  onChange: (next: ListItem[]) => void;
}) {
  function update(idx: number, patch: Partial<ListItem>) {
    onChange(items.map((it, i) => (i === idx ? { ...it, ...patch } : it)));
  }
  function addItem() {
    onChange([...items, { title: "", description: "", links: [{ label: "Open", url: "" }] }]);
  }
  function removeItem(idx: number) {
    onChange(items.filter((_, i) => i !== idx));
  }
  function move(idx: number, dir: -1 | 1) {
    const target = idx + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next);
  }
  function updateLink(itemIdx: number, linkIdx: number, patch: { label?: string; url?: string }) {
    const item = items[itemIdx];
    const newLinks = item.links.map((l, i) => (i === linkIdx ? { ...l, ...patch } : l));
    update(itemIdx, { links: newLinks });
  }
  function addLink(itemIdx: number) {
    update(itemIdx, { links: [...items[itemIdx].links, { label: "Open", url: "" }] });
  }
  function removeLink(itemIdx: number, linkIdx: number) {
    update(itemIdx, { links: items[itemIdx].links.filter((_, i) => i !== linkIdx) });
  }

  return (
    <div className="space-y-2 bg-hex-dark-700/40 border border-hex-dark-500 rounded p-3">
      <p className="text-xs text-hex-text-muted">
        Each item shows as a collapsible row. Click to expand → reveals description + links.
      </p>
      {items.map((item, idx) => (
        <div key={idx} className="bg-hex-dark-800 border border-hex-dark-500 rounded p-3 space-y-2">
          <div className="flex items-center gap-2">
            <GripVertical size={12} className="text-hex-text-muted shrink-0" />
            <input
              value={item.title}
              onChange={(e) => update(idx, { title: e.target.value })}
              placeholder="Item title (e.g. Lead Magnet Funnel)"
              className="flex-1 px-2 py-1 bg-hex-dark-600 border border-hex-dark-500 rounded text-sm text-hex-text-primary focus:outline-none focus:border-hex-teal"
            />
            <button type="button" onClick={() => move(idx, -1)} disabled={idx === 0} className="p-1 text-hex-text-muted hover:text-hex-text-primary disabled:opacity-30">↑</button>
            <button type="button" onClick={() => move(idx, 1)} disabled={idx === items.length - 1} className="p-1 text-hex-text-muted hover:text-hex-text-primary disabled:opacity-30">↓</button>
            <button type="button" onClick={() => removeItem(idx)} className="p-1 text-red-400/70 hover:text-red-400">
              <Trash2 size={12} />
            </button>
          </div>
          <textarea
            value={item.description ?? ""}
            onChange={(e) => update(idx, { description: e.target.value })}
            rows={2}
            placeholder="Description (optional)"
            className="w-full px-2 py-1 bg-hex-dark-600 border border-hex-dark-500 rounded text-xs text-hex-text-secondary focus:outline-none focus:border-hex-teal resize-y"
          />
          <div className="space-y-1.5 pl-3 border-l-2 border-hex-dark-500">
            {item.links.map((link, li) => (
              <div key={li} className="flex items-center gap-1.5">
                <input
                  value={link.label}
                  onChange={(e) => updateLink(idx, li, { label: e.target.value })}
                  placeholder="Label"
                  className="w-24 px-2 py-1 bg-hex-dark-600 border border-hex-dark-500 rounded text-xs text-hex-text-primary focus:outline-none focus:border-hex-teal"
                />
                <input
                  value={link.url}
                  onChange={(e) => updateLink(idx, li, { url: e.target.value })}
                  placeholder="https://…"
                  className="flex-1 px-2 py-1 bg-hex-dark-600 border border-hex-dark-500 rounded text-xs font-mono text-hex-text-primary focus:outline-none focus:border-hex-teal"
                />
                <button type="button" onClick={() => removeLink(idx, li)} className="p-1 text-red-400/70 hover:text-red-400">
                  <Trash2 size={11} />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addLink(idx)} className="text-xs text-hex-teal hover:underline">
              + Add link
            </button>
          </div>
        </div>
      ))}
      <Button type="button" size="sm" variant="secondary" onClick={addItem}>
        <Plus size={12} /> Add Item
      </Button>
    </div>
  );
}

function TableEditor({
  value,
  onChange,
}: {
  value: TableData | null;
  onChange: (v: TableData | null) => void;
}) {
  const [pasteText, setPasteText] = useState("");
  const [pasteError, setPasteError] = useState<string | null>(null);

  function applyPaste() {
    setPasteError(null);
    const parsed = csvToTableData(pasteText);
    if (!parsed || parsed.headers.length === 0) {
      setPasteError("Could not parse — paste comma- or tab-separated rows including a header row.");
      return;
    }
    onChange(parsed);
    setPasteText("");
  }

  return (
    <div className="space-y-3 bg-hex-dark-700/40 border border-hex-dark-500 rounded p-3">
      <p className="text-xs text-hex-text-muted">
        Paste tabular data (CSV or copied from Google Sheets/Excel). First row is the header.
      </p>
      <textarea
        value={pasteText}
        onChange={(e) => setPasteText(e.target.value)}
        rows={6}
        placeholder={`Header A,Header B\nrow1col1,row1col2\nrow2col1,row2col2`}
        className="w-full px-3 py-2 bg-hex-dark-600 border border-hex-dark-500 rounded text-hex-text-primary text-xs font-mono focus:outline-none focus:border-hex-teal resize-y"
      />
      <div className="flex items-center gap-2 flex-wrap">
        <Button type="button" size="sm" onClick={applyPaste}>Parse & Replace</Button>
        {value && (
          <Button type="button" size="sm" variant="ghost" onClick={() => onChange(null)}>
            Clear table
          </Button>
        )}
        {pasteError && <span className="text-xs text-hex-error">{pasteError}</span>}
      </div>
      {value && (
        <div className="text-xs text-hex-text-secondary border-t border-hex-dark-500 pt-2">
          <p className="font-semibold mb-1">
            {value.rows.length} row{value.rows.length !== 1 ? "s" : ""} × {value.headers.length} column{value.headers.length !== 1 ? "s" : ""}
          </p>
          <p className="text-hex-text-muted truncate font-mono">
            {value.headers.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}
