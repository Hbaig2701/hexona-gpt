"use client";

import { useRef, useState } from "react";
import {
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Edit3,
  Loader2,
  FolderPlus,
  PlayCircle,
  FileCheck,
  ExternalLink,
  Sparkles,
  Table as TableIcon,
  AlertTriangle,
  X,
} from "lucide-react";
import type { LessonType } from "@prisma/client";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import LessonEditorModal from "./LessonEditorModal";
import type { CourseFull, ModuleNode, LessonRow } from "./types";

const LESSON_TYPE_ICON: Record<LessonType, typeof PlayCircle> = {
  VIDEO: PlayCircle,
  CHECKPOINT: FileCheck,
  RESOURCE: ExternalLink,
  TOOL_LINK: Sparkles,
  TABLE: TableIcon,
};

/**
 * Centralised mutation helper — surfaces server errors instead of swallowing them.
 */
async function mutate(
  url: string,
  init: RequestInit
): Promise<{ ok: true; data: unknown } | { ok: false; error: string }> {
  try {
    const res = await fetch(url, init);
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { ok: false, error: body?.error || `Request failed (${res.status})` };
    }
    return { ok: true, data: body };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Network error" };
  }
}

interface Props {
  course: CourseFull;
  onChange: () => void;
}

export default function CourseCurriculumEditor({ course, onChange }: Props) {
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [creatingModule, setCreatingModule] = useState(false);
  const [showNewModule, setShowNewModule] = useState(false);
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [creatingLessonInModule, setCreatingLessonInModule] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(course.modules.map((m) => m.id))
  );
  const [error, setError] = useState<string | null>(null);
  const moduleInputRef = useRef<HTMLInputElement>(null);

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function createTopLevelModule() {
    if (creatingModule) return;
    const title = newModuleTitle.trim();
    if (!title) {
      moduleInputRef.current?.focus();
      return;
    }
    setCreatingModule(true);
    setError(null);
    const result = await mutate(`/api/admin/advisory/courses/${course.id}/modules`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setCreatingModule(false);
    if (!result.ok) {
      setError(`Add module failed: ${result.error}`);
      return;
    }
    const created = result.data as { id?: string };
    if (created.id) {
      setExpanded((prev) => {
        const next = new Set(prev);
        next.add(created.id!);
        return next;
      });
    }
    setNewModuleTitle("");
    setShowNewModule(false);
    onChange();
  }

  function cancelNewModule() {
    setShowNewModule(false);
    setNewModuleTitle("");
  }

  return (
    <div className="space-y-4">
      {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}

      {showNewModule ? (
        <div className="flex gap-2 p-2 bg-hex-dark-700/50 border border-hex-teal/30 rounded">
          <input
            ref={moduleInputRef}
            value={newModuleTitle}
            onChange={(e) => setNewModuleTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                createTopLevelModule();
              } else if (e.key === "Escape") {
                cancelNewModule();
              }
            }}
            autoFocus
            placeholder="Module title (e.g. Introduction)"
            className="flex-1 px-3 py-2 bg-hex-dark-600 border border-hex-dark-500 rounded text-hex-text-primary text-sm placeholder:text-hex-text-muted focus:outline-none focus:border-hex-teal"
          />
          <Button type="button" onClick={createTopLevelModule} loading={creatingModule}>
            <Plus size={14} /> Create
          </Button>
          <Button type="button" variant="ghost" onClick={cancelNewModule}>
            Cancel
          </Button>
        </div>
      ) : (
        <Button type="button" onClick={() => setShowNewModule(true)}>
          <Plus size={14} /> Add Module
        </Button>
      )}

      {course.modules.length === 0 ? (
        <Card hoverable={false} className="text-center py-10">
          <p className="text-hex-text-muted text-sm">
            No modules yet. Add your first module above to start building the curriculum.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {course.modules.map((m, idx) => (
            <ModuleCard
              key={m.id}
              module={m}
              expanded={expanded.has(m.id)}
              onToggle={() => toggle(m.id)}
              canMoveUp={idx > 0}
              canMoveDown={idx < course.modules.length - 1}
              siblingIds={course.modules.map((x) => x.id)}
              courseId={course.id}
              onChange={onChange}
              onError={setError}
              onEditLesson={setEditingLessonId}
              onCreateLessonInModule={setCreatingLessonInModule}
              creatingLessonInModule={creatingLessonInModule}
            />
          ))}
        </div>
      )}

      {editingLessonId && (
        <LessonEditorModal
          lessonId={editingLessonId}
          onClose={() => setEditingLessonId(null)}
          onSaved={() => {
            setEditingLessonId(null);
            onChange();
          }}
        />
      )}
    </div>
  );
}

