import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/db/prisma";
import { slugify } from "@/lib/advisory";

export const dynamic = "force-dynamic";

const RESERVED_SLUGS = new Set(["resources", "todos"]);

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  const lesson = await prisma.lesson.findUnique({ where: { id: params.id } });
  if (!lesson) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(lesson);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  const body = await req.json().catch(() => ({}));
  const data: Record<string, unknown> = {};

  if (typeof body.title === "string") data.title = body.title.trim();
  if ("description" in body) data.description = body.description || null;
  if ("type" in body) data.type = body.type;
  if ("loomUrl" in body) data.loomUrl = body.loomUrl || null;
  if ("durationSec" in body) data.durationSec = body.durationSec ?? null;
  if ("externalUrl" in body) data.externalUrl = body.externalUrl || null;
  if ("advisorSlug" in body) data.advisorSlug = body.advisorSlug || null;
  if ("tableData" in body) data.tableData = body.tableData ?? null;
  if ("thumbnailUrl" in body) data.thumbnailUrl = body.thumbnailUrl || null;
  if ("cardBg" in body) data.cardBg = body.cardBg || null;
  if ("isPublished" in body) data.isPublished = !!body.isPublished;
  if ("order" in body) data.order = body.order;
  if ("moduleId" in body) {
    const target = await prisma.module.findUnique({ where: { id: body.moduleId } });
    if (!target) return NextResponse.json({ error: "Invalid moduleId" }, { status: 400 });
    data.moduleId = body.moduleId;
  }
  if ("slug" in body && typeof body.slug === "string" && body.slug.trim()) {
    const newSlug = slugify(body.slug);
    if (newSlug) {
      if (RESERVED_SLUGS.has(newSlug)) {
        return NextResponse.json({ error: `"${newSlug}" is a reserved URL` }, { status: 409 });
      }
      const current = await prisma.lesson.findUnique({
        where: { id: params.id },
        include: { module: { select: { courseId: true } } },
      });
      if (current) {
        const courseModules = await prisma.module.findMany({
          where: { courseId: current.module.courseId },
          select: { id: true },
        });
        const conflict = await prisma.lesson.findFirst({
          where: {
            moduleId: { in: courseModules.map((m) => m.id) },
            slug: newSlug,
            NOT: { id: params.id },
          },
        });
        if (conflict) return NextResponse.json({ error: "Slug already used in this course" }, { status: 409 });
        data.slug = newSlug;
      }
    }
  }

  const updated = await prisma.lesson.update({ where: { id: params.id }, data });
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  await prisma.lesson.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
