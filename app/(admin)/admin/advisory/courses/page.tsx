"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Loader2 } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import BackLink from "@/components/ui/BackLink";
import type { UserTier } from "@prisma/client";

type CourseRow = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  requiredTier: UserTier;
  isPublished: boolean;
  order: number;
  instructor: { name: string } | null;
  _count: { modules: number; enrollments: number };
};

const TIER_OPTIONS: UserTier[] = ["TIER_1", "TIER_2", "TIER_3"];

export default function AdminCoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<CourseRow[] | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ title: "", subtitle: "", requiredTier: "TIER_1" as UserTier });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/advisory/courses")
      .then((r) => r.json())
      .then(setCourses);
  }, []);

  async function createCourse(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || creating) return;
    setCreating(true);
    const res = await fetch("/api/admin/advisory/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setCreating(false);
    if (res.ok) {
      const created = await res.json();
      router.push(`/admin/advisory/courses/${created.id}`);
    }
  }

  async function deleteCourse(id: string) {
    if (!confirm("Delete this course? All modules and lessons will be removed. This cannot be undone.")) return;
    setDeletingId(id);
    const res = await fetch(`/api/admin/advisory/courses/${id}`, { method: "DELETE" });
    if (res.ok) {
      setCourses((prev) => prev?.filter((c) => c.id !== id) ?? null);
    }
    setDeletingId(null);
  }

  return (
    <div className="max-w-5xl mx-auto">
      <BackLink href="/admin/advisory" label="Back to Advisory Admin" className="mb-4" />
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-hex-text-primary">Courses</h1>
        <Button onClick={() => setShowCreate((v) => !v)}>
          <Plus size={14} /> New Course
        </Button>
      </div>

      {showCreate && (
        <Card hoverable={false} className="mb-6">
          <form onSubmit={createCourse} className="space-y-3">
            <Input
              label="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. AI Automation Accelerator"
              required
            />
            <Input
              label="Subtitle (optional)"
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              placeholder="Short tagline shown under the hero title"
            />
            <div>
              <label className="block text-sm font-medium text-hex-text-secondary mb-1.5">
                Required Tier
              </label>
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
            <div className="flex gap-2">
              <Button type="submit" loading={creating}>Create</Button>
              <Button type="button" variant="ghost" onClick={() => setShowCreate(false)}>Cancel</Button>
            </div>
          </form>
        </Card>
      )}

      {courses === null ? (
        <div className="flex items-center justify-center py-12 text-hex-text-muted gap-2">
          <Loader2 size={14} className="animate-spin" /> Loading…
        </div>
      ) : courses.length === 0 ? (
        <Card hoverable={false} className="text-center py-10">
          <p className="text-hex-text-muted text-sm">No courses yet. Create one to get started.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {courses.map((c) => (
            <Card key={c.id} hoverable={false} className="flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <Link
                    href={`/admin/advisory/courses/${c.id}`}
                    className="font-display font-semibold text-hex-text-primary hover:text-hex-teal transition-colors"
                  >
                    {c.title}
                  </Link>
                  <Badge variant={c.isPublished ? "success" : "default"}>
                    {c.isPublished ? "Published" : "Draft"}
                  </Badge>
                  <Badge variant="teal">{c.requiredTier.replace("_", " ")}</Badge>
                </div>
                <p className="text-xs text-hex-text-muted mt-1">
                  {c._count.modules} module{c._count.modules !== 1 ? "s" : ""}
                  {c.instructor ? ` · ${c.instructor.name}` : ""}
                  {" · "}slug: <span className="font-mono">{c.slug}</span>
                </p>
              </div>
              <button
                onClick={() => deleteCourse(c.id)}
                disabled={deletingId === c.id}
                className="p-2 text-red-400/70 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                title="Delete"
              >
                {deletingId === c.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
              </button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
