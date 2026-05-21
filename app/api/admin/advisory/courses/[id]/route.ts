import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/db/prisma";
import { slugify } from "@/lib/advisory";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  const course = await prisma.course.findUnique({
    where: { id: params.id },
    include: {
      instructor: true,
      modules: {
        where: { parentId: null },
        orderBy: { order: "asc" },
        include: {
          lessons: { orderBy: { order: "asc" } },
          children: {
            orderBy: { order: "asc" },
            include: { lessons: { orderBy: { order: "asc" } } },
          },
        },
      },
    },
  });
  if (!course) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(course);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  const body = await req.json().catch(() => ({}));
  const data: Record<string, unknown> = {};

  if (typeof body.title === "string") data.title = body.title.trim();
  if ("subtitle" in body) data.subtitle = body.subtitle || null;
  if ("heroBannerUrl" in body) data.heroBannerUrl = body.heroBannerUrl || null;
  if ("thumbnailUrl" in body) data.thumbnailUrl = body.thumbnailUrl || null;
  if ("ctaLabel" in body) data.ctaLabel = body.ctaLabel || "Start Course";
  if ("requiredTier" in body) data.requiredTier = body.requiredTier;
  if ("instructorId" in body) data.instructorId = body.instructorId || null;
  if ("isPublished" in body) data.isPublished = !!body.isPublished;
  if ("order" in body) data.order = body.order;
  if ("slug" in body && typeof body.slug === "string" && body.slug.trim()) {
    const newSlug = slugify(body.slug);
    if (newSlug) {
      const conflict = await prisma.course.findFirst({
        where: { slug: newSlug, NOT: { id: params.id } },
      });
      if (conflict) return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
      data.slug = newSlug;
    }
  }

  const course = await prisma.course.update({ where: { id: params.id }, data });
  return NextResponse.json(course);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  await prisma.course.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
