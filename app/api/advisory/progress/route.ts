import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { hasAdvisoryAccess } from "@/lib/advisory";
import type { UserTier } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userTier = (session.user as { tier?: UserTier }).tier ?? "TIER_0";
  const userId = (session.user as { id: string }).id;

  if (!hasAdvisoryAccess(userTier)) {
    return NextResponse.json({ eligible: false });
  }

  const course = await prisma.course.findFirst({
    where: { isPublished: true, requiredTier: userTier },
    orderBy: { order: "asc" },
    include: {
      modules: {
        where: { parentId: null },
        orderBy: { order: "asc" },
        include: {
          lessons: {
            where: { isPublished: true },
            orderBy: { order: "asc" },
            select: { id: true, slug: true, title: true },
          },
          children: {
            orderBy: { order: "asc" },
            include: {
              lessons: {
                where: { isPublished: true },
                orderBy: { order: "asc" },
                select: { id: true, slug: true, title: true },
              },
            },
          },
        },
      },
    },
  });

  if (!course) {
    return NextResponse.json({ eligible: true, course: null });
  }

  const allLessons: { id: string; slug: string; title: string }[] = [];
  for (const m of course.modules) {
    for (const l of m.lessons) allLessons.push(l);
    for (const c of m.children) for (const l of c.lessons) allLessons.push(l);
  }

  const completions = await prisma.lessonCompletion.findMany({
    where: { userId, lessonId: { in: allLessons.map((l) => l.id) } },
    select: { lessonId: true },
  });
  const completedIds = new Set(completions.map((c) => c.lessonId));

  const totalLessons = allLessons.length;
  const completedLessons = allLessons.filter((l) => completedIds.has(l.id)).length;
  const completionPct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const nextLesson = allLessons.find((l) => !completedIds.has(l.id)) ?? null;

  return NextResponse.json({
    eligible: true,
    course: { id: course.id, title: course.title },
    totalLessons,
    completedLessons,
    completionPct,
    nextLesson: nextLesson ? { slug: nextLesson.slug, title: nextLesson.title } : null,
  });
}
