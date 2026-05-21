import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/db/prisma";
import { slugify } from "@/lib/advisory";

export const dynamic = "force-dynamic";

const RESERVED_SLUGS = new Set(["resources", "todos"]);

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  const body = await req.json().catch(() => ({}));
  const title = typeof body.title === "string" ? body.title.trim() : "";
  if (!title) return NextResponse.json({ error: "Title required" }, { status: 400 });

  const moduleRow = await prisma.module.findUnique({ where: { id: params.id } });
  if (!moduleRow) return NextResponse.json({ error: "Module not found" }, { status: 404 });

  let slug = typeof body.slug === "string" && body.slug.trim() ? slugify(body.slug) : slugify(title);
  if (!slug) slug = `lesson-${Date.now()}`;

  // Lesson slugs must be unique within a course (used in the URL /advisory/<slug>)
  // and must not collide with reserved route names.
  const courseModuleIds = await prisma.module.findMany({
    where: { courseId: moduleRow.courseId },
    select: { id: true },
  });
  const moduleIds = courseModuleIds.map((m) => m.id);

  async function isTaken(candidate: string): Promise<boolean> {
    if (RESERVED_SLUGS.has(candidate)) return true;
    const hit = await prisma.lesson.findFirst({
      where: { moduleId: { in: moduleIds }, slug: candidate },
      select: { id: true },
    });
    return !!hit;
  }

  let suffix = 0;
  while (await isTaken(suffix ? `${slug}-${suffix}` : slug)) suffix++;
  if (suffix) slug = `${slug}-${suffix}`;

  const last = await prisma.lesson.findFirst({
    where: { moduleId: params.id },
    orderBy: { order: "desc" },
    select: { order: true },
  });

  const lesson = await prisma.lesson.create({
    data: {
      moduleId: params.id,
      slug,
      title,
      description: body.description || null,
      type: body.type || "VIDEO",
      loomUrl: body.loomUrl || null,
      durationSec: body.durationSec ?? null,
      externalUrl: body.externalUrl || null,
      advisorSlug: body.advisorSlug || null,
      tableData: body.tableData ?? null,
      thumbnailUrl: body.thumbnailUrl || null,
      cardBg: body.cardBg || null,
      isPublished: body.isPublished ?? true,
      order: (last?.order ?? -1) + 1,
    },
  });
  return NextResponse.json(lesson);
}
