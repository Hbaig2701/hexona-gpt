"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import type { LessonRow } from "./types";
import type { LessonType } from "@prisma/client";
import { csvToTableData } from "@/lib/csv";

interface Props {
  lessonId: string;
  onClose: () => void;
  onSaved: () => void;
}

export default function LessonEditorModal({ lessonId, onClose, onSaved }: Props) {
  const [lesson, setLesson] = useState<LessonRow | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // We can't easily fetch a single lesson by id from the user-facing schema, but the
    // admin lesson PATCH/DELETE works by id. For initial load we re-fetch the parent course
    // via the existing course endpoint — but to keep this self-contained, hit a thin
    // bespoke endpoint isn't needed; we'll just look it up via the modules tree.
    // Simpler: client passes lesson id; we re-fetch all courses and find it.
    // Even simpler: fetch /api/admin/advisory/lessons/[id] via a GET we add below.
    fetch(`/api/admin/advisory/lessons/${lessonId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then(setLesson);
  }, [lessonId]);

  async function save() {
    if (!lesson) return;
    setSaving(true);
    setError(null);
    const res = await fetch(`/api/admin/advisory/lessons/${lessonId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: lesson.title,
        slug: lesson.slug,
        description: lesson.description,
        type: lesson.type,
        loomUrl: lesson.loomUrl,
        durationSec: lesson.durationSec,
        externalUrl: lesson.externalUrl,
        advisorSlug: lesson.advisorSlug,
        tableData: lesson.tableData,
        thumbnailUrl: lesson.thumbnailUrl,
        isPublished: lesson.isPublished,
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
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 overflow-y-auto p-4 pt-12"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-hex-dark-800 border border-hex-dark-500 rounded-xl w-full max-w-2xl shadow-xl"
      >
        <div className="px-6 py-4 border-b border-hex-dark-500 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-hex-text-primary">Edit Lesson</h3>
          <button onClick={onClose} className="p-1 text-hex-text-muted hover:text-hex-text-primary">
            <X size={18} />
          </button>
        </div>

        {!lesson ? (
          <div className="p-8 flex items-center justify-center text-hex-text-muted gap-2">
            <Loader2 size={14} className="animate-spin" /> Loading…
          </div>
        ) : (
          <>
            <div className="px-6 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
              <Input
                label="Title"
                value={lesson.title}
                onChange={(e) => setLesson({ ...lesson, title: e.target.value })}
              />
              <Input
                label="URL Slug"
                value={lesson.slug}
                onChange={(e) => setLesson({ ...lesson, slug: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-hex-text-secondary mb-1.5">
                  Description
                </label>
                <textarea
                  value={lesson.description ?? ""}
                  onChange={(e) => setLesson({ ...lesson, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 bg-hex-dark-600 border border-hex-dark-500 rounded text-hex-text-primary text-sm focus:outline-none focus:border-hex-teal resize-y"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-hex-text-secondary mb-1.5">
                  Lesson Type
                </label>
                <select
                  value={lesson.type}
                  onChange={(e) => setLesson({ ...lesson, type: e.target.value as LessonType })}
                  className="w-full px-3 py-2 bg-hex-dark-600 border border-hex-dark-500 rounded text-hex-text-primary text-sm focus:outline-none focus:border-hex-teal"
                >
                  <option value="VIDEO">Video (Loom)</option>
                  <option value="CHECKPOINT">Checkpoint</option>
                  <option value="RESOURCE">Resource link</option>
                  <option value="TOOL_LINK">Advisor link</option>
                  <option value="TABLE">Data table</option>
                </select>
              </div>

              {lesson.type === "VIDEO" && (
                <>
                  <Input
                    label="Loom Share URL"
                    value={lesson.loomUrl ?? ""}
                    onChange={(e) => setLesson({ ...lesson, loomUrl: e.target.value })}
                    placeholder="https://www.loom.com/share/…"
                  />
                  <Input
                    label="Duration (seconds, optional)"
                    type="number"
                    value={lesson.durationSec ?? ""}
                    onChange={(e) =>
                      setLesson({
                        ...lesson,
                        durationSec: e.target.value ? parseInt(e.target.value, 10) : null,
                      })
                    }
                    placeholder="e.g. 600"
                  />
                </>
              )}

              {lesson.type === "RESOURCE" && (
                <Input
                  label="External Resource URL"
                  value={lesson.externalUrl ?? ""}
                  onChange={(e) => setLesson({ ...lesson, externalUrl: e.target.value })}
                  placeholder="https://docs.google.com/…"
                />
              )}

              {lesson.type === "TOOL_LINK" && (
                <Input
                  label="Advisor Slug"
                  value={lesson.advisorSlug ?? ""}
                  onChange={(e) => setLesson({ ...lesson, advisorSlug: e.target.value })}
                  placeholder="e.g. niche-research"
                />
              )}

              {lesson.type === "CHECKPOINT" && (
                <p className="text-xs text-hex-text-muted bg-hex-warning/10 border border-hex-warning/20 rounded p-3">
                  Native checkpoint quiz form is coming soon. For now, the lesson page renders a
                  placeholder card — put a form URL or instructions in the description above.
                </p>
              )}

              {lesson.type === "TABLE" && (
                <TableEditor
                  value={lesson.tableData ?? null}
                  onChange={(v) => setLesson({ ...lesson, tableData: v })}
                />
              )}

              <Input
                label="Thumbnail URL (optional)"
                value={lesson.thumbnailUrl ?? ""}
                onChange={(e) => setLesson({ ...lesson, thumbnailUrl: e.target.value })}
                placeholder="https://…"
              />

              <div className="flex items-center gap-3">
                <label className="text-sm text-hex-text-secondary">Published</label>
                <button
                  onClick={() => setLesson({ ...lesson, isPublished: !lesson.isPublished })}
                  type="button"
                  className={`w-10 h-5 rounded-full transition-colors relative ${
                    lesson.isPublished ? "bg-hex-success" : "bg-hex-dark-500"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                      lesson.isPublished ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              {error && <p className="text-sm text-hex-error">{error}</p>}
            </div>

            <div className="px-6 py-4 border-t border-hex-dark-500 flex justify-end gap-2">
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
              <Button onClick={save} loading={saving}>
                <Save size={14} /> Save
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

type TableValue = { headers: string[]; rows: string[][] } | null;

function TableEditor({
  value,
  onChange,
}: {
  value: TableValue;
  onChange: (v: TableValue) => void;
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
        placeholder={`Niche,Avg Customer Value ($),Saturation\nPrivate Dental Clinics,$3500,Medium\n…`}
        className="w-full px-3 py-2 bg-hex-dark-600 border border-hex-dark-500 rounded text-hex-text-primary text-xs font-mono focus:outline-none focus:border-hex-teal resize-y"
      />
      <div className="flex items-center gap-2">
        <Button type="button" size="sm" onClick={applyPaste}>Parse & Replace</Button>
        {value && (
          <Button type="button" size="sm" variant="ghost" onClick={() => onChange(null)}>
            Clear table
          </Button>
        )}
        {pasteError && <span className="text-xs text-hex-error">{pasteError}</span>}
      </div>

      {value && (
        <div className="text-xs text-hex-text-secondary border-t border-hex-dark-500 pt-3">
          <p className="font-semibold mb-1.5">
            Current data: {value.rows.length} row{value.rows.length !== 1 ? "s" : ""}, {value.headers.length} column{value.headers.length !== 1 ? "s" : ""}
          </p>
          <p className="text-hex-text-muted truncate font-mono">
            Headers: {value.headers.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}
