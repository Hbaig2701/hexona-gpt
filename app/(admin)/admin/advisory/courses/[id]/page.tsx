"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BackLink from "@/components/ui/BackLink";
import CourseMetadataForm from "@/components/admin/advisory/CourseMetadataForm";
import CourseCurriculumEditor from "@/components/admin/advisory/CourseCurriculumEditor";
import type { CourseFull, InstructorRow } from "@/components/admin/advisory/types";
import { Loader2 } from "lucide-react";

export default function CourseBuilderPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  const [course, setCourse] = useState<CourseFull | null>(null);
  const [instructors, setInstructors] = useState<InstructorRow[]>([]);
  const [tab, setTab] = useState<"metadata" | "curriculum">("metadata");
  const [loading, setLoading] = useState(true);

  async function reload() {
    const res = await fetch(`/api/admin/advisory/courses/${courseId}`);
    if (!res.ok) {
      router.push("/admin/advisory/courses");
      return;
    }
    setCourse(await res.json());
  }

  useEffect(() => {
    Promise.all([
      fetch(`/api/admin/advisory/courses/${courseId}`).then((r) => r.json()),
      fetch(`/api/admin/advisory/instructors`).then((r) => r.json()),
    ])
      .then(([c, i]) => {
        setCourse(c);
        setInstructors(i);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto flex items-center justify-center py-16 text-hex-text-muted gap-2">
        <Loader2 size={16} className="animate-spin" /> Loading…
      </div>
    );
  }

  if (!course) {
    return <p className="text-hex-text-muted text-center py-12">Course not found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <BackLink href="/admin/advisory/courses" label="Back to Courses" className="mb-4" />
      <h1 className="font-display text-2xl font-bold text-hex-text-primary mb-1">{course.title}</h1>
      <p className="text-xs text-hex-text-muted font-mono mb-6">/advisory/{course.slug}</p>

      <div className="flex gap-1 mb-6 border-b border-hex-dark-500">
        {(["metadata", "curriculum"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors capitalize ${
              tab === t
                ? "border-hex-teal text-hex-teal"
                : "border-transparent text-hex-text-muted hover:text-hex-text-primary"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "metadata" && (
        <CourseMetadataForm course={course} instructors={instructors} onSaved={reload} />
      )}

      {tab === "curriculum" && (
        <CourseCurriculumEditor course={course} onChange={reload} />
      )}
    </div>
  );
}
