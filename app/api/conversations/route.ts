import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const gptSlug = searchParams.get("gptSlug");
  const clientId = searchParams.get("clientId");
  const limit = parseInt(searchParams.get("limit") || "20");

  const where: Record<string, unknown> = { userId: session.user.id };
  if (gptSlug) where.gptSlug = gptSlug;
  if (clientId) where.clientId = clientId;

  const conversations = await prisma.conversation.findMany({
    where,
    orderBy: { updatedAt: "desc" },
    take: Math.min(limit, 50),
    include: {
      client: { select: { businessName: true } },
      _count: { select: { messages: true } },
    },
  });

  return NextResponse.json(conversations);
}
