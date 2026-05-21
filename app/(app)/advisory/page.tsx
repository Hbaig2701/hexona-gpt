import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { PlayCircle } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { hasAdvisoryAccess } from "@/lib/advisory";
import Card from "@/components/ui/Card";
import CourseCurriculumView from "@/components/advisory/CourseCurriculumView";
import type { UserTier } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function AdvisoryLandingPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const userTier = (session.user as { tier?: UserTier }).tier ?? "TIER_0";
  const userId = (session.user as { id: string }).id;

  if (!hasAdvisoryAccess(userTier)) redirect("/dashboard");

  const course = await prisma.course.findFirst({
    where: { isPublished: true, requiredTier: userTier },
    orderBy: { order: "asc" },
    include: {
      instructor: true,
      modules: {
        where: { parentId: null },
        orderBy: { order: "asc" },
        include: {
          lessons: { where: { isPublished: true }, orderBy: { order: "asc" } },
          children: {
            orderBy: { order: "asc" },
            include: {
              lessons: { where: { isPublished: true }, orderBy: { order: "asc" } },
            },
          },
        },
      },
    },
  });

  if (!course) {
    return (
      <div className="max-w-3xl mx-auto pb-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-[var(--hex-text-primary)]">Advisory</h1>
          <p className="text-[var(--hex-text-secondary)] mt-2 text-sm">
            Your course curriculum &amp; playbooks.
          </p>
        </div>
        <Card hoverable={false} className="text-center py-12">
          <p className="text-[var(--hex-text-muted)] text-sm">
            No course is assigned to your tier yet. Check back soon.
          </p>
        </Card>
      </div>
    );
  }

  const completions = await prisma.lessonCompletion.findMany({
    where: { userId },
    select: { lessonId: true },
  });
  const completedIds = new Set(completions.map((c) => c.lessonId));

  let total = 0;
  let done = 0;
  for (const m of course.modules) {
    for (const l of m.lessons) {
      total++;
      if (completedIds.has(l.id)) done++;
    }
    for (const child of m.children) {
      for (const l of child.lessons) {
        total++;
        if (completedIds.has(l.id)) done++;
      }
    }
  }
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const firstLessonHref = (() => {
    for (const m of course.modules) {
      if (m.lessons[0]) return `/advisory/${m.lessons[0].slug}`;
      for (const c of m.children) {
        if (c.lessons[0]) return `/advisory/${c.lessons[0].slug}`;
      }
    }
    return "/advisory";
  })();

  return (
    <div className="max-w-6xl mx-auto pb-8">
      {/* Hero */}
      <div
        className="rounded-xl p-10 mb-8 text-center"
        style={{
          background: course.heroBannerUrl
            ? `linear-gradient(135deg, rgba(13,17,23,0.85), rgba(45,27,78,0.85)), url(${course.heroBannerUrl}) center/cover`
            : "linear-gradient(135deg, #0D1117 0%, #1E2530 50%, #2D1B4E 100%)",
        }}
      >
        <h1 className="font-display text-3xl md:text-4xl font-bold text-[var(--hex-text-primary)] mb-3">
          {course.title}
        </h1>
        {course.subtitle && (
          <p className="text-[var(--hex-text-secondary)] max-w-2xl mx-auto mb-6 text-sm">
            {course.subtitle}
          </p>
        )}
        <Link
          href={firstLessonHref}
          className="inline-block bg-gradient-to-br from-hex-teal to-[#0095A8] text-hex-dark-900 font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          {course.ctaLabel}
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Curriculum */}
        <div className="lg:col-span-2">
          <CourseCurriculumView
            modules={course.modules.map((m) => ({
              id: m.id,
              title: m.title,
              color: m.color,
              lessons: m.lessons.map((l) => ({
                id: l.id,
                slug: l.slug,
                title: l.title,
                description: l.description,
                type: l.type,
              })),
              children: m.children.map((c) => ({
                id: c.id,
                title: c.title,
                lessons: c.lessons.map((l) => ({
                  id: l.id,
                  slug: l.slug,
                  title: l.title,
                  description: l.description,
                  type: l.type,
                })),
              })),
            }))}
            completedLessonIds={Array.from(completedIds)}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card hoverable={false}>
            <div
              className="aspect-video rounded-lg mb-4 flex items-center justify-center"
              style={
                course.thumbnailUrl
                  ? { background: `url(${course.thumbnailUrl}) center/cover` }
                  : { background: "linear-gradient(135deg, rgba(0,196,204,0.1), rgba(168,85,247,0.1))" }
              }
            >
              {!course.thumbnailUrl && <PlayCircle size={48} className="text-hex-teal opacity-70" />}
            </div>
            <p className="text-sm text-[var(--hex-text-secondary)] mb-1">
              {done} of {total} lessons complete
            </p>
            <div className="h-2 bg-hex-dark-700 rounded-full overflow-hidden mb-1">
              <div
                className="h-full bg-gradient-to-r from-hex-teal to-[#0095A8]"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="text-xs text-hex-teal font-semibold text-right">{pct}%</p>
          </Card>

          {course.instructor && (
            <Card hoverable={false}>
              <p className="text-xs uppercase tracking-wider text-[var(--hex-text-muted)] mb-3">
                Instructor
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-hex-teal to-[#0095A8] flex items-center justify-center text-hex-dark-900 font-semibold">
                  {course.instructor.name[0]}
                </div>
                <div>
                  <p className="text-sm text-[var(--hex-text-primary)] font-medium">
                    {course.instructor.name}
                  </p>
                  {course.instructor.bio && (
                    <p className="text-xs text-[var(--hex-text-muted)]">{course.instructor.bio}</p>
                  )}
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
