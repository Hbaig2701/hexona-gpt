import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/db/prisma";
import { slugify } from "@/lib/advisory";
import type { UserTier } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  const courses = await prisma.course.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    include: {
      instructor: true,
      _count: { select: { modules: true, enrollments: true } },
    },
  });
  return NextResponse.json(courses);
}

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  const body = await req.json().catch(() => ({}));
  const title = typeof body.title === "string" ? body.title.trim() : "";
  if (!title) return NextResponse.json({ error: "Title required" }, { status: 400 });

  const requiredTier: UserTier = body.requiredTier ?? "TIER_1";
  let slug = typeof body.slug === "string" && body.slug.trim() ? slugify(body.slug) : slugify(title);
  if (!slug) slug = `course-${Date.now()}`;

  // Ensure uniqueness
  let suffix = 0;
  while (await prisma.course.findUnique({ where: { slug: suffix ? `${slug}-${suffix}` : slug } })) {
    suffix++;
  }
  if (suffix) slug = `${slug}-${suffix}`;

  const last = await prisma.course.findFirst({ orderBy: { order: "desc" }, select: { order: true } });

  const course = await prisma.course.create({
    data: {
      slug,
      title,
      subtitle: body.subtitle || null,
      heroBannerUrl: body.heroBannerUrl || null,
      thumbnailUrl: body.thumbnailUrl || null,
      ctaLabel: body.ctaLabel || "Start Course",
      requiredTier,
      instructorId: body.instructorId || null,
      isPublished: body.isPublished ?? false,
      order: (last?.order ?? -1) + 1,
    },
  });

  return NextResponse.json(course);
}
