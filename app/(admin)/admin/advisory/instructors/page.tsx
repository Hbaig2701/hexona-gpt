"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit3, Loader2, Save, X } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import BackLink from "@/components/ui/BackLink";

type Instructor = {
  id: string;
  name: string;
  bio: string | null;
  photoUrl: string | null;
  _count?: { courses: number };
};

export default function AdminInstructorsPage() {
  const [items, setItems] = useState<Instructor[] | null>(null);
  const [editing, setEditing] = useState<Instructor | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  async function reload() {
    const data = await fetch("/api/admin/advisory/instructors").then((r) => r.json());
    setItems(data);
  }

  useEffect(() => {
    reload();
  }, []);

  async function deleteInstructor(id: string) {
    if (!confirm("Delete this instructor? Any course currently assigned will be unassigned.")) return;
    await fetch(`/api/admin/advisory/instructors/${id}`, { method: "DELETE" });
    reload();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <BackLink href="/admin/advisory" label="Back to Advisory Admin" className="mb-4" />
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-hex-text-primary">Instructors</h1>
        <Button onClick={() => setShowCreate(true)}>
          <Plus size={14} /> New Instructor
        </Button>
      </div>

      {showCreate && (
        <InstructorForm
          onClose={() => setShowCreate(false)}
          onSaved={() => {
            setShowCreate(false);
            reload();
          }}
        />
      )}
      {editing && (
        <InstructorForm
          instructor={editing}
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
      ) : items.length === 0 ? (
        <Card hoverable={false} className="text-center py-10">
          <p className="text-hex-text-muted text-sm">No instructors yet.</p>
        </Card>
      ) : (
        <div className="space-y-2">
          {items.map((i) => (
            <Card key={i.id} hoverable={false} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-hex-teal to-[#0095A8] flex items-center justify-center text-hex-dark-900 font-semibold">
                {i.name[0]?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-hex-text-primary text-sm">{i.name}</p>
                {i.bio && <p className="text-xs text-hex-text-muted truncate">{i.bio}</p>}
                <p className="text-xs text-hex-text-muted/70">
                  {i._count?.courses ?? 0} course{(i._count?.courses ?? 0) !== 1 ? "s" : ""}
                </p>
              </div>
              <button
                onClick={() => setEditing(i)}
                className="p-2 text-hex-text-muted hover:text-hex-text-primary"
                title="Edit"
              >
                <Edit3 size={14} />
              </button>
              <button
                onClick={() => deleteInstructor(i.id)}
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

function InstructorForm({
  instructor,
  onClose,
  onSaved,
}: {
  instructor?: Instructor;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    name: instructor?.name ?? "",
    bio: instructor?.bio ?? "",
    photoUrl: instructor?.photoUrl ?? "",
  });
  const [saving, setSaving] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || saving) return;
    setSaving(true);
    await fetch(
      instructor
        ? `/api/admin/advisory/instructors/${instructor.id}`
        : "/api/admin/advisory/instructors",
      {
        method: instructor ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );
    setSaving(false);
    onSaved();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-12" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-hex-dark-800 border border-hex-dark-500 rounded-xl w-full max-w-md shadow-xl">
        <div className="px-6 py-4 border-b border-hex-dark-500 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-hex-text-primary">
            {instructor ? "Edit Instructor" : "New Instructor"}
          </h3>
          <button onClick={onClose} className="p-1 text-hex-text-muted hover:text-hex-text-primary">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={save} className="px-6 py-4 space-y-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <div>
            <label className="block text-sm font-medium text-hex-text-secondary mb-1.5">Bio</label>
            <textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 bg-hex-dark-600 border border-hex-dark-500 rounded text-hex-text-primary text-sm focus:outline-none focus:border-hex-teal resize-y"
              placeholder="Short bio (e.g. Award-winning AI Entrepreneur)"
            />
          </div>
          <Input
            label="Photo URL (optional)"
            value={form.photoUrl}
            onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
          />
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
