import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const period = searchParams.get("period") || "30d";
  const summary = searchParams.get("summary") === "true";

  const days = period === "7d" ? 7 : period === "90d" ? 90 : 30;
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  if (summary) {
    const [totalUsers, activeUsers, usageAgg] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { lastActiveAt: { gte: since } } }),
      prisma.usageLog.aggregate({
        where: { createdAt: { gte: since } },
        _count: true,
        _sum: { estimatedCost: true },
      }),
    ]);

    return NextResponse.json({
      totalUsers,
      activeUsers,
      totalMessages: usageAgg._count,
      totalCost: usageAgg._sum.estimatedCost || 0,
    });
  }

  // Full analytics
  const [
    usageLogs,
    gptPopularity,
    modelBreakdown,
    topUsers,
  ] = await Promise.all([
    // Daily usage
    prisma.usageLog.groupBy({
      by: ["createdAt"],
      where: { createdAt: { gte: since } },
      _count: true,
      _sum: { estimatedCost: true },
    }),
    // GPT popularity
    prisma.usageLog.groupBy({
      by: ["gptSlug"],
      where: { createdAt: { gte: since } },
      _count: true,
      orderBy: { _count: { gptSlug: "desc" } },
    }),
    // Model cost breakdown
    prisma.usageLog.groupBy({
      by: ["provider", "model"],
      where: { createdAt: { gte: since } },
      _count: true,
      _sum: { tokensInput: true, tokensOutput: true, estimatedCost: true },
    }),
    // Top users
    prisma.usageLog.groupBy({
      by: ["userId"],
      where: { createdAt: { gte: since } },
      _count: true,
      _sum: { estimatedCost: true },
      orderBy: { _count: { userId: "desc" } },
      take: 10,
    }),
  ]);

  // Fetch user names for top users
  const userIds = topUsers.map((u) => u.userId);
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, name: true, email: true },
  });
  const userMap = new Map(users.map((u) => [u.id, u]));

  // Aggregate daily data
  const dailyMap = new Map<string, { messages: number; cost: number }>();
  for (const log of usageLogs) {
    const day = new Date(log.createdAt).toISOString().split("T")[0];
    const existing = dailyMap.get(day) || { messages: 0, cost: 0 };
    dailyMap.set(day, {
      messages: existing.messages + log._count,
      cost: existing.cost + (log._sum.estimatedCost || 0),
    });
  }

  const dailyData = Array.from(dailyMap.entries())
    .map(([date, data]) => ({ date, ...data }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return NextResponse.json({
    dailyData,
    gptPopularity: gptPopularity.map((g) => ({
      gptSlug: g.gptSlug,
      count: g._count,
    })),
    modelBreakdown: modelBreakdown.map((m) => ({
      provider: m.provider,
      model: m.model,
      count: m._count,
      tokensInput: m._sum.tokensInput || 0,
      tokensOutput: m._sum.tokensOutput || 0,
      cost: m._sum.estimatedCost || 0,
    })),
    topUsers: topUsers.map((u) => ({
      userId: u.userId,
      name: userMap.get(u.userId)?.name || "Unknown",
      email: userMap.get(u.userId)?.email || "",
      messageCount: u._count,
      cost: u._sum.estimatedCost || 0,
    })),
  });
}
