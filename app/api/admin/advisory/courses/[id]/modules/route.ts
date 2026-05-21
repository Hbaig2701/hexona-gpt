import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  const body = await req.json().catch(() => ({}));
  const title = typeof body.title === "string" ? body.title.trim() : "";
  if (!title) return NextResponse.json({ error: "Title required" }, { status: 400 });

  const course = await prisma.course.findUnique({ where: { id: params.id } });
  if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 });

  const parentId: string | null = body.parentId || null;
  // Validate parent belongs to same course
  if (parentId) {
    const parent = await prisma.module.findUnique({ where: { id: parentId } });
    if (!parent || parent.courseId !== params.id) {
      return NextResponse.json({ error: "Invalid parent module" }, { status: 400 });
    }
  }

  const last = await prisma.module.findFirst({
    where: { courseId: params.id, parentId },
    orderBy: { order: "desc" },
    select: { order: true },
  });

  const moduleRow = await prisma.module.create({
    data: {
      courseId: params.id,
      parentId,
      title,
      color: body.color || null,
      order: (last?.order ?? -1) + 1,
    },
  });
  return NextResponse.json(moduleRow);
}
