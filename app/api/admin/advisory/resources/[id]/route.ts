import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { prisma } from "@/lib/db/prisma";
import { slugify } from "@/lib/advisory";

export const dynamic = "force-dynamic";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  const body = await req.json().catch(() => ({}));
  const data: Record<string, unknown> = {};
  if (typeof body.title === "string") data.title = body.title.trim();
  if ("description" in body) data.description = body.description || null;
  if ("url" in body) data.url = body.url || "";
  if ("category" in body) data.category = body.category || null;
  if ("tableData" in body) data.tableData = body.tableData ?? null;
  if ("listData" in body) data.listData = body.listData ?? null;
  if ("thumbnailUrl" in body) data.thumbnailUrl = body.thumbnailUrl || null;
  if ("requiredTier" in body) data.requiredTier = body.requiredTier;
  if ("isPublished" in body) data.isPublished = !!body.isPublished;
  if ("order" in body) data.order = body.order;
  if ("slug" in body && typeof body.slug === "string" && body.slug.trim()) {
    const newSlug = slugify(body.slug);
    if (newSlug) {
      const conflict = await prisma.resource.findFirst({
        where: { slug: newSlug, NOT: { id: params.id } },
      });
      if (conflict) return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
      data.slug = newSlug;
    }
  }
  const updated = await prisma.resource.update({ where: { id: params.id }, data });
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  await prisma.resource.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
