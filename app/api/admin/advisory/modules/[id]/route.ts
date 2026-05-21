import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  const body = await req.json().catch(() => ({}));
  const data: Record<string, unknown> = {};
  if (typeof body.title === "string") data.title = body.title.trim();
  if ("color" in body) data.color = body.color || null;
  if ("order" in body) data.order = body.order;
  if ("parentId" in body) {
    if (body.parentId) {
      const current = await prisma.module.findUnique({ where: { id: params.id } });
      const parent = await prisma.module.findUnique({ where: { id: body.parentId } });
      if (!current || !parent || parent.courseId !== current.courseId) {
        return NextResponse.json({ error: "Invalid parent" }, { status: 400 });
      }
      if (parent.id === params.id) {
        return NextResponse.json({ error: "Cannot parent self" }, { status: 400 });
      }
      data.parentId = body.parentId;
    } else {
      data.parentId = null;
    }
  }
  const updated = await prisma.module.update({ where: { id: params.id }, data });
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  await prisma.module.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
