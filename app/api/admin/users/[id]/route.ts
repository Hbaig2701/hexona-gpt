import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/db/prisma";
import { sendPasswordResetEmail } from "@/lib/email";
import { hasAdvisoryAccess } from "@/lib/advisory";

export const dynamic = "force-dynamic";
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      agencyProfile: true,
      _count: { select: { conversations: true, clients: true } },
    },
  });

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Get usage stats
  const usageStats = await prisma.usageLog.aggregate({
    where: { userId: id },
    _sum: { tokensInput: true, tokensOutput: true, estimatedCost: true },
    _count: true,
  });

  // Get per-GPT message counts
  const gptUsage = await prisma.conversation.groupBy({
    by: ["gptSlug"],
    where: { userId: id },
    _count: true,
  });

  // ─── Advisory (course progress) ────────────────────────────────────────────
  const eligibleForAdvisory = hasAdvisoryAccess(user.tier);

  const course = eligibleForAdvisory
    ? await prisma.course.findFirst({
        where: { isPublished: true, requiredTier: user.tier },
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
      })
    : null;

  const completions = await prisma.lessonCompletion.findMany({
    where: { userId: id },
    select: { lessonId: true, completedAt: true },
  });
  const completionMap = new Map(completions.map((c) => [c.lessonId, c.completedAt]));

  const quizSubmissions = await prisma.quizSubmission.findMany({
    where: { userId: id },
    orderBy: { submittedAt: "desc" },
    include: { quiz: { select: { lesson: { select: { title: true } } } } },
  });

  type ProgressLesson = {
    id: string;
    slug: string;
    title: string;
    type: string;
    completed: boolean;
    completedAt: string | null;
  };
  type ProgressModule = {
    id: string;
    title: string;
    color: string | null;
    lessonsTotal: number;
    lessonsCompleted: number;
    lessons: ProgressLesson[];
    children: { id: string; title: string; lessons: ProgressLesson[] }[];
  };

  let advisory: {
    course: { id: string; title: string; requiredTier: string };
    totalLessons: number;
    completedLessons: number;
    completionPct: number;
    currentModule: { id: string; title: string } | null;
    modules: ProgressModule[];
    quizSubmissions: { lessonTitle: string; score: number; passed: boolean; submittedAt: string }[];
    lastLessonCompletedAt: string | null;
  } | null = null;

  // Build a lookup of every published lesson in the user's course (for the timeline)
  const lessonTitleMap = new Map<string, string>();

  if (course) {
    let totalLessons = 0;
    let completedLessons = 0;
    const moduleSummaries: ProgressModule[] = [];

    const decorate = (l: { id: string; slug: string; title: string; type: string }): ProgressLesson => {
      lessonTitleMap.set(l.id, l.title);
      const completedAt = completionMap.get(l.id);
      return {
        id: l.id,
        slug: l.slug,
        title: l.title,
        type: l.type,
        completed: !!completedAt,
        completedAt: completedAt ? completedAt.toISOString() : null,
      };
    };

    for (const m of course.modules) {
      const lessons = m.lessons.map(decorate);
      const children = m.children.map((c) => ({
        id: c.id,
        title: c.title,
        lessons: c.lessons.map(decorate),
      }));
      const allInModule = [...lessons, ...children.flatMap((c) => c.lessons)];
      const moduleCompleted = allInModule.filter((l) => l.completed).length;

      totalLessons += allInModule.length;
      completedLessons += moduleCompleted;

      moduleSummaries.push({
        id: m.id,
        title: m.title,
        color: m.color,
        lessonsTotal: allInModule.length,
        lessonsCompleted: moduleCompleted,
        lessons,
        children,
      });
    }

    const firstIncomplete = moduleSummaries.find((m) => m.lessonsCompleted < m.lessonsTotal);
    const currentModule = firstIncomplete
      ? { id: firstIncomplete.id, title: firstIncomplete.title }
      : moduleSummaries.length > 0
      ? { id: moduleSummaries[moduleSummaries.length - 1].id, title: moduleSummaries[moduleSummaries.length - 1].title }
      : null;

    // Only count completions for lessons that are still part of the published course
    // (filtering out stale completions for unpublished/removed lessons)
    const lastCompletion = completions
      .filter((c) => lessonTitleMap.has(c.lessonId))
      .sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime())[0];

    advisory = {
      course: { id: course.id, title: course.title, requiredTier: course.requiredTier },
      totalLessons,
      completedLessons,
      completionPct: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
      currentModule,
      modules: moduleSummaries,
      quizSubmissions: quizSubmissions.map((s) => ({
        lessonTitle: s.quiz.lesson.title,
        score: s.score,
        passed: s.passed,
        submittedAt: s.submittedAt.toISOString(),
      })),
      lastLessonCompletedAt: lastCompletion ? lastCompletion.completedAt.toISOString() : null,
    };
  }

  // ─── Activity timeline (last 30 mixed events) ─────────────────────────────
  const recentConversations = await prisma.conversation.findMany({
    where: { userId: id },
    orderBy: { createdAt: "desc" },
    take: 30,
    select: { id: true, gptSlug: true, createdAt: true, title: true },
  });

  type TimelineEvent = {
    type: "lesson_completed" | "conversation_started" | "quiz_submitted";
    timestamp: string;
    label: string;
    detail?: string;
  };

  const timeline: TimelineEvent[] = [
    ...recentConversations.map(
      (c): TimelineEvent => ({
        type: "conversation_started",
        timestamp: c.createdAt.toISOString(),
        label: `Used ${c.gptSlug}`,
        detail: c.title ?? undefined,
      })
    ),
    ...completions.map(
      (c): TimelineEvent => ({
        type: "lesson_completed",
        timestamp: c.completedAt.toISOString(),
        label: `Completed: ${lessonTitleMap.get(c.lessonId) ?? "(lesson removed)"}`,
      })
    ),
    ...quizSubmissions.map(
      (s): TimelineEvent => ({
        type: "quiz_submitted",
        timestamp: s.submittedAt.toISOString(),
        label: `Checkpoint ${s.passed ? "passed" : "failed"}: ${s.quiz.lesson.title} (${s.score}%)`,
      })
    ),
  ]
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .slice(0, 30);

  return NextResponse.json({
    ...user,
    passwordHash: undefined,
    usageStats: {
      totalMessages: usageStats._count,
      totalTokens: (usageStats._sum.tokensInput || 0) + (usageStats._sum.tokensOutput || 0),
      totalCost: usageStats._sum.estimatedCost || 0,
    },
    gptUsage,
    advisory,
    eligibleForAdvisory,
    activityTimeline: timeline,
  });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  const { id } = await params;
  const body = await req.json();

  const updateData: Record<string, unknown> = {};

  if (typeof body.isActive === "boolean") updateData.isActive = body.isActive;
  if (body.role === "ADMIN" || body.role === "USER") updateData.role = body.role;
  if (
    body.tier === "TIER_0" ||
    body.tier === "TIER_1" ||
    body.tier === "TIER_2" ||
    body.tier === "TIER_3"
  ) {
    updateData.tier = body.tier;
  }

  // Trigger password reset
  if (body.resetPassword) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (user) {
      const token = crypto.randomBytes(32).toString("hex");
      await prisma.passwordReset.create({
        data: {
          userId: id,
          token,
          expiresAt: new Date(Date.now() + 60 * 60 * 1000),
        },
      });
      await sendPasswordResetEmail(user.email, token);
    }
  }

  if (Object.keys(updateData).length > 0) {
    await prisma.user.update({ where: { id }, data: updateData });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  const { id } = await params;

  // Soft delete: deactivate the user
  await prisma.user.update({
    where: { id },
    data: { isActive: false },
  });

  return NextResponse.json({ success: true });
}
