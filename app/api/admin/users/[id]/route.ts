import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/db/prisma";
import { sendPasswordResetEmail } from "@/lib/email";

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

  return NextResponse.json({
    ...user,
    passwordHash: undefined,
    usageStats: {
      totalMessages: usageStats._count,
      totalTokens: (usageStats._sum.tokensInput || 0) + (usageStats._sum.tokensOutput || 0),
      totalCost: usageStats._sum.estimatedCost || 0,
    },
    gptUsage,
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
