import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const profile = await prisma.agencyProfile.findUnique({
    where: { userId: session.user.id },
  });

  return NextResponse.json(profile);
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const profile = await prisma.agencyProfile.upsert({
    where: { userId: session.user.id },
    update: {
      niche: body.niche,
      services: body.services || [],
      location: body.location,
      monthlyRevenue: body.monthlyRevenue,
      revenueGoal: body.revenueGoal,
      experienceLevel: body.experienceLevel,
      background: body.background,
      biggestChallenge: body.biggestChallenge,
      completedAt: body.completedAt ? new Date(body.completedAt) : undefined,
    },
    create: {
      userId: session.user.id,
      niche: body.niche,
      services: body.services || [],
      location: body.location,
      monthlyRevenue: body.monthlyRevenue,
      revenueGoal: body.revenueGoal,
      experienceLevel: body.experienceLevel,
      background: body.background,
      biggestChallenge: body.biggestChallenge,
      completedAt: body.completedAt ? new Date(body.completedAt) : undefined,
    },
  });

  return NextResponse.json(profile);
}
