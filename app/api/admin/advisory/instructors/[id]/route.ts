import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  const body = await req.json().catch(() => ({}));
  const data: Record<string, unknown> = {};
  if (typeof body.name === "string") data.name = body.name.trim();
  if ("bio" in body) data.bio = body.bio || null;
  if ("photoUrl" in body) data.photoUrl = body.photoUrl || null;

  const updated = await prisma.instructor.update({ where: { id: params.id }, data });
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  // Detach from courses (instructor relation is optional)
  await prisma.course.updateMany({
    where: { instructorId: params.id },
    data: { instructorId: null },
  });
  await prisma.instructor.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
