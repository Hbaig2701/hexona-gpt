import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { hasAdvisoryAccess } from "@/lib/advisory";
import type { UserTier } from "@prisma/client";

export const dynamic = "force-dynamic";

async function requirePaidUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  const userTier = (session.user as { tier?: UserTier }).tier ?? "TIER_0";
  if (!hasAdvisoryAccess(userTier)) {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  return { userId: (session.user as { id: string }).id };
}

export async function GET() {
  const auth = await requirePaidUser();
  if ("error" in auth) return auth.error;

  const todos = await prisma.advisoryTodo.findMany({
    where: { userId: auth.userId },
    orderBy: [{ isCompleted: "asc" }, { order: "asc" }, { createdAt: "asc" }],
  });
  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  const auth = await requirePaidUser();
  if ("error" in auth) return auth.error;

  const body = await req.json().catch(() => ({}));
  const content = typeof body.content === "string" ? body.content.trim() : "";
  if (!content) {
    return NextResponse.json({ error: "Content required" }, { status: 400 });
  }

  const last = await prisma.advisoryTodo.findFirst({
    where: { userId: auth.userId },
    orderBy: { order: "desc" },
    select: { order: true },
  });
  const todo = await prisma.advisoryTodo.create({
    data: {
      userId: auth.userId,
      content,
      order: (last?.order ?? -1) + 1,
    },
  });
  return NextResponse.json(todo);
}
