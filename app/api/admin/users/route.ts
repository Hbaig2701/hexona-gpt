import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");
  const filter = searchParams.get("filter"); // active | inactive | all
  const sort = searchParams.get("sort") || "createdAt";

  const where: Record<string, unknown> = {};
  if (filter === "active") where.isActive = true;
  if (filter === "inactive") where.isActive = false;
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  const orderBy: Record<string, string> = {};
  if (sort === "lastActive") orderBy.lastActiveAt = "desc";
  else if (sort === "name") orderBy.name = "asc";
  else orderBy.createdAt = "desc";

  const users = await prisma.user.findMany({
    where,
    orderBy,
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      createdAt: true,
      lastActiveAt: true,
      _count: { select: { conversations: true } },
    },
  });

  return NextResponse.json(users);
}
