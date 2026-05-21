import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { tierMatches, hasAdvisoryAccess } from "@/lib/advisory";
import type { UserTier } from "@prisma/client";

async function authorize(lessonId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  const userTier = (session.user as { tier?: UserTier }).tier ?? "TIER_0";
  const userId = (session.user as { id: string }).id;

  if (!hasAdvisoryAccess(userTier)) {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: { module: { include: { course: true } } },
  });
  if (!lesson) {
    return { error: NextResponse.json({ error: "Lesson not found" }, { status: 404 }) };
  }
  if (!tierMatches(userTier, lesson.module.course.requiredTier)) {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  return { userId, lessonId };
}

export async function POST(_req: Request, { params }: { params: { lessonId: string } }) {
  const auth = await authorize(params.lessonId);
  if ("error" in auth) return auth.error;

  await prisma.lessonCompletion.upsert({
    where: { userId_lessonId: { userId: auth.userId, lessonId: auth.lessonId } },
    create: { userId: auth.userId, lessonId: auth.lessonId },
    update: {},
  });
  return NextResponse.json({ completed: true });
}

export async function DELETE(_req: Request, { params }: { params: { lessonId: string } }) {
  const auth = await authorize(params.lessonId);
  if ("error" in auth) return auth.error;

  await prisma.lessonCompletion
    .delete({
      where: { userId_lessonId: { userId: auth.userId, lessonId: auth.lessonId } },
    })
    .catch(() => null);
  return NextResponse.json({ completed: false });
}
