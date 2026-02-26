import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const clients = await prisma.client.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(clients);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  if (!body.businessName?.trim()) {
    return NextResponse.json({ error: "Business name is required" }, { status: 400 });
  }

  const client = await prisma.client.create({
    data: {
      userId: session.user.id,
      businessName: body.businessName.trim(),
      website: body.website?.trim() || null,
      industry: body.industry?.trim() || null,
      contactName: body.contactName?.trim() || null,
      contactEmail: body.contactEmail?.trim() || null,
      notes: body.notes?.trim() || null,
      status: body.status || "PROSPECT",
    },
  });

  return NextResponse.json(client, { status: 201 });
}
