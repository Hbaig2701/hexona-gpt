"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  CheckCircle2,
  Circle,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Sparkles,
  FileCheck,
  PlayCircle,
  Loader2,
  Table as TableIcon,
} from "lucide-react";
import type { LessonType } from "@prisma/client";
import LessonTable, { type TableData } from "./LessonTable";
import { linkifyText } from "@/lib/linkify-text";

interface LessonData {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  type: LessonType;
  loomEmbed: string | null;
  externalUrl: string | null;
  advisorSlug: string | null;
  tableData: TableData | null;
  moduleTitle: string;
}

interface Props {
  courseTitle: string;
  lesson: LessonData;
  initiallyCompleted: boolean;
  prevSlug: string | null;
  nextSlug: string | null;
}

export default function LessonPlayer({
  courseTitle,
  lesson,
  initiallyCompleted,
  prevSlug,
  nextSlug,
}: Props) {
  const router = useRouter();
  const [completed, setCompleted] = useState(initiallyCompleted);
  const [pending, startTransition] = useTransition();

  async function toggleComplete() {
    const optimistic = !completed;
    setCompleted(optimistic);
    const res = await fetch(`/api/advisory/lessons/${lesson.id}/complete`, {
      method: optimistic ? "POST" : "DELETE",
    });
    if (!res.ok) {
      setCompleted(!optimistic);
    } else {
      startTransition(() => router.refresh());
    }
  }

  return (
    <div className="max-w-4xl mx-auto pb-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--hex-text-secondary)] mb-4">
        <Link
          href="/advisory"
          className="hover:text-[var(--hex-text-primary)] transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft size={14} />
          {courseTitle}
        </Link>
        <span className="text-[var(--hex-text-muted)]">·</span>
        <span className="text-[var(--hex-text-muted)] text-xs">{lesson.moduleTitle}</span>
      </div>

      <div className="space-y-5">
        <LessonContent lesson={lesson} />

        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--hex-text-primary)] mb-2">
            {lesson.title}
          </h1>
          {lesson.description && (
            <p className="text-[var(--hex-text-secondary)] text-sm whitespace-pre-line">
              {linkifyText(lesson.description)}
            </p>
          )}
        </div>

        {/* Action bar */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={toggleComplete}
            disabled={pending}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              completed
                ? "bg-hex-success/15 text-hex-success border border-hex-success/30"
                : "bg-gradient-to-br from-hex-teal to-[#0095A8] text-hex-dark-900 hover:opacity-90"
            }`}
          >
            {pending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : completed ? (
              <CheckCircle2 size={16} />
            ) : (
              <Circle size={16} />
            )}
            {completed ? "Completed" : "Mark complete"}
          </button>

          <div className="flex-1" />

          {prevSlug && (
            <Link
              href={`/advisory/${prevSlug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-[var(--hex-text-secondary)] hover:text-[var(--hex-text-primary)] hover:bg-hex-dark-700 transition-colors"
            >
              <ArrowLeft size={16} /> Previous
            </Link>
          )}
          {nextSlug && (
            <Link
              href={`/advisory/${nextSlug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-hex-dark-600 text-[var(--hex-text-primary)] border border-hex-dark-500 hover:border-hex-teal/30 transition-colors"
            >
              Next lesson <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function LessonContent({ lesson }: { lesson: LessonData }) {
  if (lesson.type === "VIDEO") {
    if (lesson.loomEmbed) {
      return (
        <div className="aspect-video rounded-xl overflow-hidden bg-black">
          <iframe
            src={lesson.loomEmbed}
            allowFullScreen
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
          />
        </div>
      );
    }
    return (
      <div className="aspect-video rounded-xl bg-gradient-to-br from-hex-dark-800 to-hex-dark-900 border border-[var(--hex-dark-500)] flex flex-col items-center justify-center gap-3">
        <PlayCircle size={48} className="text-[var(--hex-text-muted)]" />
        <p className="text-[var(--hex-text-muted)] text-sm">Video coming soon</p>
      </div>
    );
  }

  if (lesson.type === "CHECKPOINT") {
    return (
      <div className="rounded-xl bg-gradient-to-br from-hex-warning/10 to-hex-warning/5 border border-hex-warning/30 p-8 flex flex-col items-center text-center">
        <FileCheck size={40} className="text-hex-warning mb-3" />
        <h3 className="font-display text-lg font-semibold text-[var(--hex-text-primary)] mb-2">
          Checkpoint
        </h3>
        <p className="text-sm text-[var(--hex-text-secondary)] max-w-md">
          Reaching this checkpoint means you&apos;ve completed a major milestone. Submit your progress
          below, then mark this lesson complete.
        </p>
        <p className="text-xs text-[var(--hex-text-muted)] mt-4">
          (In-app quiz/submission form coming soon — for now, use the link in the description.)
        </p>
      </div>
    );
  }

  if (lesson.type === "RESOURCE") {
    return (
      <div className="rounded-xl bg-gradient-to-br from-hex-teal/10 to-hex-teal/5 border border-hex-teal/30 p-8 flex flex-col items-center text-center">
        <ExternalLink size={40} className="text-hex-teal mb-3" />
        <h3 className="font-display text-lg font-semibold text-[var(--hex-text-primary)] mb-3">
          External resource
        </h3>
        {lesson.externalUrl ? (
          <a
            href={lesson.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-hex-teal to-[#0095A8] text-hex-dark-900 font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Open resource <ExternalLink size={16} />
          </a>
        ) : (
          <p className="text-sm text-hex-warning">Resource link coming soon</p>
        )}
      </div>
    );
  }

  if (lesson.type === "TABLE") {
    if (lesson.tableData && lesson.tableData.headers?.length) {
      return <LessonTable data={lesson.tableData} />;
    }
    return (
      <div className="rounded-xl bg-gradient-to-br from-hex-dark-800 to-hex-dark-900 border border-[var(--hex-dark-500)] p-8 flex flex-col items-center text-center">
        <TableIcon size={40} className="text-[var(--hex-text-muted)] mb-3" />
        <p className="text-[var(--hex-text-muted)] text-sm">Table data coming soon</p>
      </div>
    );
  }

  if (lesson.type === "TOOL_LINK" && lesson.advisorSlug) {
    return (
      <div className="rounded-xl bg-gradient-to-br from-purple-500/10 to-hex-teal/10 border border-purple-500/30 p-8 flex flex-col items-center text-center">
        <Sparkles size={40} className="text-purple-400 mb-3" />
        <h3 className="font-display text-lg font-semibold text-[var(--hex-text-primary)] mb-3">
          Launch the Advisor
        </h3>
        <Link
          href={`/advisors/${lesson.advisorSlug}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-hex-teal to-[#0095A8] text-hex-dark-900 font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          Open advisor <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return null;
}
