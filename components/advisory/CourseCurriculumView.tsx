"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlayCircle,
  CheckCircle2,
  Circle,
  ExternalLink,
  FileCheck,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Table as TableIcon,
} from "lucide-react";
import Card from "@/components/ui/Card";
import type { LessonType } from "@prisma/client";

const TYPE_ICON: Record<LessonType, typeof PlayCircle> = {
  VIDEO: PlayCircle,
  CHECKPOINT: FileCheck,
  RESOURCE: ExternalLink,
  TOOL_LINK: Sparkles,
  TABLE: TableIcon,
};

type LessonItem = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  type: LessonType;
};

type SubModule = {
  id: string;
  title: string;
  lessons: LessonItem[];
};

type Module = {
  id: string;
  title: string;
  color: string | null;
  lessons: LessonItem[];
  children: SubModule[];
};

interface Props {
  modules: Module[];
  completedLessonIds: string[];
}

export default function CourseCurriculumView({ modules, completedLessonIds }: Props) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const completed = new Set(completedLessonIds);

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="space-y-3">
      {modules.map((module) => {
        const isOpen = expanded.has(module.id);
        const lessonCount =
          module.lessons.length +
          module.children.reduce((s, c) => s + c.lessons.length, 0);
        const doneCount =
          module.lessons.filter((l) => completed.has(l.id)).length +
          module.children.reduce(
            (s, c) => s + c.lessons.filter((l) => completed.has(l.id)).length,
            0
          );

        return (
          <Card key={module.id} hoverable={false} className="!p-0 overflow-hidden">
            <button
              onClick={() => toggle(module.id)}
              className="w-full px-5 py-3 flex items-center gap-3 hover:bg-hex-dark-700/40 transition-colors text-left"
              style={module.color ? { borderLeft: `3px solid ${module.color}` } : undefined}
            >
              {isOpen ? (
                <ChevronDown size={16} className="text-[var(--hex-text-muted)] shrink-0" />
              ) : (
                <ChevronRight size={16} className="text-[var(--hex-text-muted)] shrink-0" />
              )}
              <p className="font-display font-semibold text-[var(--hex-text-primary)] flex-1">
                {module.title}
              </p>
              <span className="text-xs text-[var(--hex-text-muted)]">
                {doneCount}/{lessonCount}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="overflow-hidden border-t border-[var(--hex-dark-500)]"
                >
                  {module.lessons.length > 0 && (
                    <div className="divide-y divide-[var(--hex-dark-500)]">
                      {module.lessons.map((lesson) => (
                        <LessonRow
                          key={lesson.id}
                          lesson={lesson}
                          done={completed.has(lesson.id)}
                        />
                      ))}
                    </div>
                  )}

                  {module.children.map((child) => (
                    <div key={child.id}>
                      <div className="px-5 py-2 bg-hex-dark-700 border-t border-[var(--hex-dark-500)]">
                        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--hex-text-secondary)]">
                          {child.title}
                        </p>
                      </div>
                      <div className="divide-y divide-[var(--hex-dark-500)]">
                        {child.lessons.map((lesson) => (
                          <LessonRow
                            key={lesson.id}
                            lesson={lesson}
                            done={completed.has(lesson.id)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        );
      })}
    </div>
  );
}

function LessonRow({ lesson, done }: { lesson: LessonItem; done: boolean }) {
  const Icon = TYPE_ICON[lesson.type];
  return (
    <Link
      href={`/advisory/${lesson.slug}`}
      className="flex items-start gap-3 px-5 py-3 hover:bg-hex-dark-700 transition-colors"
    >
      {done ? (
        <CheckCircle2 size={18} className="text-hex-success shrink-0 mt-0.5" />
      ) : (
        <Circle size={18} className="text-[var(--hex-text-muted)] shrink-0 mt-0.5" />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Icon size={14} className="text-[var(--hex-text-muted)] shrink-0" />
          <p className="text-sm text-[var(--hex-text-primary)] font-medium truncate">
            {lesson.title}
          </p>
        </div>
        {lesson.description && (
          <p className="text-xs text-[var(--hex-text-muted)] line-clamp-1 mt-0.5">
            {lesson.description}
          </p>
        )}
      </div>
    </Link>
  );
}
