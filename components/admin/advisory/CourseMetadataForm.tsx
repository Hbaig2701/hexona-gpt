"use client";

import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import type { CourseFull, InstructorRow } from "./types";
import type { UserTier } from "@prisma/client";

const TIER_OPTIONS: UserTier[] = ["TIER_1", "TIER_2", "TIER_3"];

interface Props {
  course: CourseFull;
  instructors: InstructorRow[];
  onSaved: () => void;
}

export default function CourseMetadataForm({ course, instructors, onSaved }: Props) {
  const [form, setForm] = useState({
    title: course.title,
    slug: course.slug,
    subtitle: course.subtitle ?? "",
    heroBannerUrl: course.heroBannerUrl ?? "",
    thumbnailUrl: course.thumbnailUrl ?? "",
    ctaLabel: course.ctaLabel,
    requiredTier: course.requiredTier,
    instructorId: course.instructorId ?? "",
    isPublished: course.isPublished,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save() {
    setSaving(true);
    setError(null);
    const res = await fetch(`/api/admin/advisory/courses/${course.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        instructorId: form.instructorId || null,
      }),
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
    <Card hoverable={false} className="space-y-4">
      <Input
        label="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <Input
        label="URL Slug"
        value={form.slug}
        onChange={(e) => setForm({ ...form, slug: e.target.value })}
        placeholder="ai-automation-accelerator"
      />
      <div>
        <label className="block text-sm font-medium text-hex-text-secondary mb-1.5">Subtitle</label>
        <textarea
          value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          rows={2}
          className="w-full px-3 py-2 bg-hex-dark-600 border border-hex-dark-500 rounded text-hex-text-primary text-sm focus:outline-none focus:border-hex-teal resize-y"
          placeholder="Short tagline displayed under the hero title"
        />
      </div>
      <Input
        label="CTA Button Label"
        value={form.ctaLabel}
        onChange={(e) => setForm({ ...form, ctaLabel: e.target.value })}
        placeholder="Start Course"
      />
      <Input
        label="Hero Banner Image URL (optional)"
        value={form.heroBannerUrl}
        onChange={(e) => setForm({ ...form, heroBannerUrl: e.target.value })}
        placeholder="https://…"
      />
      <Input
        label="Thumbnail Image URL (optional)"
        value={form.thumbnailUrl}
        onChange={(e) => setForm({ ...form, thumbnailUrl: e.target.value })}
        placeholder="https://…"
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
        <p className="text-xs text-hex-text-muted mt-1">
          Only users on exactly this tier will see the course. TIER_0 never sees Advisory.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-hex-text-secondary mb-1.5">Instructor</label>
        <select
          value={form.instructorId}
          onChange={(e) => setForm({ ...form, instructorId: e.target.value })}
          className="w-full px-3 py-2 bg-hex-dark-600 border border-hex-dark-500 rounded text-hex-text-primary text-sm focus:outline-none focus:border-hex-teal"
        >
          <option value="">None</option>
          {instructors.map((i) => (
            <option key={i.id} value={i.id}>{i.name}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm text-hex-text-secondary">Published</label>
        <button
          onClick={() => setForm({ ...form, isPublished: !form.isPublished })}
          type="button"
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
        <span className="text-xs text-hex-text-muted">
          {form.isPublished ? "Visible to users" : "Hidden from users"}
        </span>
      </div>

      {error && <p className="text-sm text-hex-error">{error}</p>}

      <div className="flex justify-end">
        <Button onClick={save} loading={saving}>
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          Save Changes
        </Button>
      </div>
    </Card>
  );
}
