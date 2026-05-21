import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { tierMatches, hasAdvisoryAccess, loomEmbedUrl } from "@/lib/advisory";
import type { UserTier } from "@prisma/client";
import LessonPlayer from "@/components/advisory/LessonPlayer";

export const dynamic = "force-dynamic";

const RESERVED_SLUGS = new Set(["resources", "todos"]);

export default async function LessonPage({
  params,
}: {
  params: { lessonSlug: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const userTier = (session.user as { tier?: UserTier }).tier ?? "TIER_0";
  const userId = (session.user as { id: string }).id;

  if (!hasAdvisoryAccess(userTier)) redirect("/dashboard");

  // Reserved slugs render their own page (Next.js routes them first, but safety-net here)
  if (RESERVED_SLUGS.has(params.lessonSlug)) notFound();

  const course = await prisma.course.findFirst({
    where: { isPublished: true, requiredTier: userTier },
    orderBy: { order: "asc" },
    include: {
      modules: {
        where: { parentId: null },
        orderBy: { order: "asc" },
        include: {
          lessons: { orderBy: { order: "asc" } },
          children: {
            orderBy: { order: "asc" },
            include: { lessons: { orderBy: { order: "asc" } } },
          },
        },
      },
    },
  });

  if (!course) notFound();
  if (!tierMatches(userTier, course.requiredTier)) notFound();

  type LessonRow = {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    type: import("@prisma/client").LessonType;
    loomUrl: string | null;
    externalUrl: string | null;
    advisorSlug: string | null;
    tableData: unknown;
    isPublished: boolean;
    moduleTitle: string;
  };
  const flat: LessonRow[] = [];
  for (const m of course.modules) {
    for (const l of m.lessons) {
      if (l.isPublished) flat.push({ ...l, moduleTitle: m.title });
    }
    for (const c of m.children) {
      for (const l of c.lessons) {
        if (l.isPublished) flat.push({ ...l, moduleTitle: `${m.title} · ${c.title}` });
      }
    }
  }

  const idx = flat.findIndex((l) => l.slug === params.lessonSlug);
  if (idx === -1) notFound();

  const lesson = flat[idx];
  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx < flat.length - 1 ? flat[idx + 1] : null;

  const completion = await prisma.lessonCompletion.findUnique({
    where: { userId_lessonId: { userId, lessonId: lesson.id } },
  });

  const tableData =
    lesson.tableData &&
    typeof lesson.tableData === "object" &&
    Array.isArray((lesson.tableData as { headers?: unknown }).headers) &&
    Array.isArray((lesson.tableData as { rows?: unknown }).rows)
      ? (lesson.tableData as { headers: string[]; rows: string[][] })
      : null;

  return (
    <LessonPlayer
      courseTitle={course.title}
      lesson={{
        id: lesson.id,
        slug: lesson.slug,
        title: lesson.title,
        description: lesson.description,
        type: lesson.type,
        loomEmbed: loomEmbedUrl(lesson.loomUrl),
        externalUrl: lesson.externalUrl,
        advisorSlug: lesson.advisorSlug,
        tableData,
        moduleTitle: lesson.moduleTitle,
      }}
      initiallyCompleted={!!completion}
      prevSlug={prev?.slug ?? null}
      nextSlug={next?.slug ?? null}
    />
  );
}
