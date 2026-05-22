import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/db/prisma";
import type { UserTier } from "@prisma/client";

export const dynamic = "force-dynamic";

const PAID_TIERS: UserTier[] = ["TIER_1", "TIER_2", "TIER_3"];

export async function GET(req: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const tierParam = searchParams.get("tier") as UserTier | null;
  const tier: UserTier | null =
    tierParam && PAID_TIERS.includes(tierParam) ? tierParam : null;

  // Tier overview — used by the tier-switcher pills
  const tierCounts = await Promise.all(
    PAID_TIERS.map(async (t) => {
      const [users, course] = await Promise.all([
        prisma.user.count({ where: { tier: t, isActive: true } }),
        prisma.course.findFirst({
          where: { isPublished: true, requiredTier: t },
          select: { id: true, title: true },
        }),
      ]);
      return { tier: t, users, course };
    })
  );

  // If no tier was requested, pick the first one that has both a course AND users
  const resolvedTier: UserTier | null =
    tier ?? tierCounts.find((t) => t.course && t.users > 0)?.tier ?? tierCounts[0]?.tier ?? null;

  if (!resolvedTier) {
    return NextResponse.json({ tier: null, tierCounts, course: null });
  }

  const course = await prisma.course.findFirst({
    where: { isPublished: true, requiredTier: resolvedTier },
    orderBy: { order: "asc" },
    include: {
      modules: {
        where: { parentId: null },
        orderBy: { order: "asc" },
        include: {
          lessons: {
            where: { isPublished: true },
            orderBy: { order: "asc" },
            select: { id: true, slug: true, title: true, type: true },
          },
          children: {
            orderBy: { order: "asc" },
            include: {
              lessons: {
                where: { isPublished: true },
                orderBy: { order: "asc" },
                select: { id: true, slug: true, title: true, type: true },
              },
            },
          },
        },
      },
    },
  });

  if (!course) {
    return NextResponse.json({ tier: resolvedTier, tierCounts, course: null });
  }

  // Flatten lesson universe + map titles for later
  type FlatLesson = { id: string; title: string; moduleTitle: string };
  const flatLessons: FlatLesson[] = [];
  const lessonTitleById = new Map<string, string>();
  for (const m of course.modules) {
    for (const l of m.lessons) {
      flatLessons.push({ id: l.id, title: l.title, moduleTitle: m.title });
      lessonTitleById.set(l.id, l.title);
    }
    for (const c of m.children) {
      for (const l of c.lessons) {
        flatLessons.push({ id: l.id, title: l.title, moduleTitle: `${m.title} · ${c.title}` });
        lessonTitleById.set(l.id, l.title);
      }
    }
  }
  const totalLessons = flatLessons.length;
  const lessonIds = flatLessons.map((l) => l.id);

  // Users on this tier (the "enrolled cohort" — every paid-tier user has implicit access)
  const users = await prisma.user.findMany({
    where: { tier: resolvedTier, isActive: true, role: { not: "ADMIN" } },
    select: { id: true, name: true, email: true, lastActiveAt: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  const userIds = users.map((u) => u.id);

  // All relevant completions in one query
  const completions =
    userIds.length > 0 && lessonIds.length > 0
      ? await prisma.lessonCompletion.findMany({
          where: { userId: { in: userIds }, lessonId: { in: lessonIds } },
          select: { userId: true, lessonId: true, completedAt: true },
        })
      : [];

  // Per-user completion sets
  const perUser = new Map<string, { ids: Set<string>; lastCompletedAt: Date | null }>();
  for (const c of completions) {
    let entry = perUser.get(c.userId);
    if (!entry) {
      entry = { ids: new Set(), lastCompletedAt: null };
      perUser.set(c.userId, entry);
    }
    entry.ids.add(c.lessonId);
    if (!entry.lastCompletedAt || c.completedAt > entry.lastCompletedAt) {
      entry.lastCompletedAt = c.completedAt;
    }
  }

  // Per-lesson completion counts
  const perLesson = new Map<string, number>();
  for (const c of completions) {
    perLesson.set(c.lessonId, (perLesson.get(c.lessonId) ?? 0) + 1);
  }

  // Student rows
  const students = users
    .map((u) => {
      const e = perUser.get(u.id);
      const completed = e?.ids.size ?? 0;
      const pct = totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
      return {
        id: u.id,
        name: u.name,
        email: u.email,
        completed,
        totalLessons,
        pct,
        lastCompletedAt: e?.lastCompletedAt?.toISOString() ?? null,
        lastActiveAt: u.lastActiveAt?.toISOString() ?? null,
        createdAt: u.createdAt.toISOString(),
      };
    })
    .sort((a, b) => b.pct - a.pct);

  // Funnel buckets
  const buckets = { "0%": 0, "1-24%": 0, "25-49%": 0, "50-74%": 0, "75-99%": 0, "100%": 0 };
  for (const s of students) {
    if (s.pct === 0) buckets["0%"]++;
    else if (s.pct < 25) buckets["1-24%"]++;
    else if (s.pct < 50) buckets["25-49%"]++;
    else if (s.pct < 75) buckets["50-74%"]++;
    else if (s.pct < 100) buckets["75-99%"]++;
    else buckets["100%"]++;
  }

  // Lesson rankings
  const lessonRanking = flatLessons
    .map((l) => ({
      id: l.id,
      title: l.title,
      moduleTitle: l.moduleTitle,
      count: perLesson.get(l.id) ?? 0,
      pct: students.length > 0 ? Math.round(((perLesson.get(l.id) ?? 0) / students.length) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);

  // Recent completions feed (last 20)
  const recentCompletions = completions
    .sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime())
    .slice(0, 20)
    .map((c) => {
      const user = users.find((u) => u.id === c.userId);
      return {
        userId: c.userId,
        userName: user?.name ?? user?.email ?? "Unknown",
        lessonTitle: lessonTitleById.get(c.lessonId) ?? "(removed)",
        completedAt: c.completedAt.toISOString(),
      };
    });

  // Active-in-last-7-days
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recentlyActive = users.filter(
    (u) => u.lastActiveAt && u.lastActiveAt.getTime() >= sevenDaysAgo
  ).length;

  // Aggregate KPIs
  const activated = students.filter((s) => s.completed > 0).length;
  const completedAll = students.filter((s) => s.pct === 100).length;
  const avgCompletionPct =
    students.length > 0 ? Math.round(students.reduce((s, x) => s + x.pct, 0) / students.length) : 0;
  const avgLessonsCompleted =
    students.length > 0
      ? Math.round((students.reduce((s, x) => s + x.completed, 0) / students.length) * 10) / 10
      : 0;

  // Per-module aggregate completion %
  const moduleStats = course.modules.map((m) => {
    const lessons = [...m.lessons, ...m.children.flatMap((c) => c.lessons)];
    const totalSlots = lessons.length * students.length;
    let completed = 0;
    for (const l of lessons) {
      completed += perLesson.get(l.id) ?? 0;
    }
    return {
      id: m.id,
      title: m.title,
      lessons: lessons.length,
      pct: totalSlots > 0 ? Math.round((completed / totalSlots) * 100) : 0,
    };
  });

  return NextResponse.json({
    tier: resolvedTier,
    tierCounts,
    course: {
      id: course.id,
      title: course.title,
      totalLessons,
    },
    kpis: {
      totalStudents: students.length,
      activated,
      activatedPct: students.length > 0 ? Math.round((activated / students.length) * 100) : 0,
      completedAll,
      avgCompletionPct,
      avgLessonsCompleted,
      recentlyActive,
    },
    funnel: Object.entries(buckets).map(([bucket, count]) => ({ bucket, count })),
    moduleStats,
    topLessons: lessonRanking.slice(0, 5),
    bottomLessons: lessonRanking.slice(-5).reverse(),
    students,
    recentCompletions,
  });
}
