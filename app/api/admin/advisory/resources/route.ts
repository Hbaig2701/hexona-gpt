import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/db/prisma";
import { slugify } from "@/lib/advisory";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  const resources = await prisma.resource.findMany({
    orderBy: [{ requiredTier: "asc" }, { category: "asc" }, { order: "asc" }],
  });
  return NextResponse.json(resources);
}

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  const body = await req.json().catch(() => ({}));
  const title = typeof body.title === "string" ? body.title.trim() : "";
  if (!title) return NextResponse.json({ error: "Title required" }, { status: 400 });

  let slug = typeof body.slug === "string" && body.slug.trim() ? slugify(body.slug) : slugify(title);
  if (!slug) slug = `resource-${Date.now()}`;

  let suffix = 0;
  while (await prisma.resource.findUnique({ where: { slug: suffix ? `${slug}-${suffix}` : slug } })) {
    suffix++;
  }
  if (suffix) slug = `${slug}-${suffix}`;

  const last = await prisma.resource.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  });

  const resource = await prisma.resource.create({
    data: {
      slug,
      title,
      description: body.description || null,
      url: typeof body.url === "string" ? body.url : "",
      tableData: body.tableData ?? null,
      listData: body.listData ?? null,
      documentMd: body.documentMd || null,
      category: body.category || null,
      thumbnailUrl: body.thumbnailUrl || null,
      requiredTier: body.requiredTier ?? "TIER_1",
      isPublished: body.isPublished ?? true,
      order: (last?.order ?? -1) + 1,
    },
  });
  return NextResponse.json(resource);
}
