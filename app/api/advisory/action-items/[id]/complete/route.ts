import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { hasAdvisoryAccess, tierMatches } from "@/lib/advisory";
import type { UserTier } from "@prisma/client";

async function authorize(actionItemId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  const userTier = (session.user as { tier?: UserTier }).tier ?? "TIER_0";
  const userId = (session.user as { id: string }).id;

  if (!hasAdvisoryAccess(userTier)) {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  const item = await prisma.actionItem.findUnique({ where: { id: actionItemId } });
  if (!item) {
    return { error: NextResponse.json({ error: "Action item not found" }, { status: 404 }) };
  }
  // Exact-tier match: a user can only check off items for their own tier's plan.
  if (!tierMatches(userTier, item.requiredTier)) {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  return { userId, actionItemId };
}

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const auth = await authorize(params.id);
  if ("error" in auth) return auth.error;

  await Promise.all([
    prisma.actionItemCompletion.upsert({
      where: { userId_actionItemId: { userId: auth.userId, actionItemId: auth.actionItemId } },
      create: { userId: auth.userId, actionItemId: auth.actionItemId },
      update: {},
    }),
    prisma.user.update({ where: { id: auth.userId }, data: { lastActiveAt: new Date() } }),
  ]);
  return NextResponse.json({ completed: true });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const auth = await authorize(params.id);
  if ("error" in auth) return auth.error;

  await Promise.all([
    prisma.actionItemCompletion
      .delete({
        where: { userId_actionItemId: { userId: auth.userId, actionItemId: auth.actionItemId } },
      })
      .catch(() => null),
    prisma.user.update({ where: { id: auth.userId }, data: { lastActiveAt: new Date() } }),
  ]);
  return NextResponse.json({ completed: false });
}
