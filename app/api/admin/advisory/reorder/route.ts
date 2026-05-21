import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

type Kind = "courses" | "modules" | "lessons" | "resources";

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  const body = await req.json().catch(() => ({}));
  const kind = body.kind as Kind | undefined;
  const ids = body.ids as string[] | undefined;
  if (!kind || !Array.isArray(ids)) {
    return NextResponse.json({ error: "kind and ids[] required" }, { status: 400 });
  }

  const ops = ids.map((id, order) => {
    if (kind === "courses") return prisma.course.update({ where: { id }, data: { order } });
    if (kind === "modules") return prisma.module.update({ where: { id }, data: { order } });
    if (kind === "lessons") return prisma.lesson.update({ where: { id }, data: { order } });
    return prisma.resource.update({ where: { id }, data: { order } });
  });
  await prisma.$transaction(ops);

  return NextResponse.json({ ok: true });
}
