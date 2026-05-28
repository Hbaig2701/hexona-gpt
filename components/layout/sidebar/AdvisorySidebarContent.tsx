"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ListChecks,
  Library,
  Target,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  Loader2,
} from "lucide-react";

type LessonNode = { id: string; slug: string; title: string; type: string };
type ModuleNode = {
  id: string;
  title: string;
  color: string | null;
  lessons: LessonNode[];
  children: { id: string; title: string; lessons: LessonNode[] }[];
};
type CourseNode = { id: string; slug: string; title: string; modules: ModuleNode[] };

interface SidebarPayload {
  courses: CourseNode[];
  completedLessonIds: string[];
}

export default function AdvisorySidebarContent() {
  const pathname = usePathname();
  const [data, setData] = useState<SidebarPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set());
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch("/api/advisory/sidebar")
      .then((r) => r.json())
      .then((d: SidebarPayload) => {
        setData(d);
        if (!d.courses.length) return;
        // There's one course per tier — auto-expand it
        const course = d.courses[0];
        setExpandedCourses(new Set([course.id]));

        // URL is /advisory/<lessonSlug> (or /advisory, /advisory/resources, /advisory/todos)
        const segment = pathname.split("/")[2];
        const isLessonRoute =
          segment && segment !== "resources" && segment !== "todos" && segment !== "action-plan";
        if (isLessonRoute) {
          for (const m of course.modules) {
            if (m.lessons.some((l) => l.slug === segment)) {
              setExpandedModules(new Set([m.id]));
              return;
            }
            for (const sub of m.children) {
              if (sub.lessons.some((l) => l.slug === segment)) {
                setExpandedModules(new Set([m.id, sub.id]));
                return;
              }
            }
          }
        }
        // No active lesson — expand all top-level modules
        setExpandedModules(new Set(course.modules.map((m) => m.id)));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
    // We deliberately only refetch when leaving/entering /advisory tree
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refresh when navigating between lessons (to reflect completion ticks)
  useEffect(() => {
    if (!pathname.startsWith("/advisory")) return;
    fetch("/api/advisory/sidebar")
      .then((r) => r.json())
      .then((d: SidebarPayload) => setData(d))
      .catch(() => {});
  }, [pathname]);

  const isActive = (path: string) => pathname === path;
  const isActivePrefix = (prefix: string) => pathname.startsWith(prefix);

  const navLinkClass = (active: boolean) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
      active
        ? "bg-[rgba(0,196,204,0.1)] border-l-2 border-hex-teal text-hex-teal"
        : "text-[var(--hex-text-secondary)] hover:text-[var(--hex-text-primary)] hover:bg-hex-dark-700"
    }`;

  function toggleCourse(id: string) {
    setExpandedCourses((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function toggleModule(id: string) {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const completed = new Set(data?.completedLessonIds ?? []);

  return (
    <>
      <Link href="/advisory" className={navLinkClass(isActive("/advisory"))}>
        <BookOpen size={18} />
        Course
      </Link>
      <Link
        href="/advisory/action-plan"
        className={navLinkClass(isActivePrefix("/advisory/action-plan"))}
      >
        <Target size={18} />
        Action Plan
      </Link>
      <Link
        href="/advisory/resources"
        className={navLinkClass(isActivePrefix("/advisory/resources"))}
      >
        <Library size={18} />
        Resources
      </Link>
      <Link
        href="/advisory/todos"
        className={navLinkClass(isActivePrefix("/advisory/todos"))}
      >
        <ListChecks size={18} />
        My To-Dos
      </Link>

      <div className="pt-4">
        <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--hex-text-muted)]">
          Curriculum
        </p>

        {loading && (
          <div className="px-3 py-4 flex items-center gap-2 text-xs text-[var(--hex-text-muted)]">
            <Loader2 size={14} className="animate-spin" />
            Loading…
          </div>
        )}

        {!loading && data?.courses.length === 0 && (
          <p className="px-3 py-3 text-xs text-[var(--hex-text-muted)]">
            No course available for your tier yet.
          </p>
        )}

        {!loading &&
          data?.courses.map((course) => {
            const expanded = expandedCourses.has(course.id);
            return (
              <div key={course.id}>
                <button
                  onClick={() => toggleCourse(course.id)}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-[var(--hex-text-primary)] hover:bg-hex-dark-700 transition-colors text-left"
                >
                  {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  <span className="flex-1 truncate font-medium">{course.title}</span>
                </button>
                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      {course.modules.map((module) => {
                        const mExpanded = expandedModules.has(module.id);
                        return (
                          <div key={module.id} className="ml-2">
                            <button
                              onClick={() => toggleModule(module.id)}
                              className="flex items-center gap-2 w-full pl-3 pr-2 py-1.5 rounded-md text-xs text-[var(--hex-text-secondary)] hover:bg-hex-dark-700 transition-colors text-left"
                              style={
                                module.color
                                  ? { borderLeft: `2px solid ${module.color}` }
                                  : undefined
                              }
                            >
                              {mExpanded ? (
                                <ChevronDown size={12} />
                              ) : (
                                <ChevronRight size={12} />
                              )}
                              <span className="flex-1 truncate">{module.title}</span>
                            </button>
                            <AnimatePresence>
                              {mExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  {module.lessons.map((lesson) => (
                                    <LessonLink
                                      key={lesson.id}
                                      lesson={lesson}
                                      completed={completed.has(lesson.id)}
                                      active={isActive(
                                        `/advisory/${lesson.slug}`
                                      )}
                                    />
                                  ))}
                                  {module.children.map((sub) => (
                                    <div key={sub.id} className="ml-3 mt-1">
                                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--hex-text-muted)] px-3 py-1">
                                        {sub.title}
                                      </p>
                                      {sub.lessons.map((lesson) => (
                                        <LessonLink
                                          key={lesson.id}
                                          lesson={lesson}
                                          completed={completed.has(lesson.id)}
                                          active={isActive(
                                            `/advisory/${lesson.slug}`
                                          )}
                                        />
                                      ))}
                                    </div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
      </div>
    </>
  );
}

function LessonLink({
  lesson,
  completed,
  active,
}: {
  lesson: LessonNode;
  completed: boolean;
  active: boolean;
}) {
  return (
    <Link
      href={`/advisory/${lesson.slug}`}
      className={`flex items-start gap-2 pl-6 pr-3 py-1.5 text-xs rounded-md transition-colors ${
        active
          ? "bg-hex-teal/10 text-hex-teal"
          : "text-[var(--hex-text-secondary)] hover:bg-hex-dark-700 hover:text-[var(--hex-text-primary)]"
      }`}
    >
      {completed ? (
        <CheckCircle2 size={12} className="text-hex-success shrink-0 mt-0.5" />
      ) : (
        <Circle size={12} className="shrink-0 mt-0.5 opacity-40" />
      )}
      <span className="line-clamp-2">{lesson.title}</span>
    </Link>
  );
}
