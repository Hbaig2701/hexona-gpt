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
    return NextResponse.json({ courses: [], completedLessonIds: [] });
  }

  const [courses, completions] = await Promise.all([
    prisma.course.findMany({
      where: { isPublished: true, requiredTier: userTier },
      orderBy: { order: "asc" },
      include: {
        modules: {
          where: { parentId: null },
          orderBy: { order: "asc" },
          include: {
            lessons: {
              orderBy: { order: "asc" },
              select: { id: true, slug: true, title: true, type: true },
            },
            children: {
              orderBy: { order: "asc" },
              include: {
                lessons: {
                  orderBy: { order: "asc" },
                  select: { id: true, slug: true, title: true, type: true },
                },
              },
            },
          },
        },
      },
    }),
    prisma.lessonCompletion.findMany({
      where: { userId },
      select: { lessonId: true },
    }),
  ]);

  return NextResponse.json({
    courses,
    completedLessonIds: completions.map((c) => c.lessonId),
  });
}