function ErrorBanner({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-hex-error/10 border border-hex-error/30 text-sm">
      <AlertTriangle size={16} className="text-hex-error shrink-0 mt-0.5" />
      <p className="flex-1 text-hex-error">{message}</p>
      <button onClick={onDismiss} className="text-hex-error/70 hover:text-hex-error">
        <X size={14} />
      </button>
    </div>
  );
}

interface ModuleCardProps {
  module: ModuleNode;
  expanded: boolean;
  onToggle: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  siblingIds: string[];
  courseId: string;
  onChange: () => void;
  onError: (message: string) => void;
  onEditLesson: (id: string) => void;
  onCreateLessonInModule: (id: string | null) => void;
  creatingLessonInModule: string | null;
  isSub?: boolean;
}

function ModuleCard({
  module,
  expanded,
  onToggle,
  canMoveUp,
  canMoveDown,
  siblingIds,
  courseId,
  onChange,
  onError,
  onEditLesson,
  onCreateLessonInModule,
  creatingLessonInModule,
  isSub = false,
}: ModuleCardProps) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ title: module.title, color: module.color ?? "" });
  const [saving, setSaving] = useState(false);
  const [newSubTitle, setNewSubTitle] = useState("");
  const [addingSub, setAddingSub] = useState(false);
  const [showNewSub, setShowNewSub] = useState(false);
  const subInputRef = useRef<HTMLInputElement>(null);

  const lessons = module.lessons ?? [];
  const children = module.children ?? [];

  async function move(direction: "up" | "down") {
    const idx = siblingIds.indexOf(module.id);
    const target = direction === "up" ? idx - 1 : idx + 1;
    if (target < 0 || target >= siblingIds.length) return;
    const reordered = [...siblingIds];
    [reordered[idx], reordered[target]] = [reordered[target], reordered[idx]];
    const result = await mutate(`/api/admin/advisory/reorder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "modules", ids: reordered }),
    });
    if (!result.ok) return onError(`Reorder failed: ${result.error}`);
    onChange();
  }

  async function saveModule() {
    setSaving(true);
    const result = await mutate(`/api/admin/advisory/modules/${module.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: form.title.trim(), color: form.color.trim() || null }),
    });
    setSaving(false);
    if (!result.ok) return onError(`Save module failed: ${result.error}`);
    setEditing(false);
    onChange();
  }

  async function deleteModule() {
    const totalLessons = lessons.length + children.reduce((s, c) => s + (c.lessons?.length ?? 0), 0);
    if (
      !confirm(
        `Delete "${module.title}"? This will also remove ${totalLessons} lesson(s) and any sub-modules.`
      )
    )
      return;
    const result = await mutate(`/api/admin/advisory/modules/${module.id}`, { method: "DELETE" });
    if (!result.ok) return onError(`Delete failed: ${result.error}`);
    onChange();
  }

  async function createSubModule() {
    if (addingSub) return;
    const title = newSubTitle.trim();
    if (!title) {
      subInputRef.current?.focus();
      return;
    }
    setAddingSub(true);
    const result = await mutate(`/api/admin/advisory/courses/${courseId}/modules`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, parentId: module.id }),
    });
    setAddingSub(false);
    if (!result.ok) return onError(`Add sub-module failed: ${result.error}`);
    setNewSubTitle("");
    setShowNewSub(false);
    onChange();
  }

  function cancelSubModule() {
    setShowNewSub(false);
    setNewSubTitle("");
  }

  return (
    <Card
      hoverable={false}
      className="!p-0 overflow-hidden"
      style={
        module.color
          ? { borderLeftColor: module.color, borderLeftWidth: 3, borderLeftStyle: "solid" }
          : undefined
      }
    >
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-2 border-b border-hex-dark-500 bg-hex-dark-700/40">
        <button
          type="button"
          onClick={onToggle}
          className="text-hex-text-muted hover:text-hex-text-primary"
        >
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        {editing ? (
          <>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="flex-1 px-2 py-1 bg-hex-dark-600 border border-hex-dark-500 rounded text-sm text-hex-text-primary focus:outline-none focus:border-hex-teal"
            />
            <input
              value={form.color}
              onChange={(e) => setForm({ ...form, color: e.target.value })}
              placeholder="#A855F7"
              className="w-24 px-2 py-1 bg-hex-dark-600 border border-hex-dark-500 rounded text-xs font-mono text-hex-text-primary focus:outline-none focus:border-hex-teal"
            />
            <Button size="sm" type="button" onClick={saveModule} loading={saving}>
              Save
            </Button>
            <Button
              size="sm"
              type="button"
              variant="ghost"
              onClick={() => {
                setEditing(false);
                setForm({ title: module.title, color: module.color ?? "" });
              }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <p className={`flex-1 font-semibold text-hex-text-primary ${isSub ? "text-sm" : ""}`}>
              {module.title}
            </p>
            <span className="text-xs text-hex-text-muted">
              {lessons.length} lesson{lessons.length !== 1 ? "s" : ""}
              {children.length > 0 && `, ${children.length} sub`}
            </span>
            <button
              type="button"
              onClick={() => move("up")}
              disabled={!canMoveUp}
              className="p-1 text-hex-text-muted hover:text-hex-text-primary disabled:opacity-30"
              title="Move up"
            >
              <ArrowUp size={14} />
            </button>
            <button
              type="button"
              onClick={() => move("down")}
              disabled={!canMoveDown}
              className="p-1 text-hex-text-muted hover:text-hex-text-primary disabled:opacity-30"
              title="Move down"
            >
              <ArrowDown size={14} />
            </button>
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="p-1 text-hex-text-muted hover:text-hex-text-primary"
              title="Rename / set color"
            >
              <Edit3 size={14} />
            </button>
            <button
              type="button"
              onClick={deleteModule}
              className="p-1 text-red-400/70 hover:text-red-400"
              title="Delete module"
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>

      {expanded && (
        <div className="p-4 space-y-3">
          {/* Lessons */}
          {lessons.length > 0 && (
            <div className="space-y-1">
              {lessons.map((lesson, idx) => (
                <LessonRowItem
                  key={lesson.id}
                  lesson={lesson}
                  canMoveUp={idx > 0}
                  canMoveDown={idx < lessons.length - 1}
                  siblingIds={lessons.map((l) => l.id)}
                  onChange={onChange}
                  onError={onError}
                  onEdit={() => onEditLesson(lesson.id)}
                />
              ))}
            </div>
          )}

          {/* Add lesson */}
          {creatingLessonInModule === module.id ? (
            <NewLessonInline
              moduleId={module.id}
              onClose={() => onCreateLessonInModule(null)}
              onError={onError}
              onSaved={() => {
                onCreateLessonInModule(null);
                onChange();
              }}
            />
          ) : (
            <Button
              size="sm"
              type="button"
              variant="ghost"
              onClick={() => onCreateLessonInModule(module.id)}
            >
              <Plus size={12} /> Add Lesson
            </Button>
          )}

          {/* Sub-modules (only allowed at top level) */}
          {!isSub &&
            children.map((sub, idx) => (
              <ModuleCard
                key={sub.id}
                module={sub}
                expanded={true}
                onToggle={() => {}}
                canMoveUp={idx > 0}
                canMoveDown={idx < children.length - 1}
                siblingIds={children.map((c) => c.id)}
                courseId={courseId}
                onChange={onChange}
                onError={onError}
                onEditLesson={onEditLesson}
                onCreateLessonInModule={onCreateLessonInModule}
                creatingLessonInModule={creatingLessonInModule}
                isSub
              />
            ))}

          {/* Add sub-module (only at top level) */}
          {!isSub && (
            <div className="pt-2 border-t border-hex-dark-500/40">
              {showNewSub ? (
                <div className="flex gap-2 items-stretch p-2 bg-hex-dark-700/50 border border-hex-teal/30 rounded">
                  <input
                    ref={subInputRef}
                    value={newSubTitle}
                    onChange={(e) => setNewSubTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        createSubModule();
                      } else if (e.key === "Escape") {
                        cancelSubModule();
                      }
                    }}
                    autoFocus
                    placeholder="Sub-module title (e.g. LinkedIn)"
                    className="flex-1 px-3 py-1.5 bg-hex-dark-600 border border-hex-dark-500 rounded text-sm text-hex-text-primary placeholder:text-hex-text-muted focus:outline-none focus:border-hex-teal"
                  />
                  <Button size="sm" type="button" onClick={createSubModule} loading={addingSub}>
                    <Plus size={12} /> Create
                  </Button>
                  <Button size="sm" type="button" variant="ghost" onClick={cancelSubModule}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  type="button"
                  variant="secondary"
                  onClick={() => setShowNewSub(true)}
                >
                  <FolderPlus size={12} /> Add Sub-module
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

function LessonRowItem({
  lesson,
  canMoveUp,
  canMoveDown,
  siblingIds,
  onChange,
  onError,
  onEdit,
}: {
  lesson: LessonRow;
  canMoveUp: boolean;
  canMoveDown: boolean;
  siblingIds: string[];
  onChange: () => void;
  onError: (message: string) => void;
  onEdit: () => void;
}) {
  const Icon = LESSON_TYPE_ICON[lesson.type];

  async function move(direction: "up" | "down") {
    const idx = siblingIds.indexOf(lesson.id);
    const target = direction === "up" ? idx - 1 : idx + 1;
    if (target < 0 || target >= siblingIds.length) return;
    const reordered = [...siblingIds];
    [reordered[idx], reordered[target]] = [reordered[target], reordered[idx]];
    const result = await mutate(`/api/admin/advisory/reorder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "lessons", ids: reordered }),
    });
    if (!result.ok) return onError(`Reorder lesson failed: ${result.error}`);
    onChange();
  }

  async function deleteLesson() {
    if (!confirm(`Delete lesson "${lesson.title}"?`)) return;
    const result = await mutate(`/api/admin/advisory/lessons/${lesson.id}`, { method: "DELETE" });
    if (!result.ok) return onError(`Delete lesson failed: ${result.error}`);
    onChange();
  }

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-hex-dark-700/30 border border-hex-dark-500/40 rounded text-sm">
      <Icon size={14} className="text-hex-text-muted shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-hex-text-primary truncate">{lesson.title}</p>
        <p className="text-xs text-hex-text-muted truncate font-mono">
          {lesson.type}
          {lesson.isPublished ? "" : " · draft"}
        </p>
      </div>
      <button
        type="button"
        onClick={() => move("up")}
        disabled={!canMoveUp}
        className="p-1 text-hex-text-muted hover:text-hex-text-primary disabled:opacity-30"
      >
        <ArrowUp size={12} />
      </button>
      <button
        type="button"
        onClick={() => move("down")}
        disabled={!canMoveDown}
        className="p-1 text-hex-text-muted hover:text-hex-text-primary disabled:opacity-30"
      >
        <ArrowDown size={12} />
      </button>
      <button
        type="button"
        onClick={onEdit}
        className="p-1 text-hex-text-muted hover:text-hex-teal"
        title="Edit lesson"
      >
        <Edit3 size={12} />
      </button>
      <button
        type="button"
        onClick={deleteLesson}
        className="p-1 text-red-400/70 hover:text-red-400"
        title="Delete"
      >
        <Trash2 size={12} />
      </button>
    </div>
  );
}

function NewLessonInline({
  moduleId,
  onClose,
  onError,
  onSaved,
}: {
  moduleId: string;
  onClose: () => void;
  onError: (message: string) => void;
  onSaved: () => void;
}) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<LessonType>("VIDEO");
  const [creating, setCreating] = useState(false);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || creating) return;
    setCreating(true);
    const result = await mutate(`/api/admin/advisory/modules/${moduleId}/lessons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title.trim(), type }),
    });
    setCreating(false);
    if (!result.ok) return onError(`Add lesson failed: ${result.error}`);
    onSaved();
  }

  return (
    <form
      onSubmit={create}
      className="flex gap-2 items-stretch p-2 bg-hex-dark-700/50 border border-hex-teal/30 rounded"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Lesson title"
        autoFocus
        className="flex-1 px-3 py-1.5 bg-hex-dark-600 border border-hex-dark-500 rounded text-sm text-hex-text-primary placeholder:text-hex-text-muted focus:outline-none focus:border-hex-teal"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value as LessonType)}
        className="px-2 py-1.5 bg-hex-dark-600 border border-hex-dark-500 rounded text-xs text-hex-text-primary focus:outline-none focus:border-hex-teal"
      >
        <option value="VIDEO">Video</option>
        <option value="CHECKPOINT">Checkpoint</option>
        <option value="RESOURCE">Resource link</option>
        <option value="TOOL_LINK">Advisor link</option>
        <option value="TABLE">Data table</option>
      </select>
      <Button size="sm" type="submit" loading={creating}>
        {creating ? <Loader2 size={12} className="animate-spin" /> : <Plus size={12} />}
        Create
      </Button>
      <Button size="sm" type="button" variant="ghost" onClick={onClose}>
        Cancel
      </Button>
    </form>
  );
}
