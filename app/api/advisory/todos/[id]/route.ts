import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { hasAdvisoryAccess } from "@/lib/advisory";
import type { UserTier } from "@prisma/client";

export const dynamic = "force-dynamic";

async function requireOwnerOf(todoId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  const userTier = (session.user as { tier?: UserTier }).tier ?? "TIER_0";
  if (!hasAdvisoryAccess(userTier)) {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  const userId = (session.user as { id: string }).id;
  const todo = await prisma.advisoryTodo.findUnique({ where: { id: todoId } });
  if (!todo) {
    return { error: NextResponse.json({ error: "Not found" }, { status: 404 }) };
  }
  if (todo.userId !== userId) {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  return { todo, userId };
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const auth = await requireOwnerOf(params.id);
  if ("error" in auth) return auth.error;

  const body = await req.json().catch(() => ({}));
  const data: { content?: string; isCompleted?: boolean; completedAt?: Date | null } = {};
  if (typeof body.content === "string") {
    const trimmed = body.content.trim();
    if (!trimmed) return NextResponse.json({ error: "Content required" }, { status: 400 });
    data.content = trimmed;
  }
  if (typeof body.isCompleted === "boolean") {
    data.isCompleted = body.isCompleted;
    data.completedAt = body.isCompleted ? new Date() : null;
  }

  const updated = await prisma.advisoryTodo.update({
    where: { id: params.id },
    data,
  });
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const auth = await requireOwnerOf(params.id);
  if ("error" in auth) return auth.error;

  await prisma.advisoryTodo.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
