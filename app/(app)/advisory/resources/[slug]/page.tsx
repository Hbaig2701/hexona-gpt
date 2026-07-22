import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { hasAdvisoryAccess, tierMatches } from "@/lib/advisory";
import type { UserTier } from "@prisma/client";
import LessonTable from "@/components/advisory/LessonTable";
import ResourceList from "@/components/advisory/ResourceList";
import ResourceDocument from "@/components/advisory/ResourceDocument";

export const dynamic = "force-dynamic";

function parseTableData(value: unknown) {
  if (!value || typeof value !== "object") return null;
  const v = value as { headers?: unknown; rows?: unknown };
  if (Array.isArray(v.headers) && Array.isArray(v.rows)) {
    return { headers: v.headers as string[], rows: v.rows as string[][] };
  }
  return null;
}

type ParsedListItem = {
  title: string;
  description?: string;
  body?: string;
  links: Array<{ label: string; url: string }>;
};

function parseListItems(arr: unknown): ParsedListItem[] {
  return (Array.isArray(arr) ? arr : []).map((it) => {
    const item = it as {
      title?: string;
      description?: string;
      body?: string;
      links?: Array<{ label?: string; url?: string }>;
    };
    return {
      title: item.title ?? "",
      description: item.description,
      body: typeof item.body === "string" && item.body.trim() ? item.body : undefined,
      links: (item.links ?? [])
        .map((l) => ({ label: l?.label ?? "Open", url: l?.url ?? "" }))
        .filter((l) => l.url),
    };
  });
}

function parseListData(value: unknown) {
  if (!value || typeof value !== "object") return null;
  const v = value as { items?: unknown; groups?: unknown };

  // Grouped form: { groups: [{ heading, items: [...] }] }
  if (Array.isArray(v.groups)) {
    return {
      groups: v.groups.map((g) => {
        const group = g as { heading?: string; items?: unknown };
        return { heading: group.heading ?? "", items: parseListItems(group.items) };
      }),
    };
  }

  // Flat form: { items: [...] }
  if (Array.isArray(v.items)) {
    return { items: parseListItems(v.items) };
  }

  return null;
}

export default async function ResourceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const userTier = (session.user as { tier?: UserTier }).tier ?? "TIER_0";
  if (!hasAdvisoryAccess(userTier)) redirect("/dashboard");

  const resource = await prisma.resource.findUnique({ where: { slug: params.slug } });
  if (!resource || !resource.isPublished) notFound();
  if (!tierMatches(userTier, resource.requiredTier)) notFound();

  const tableData = parseTableData(resource.tableData);
  const listData = parseListData(resource.listData);
  const documentMd = resource.documentMd && resource.documentMd.trim() ? resource.documentMd : null;

  if (!tableData && !listData && !documentMd && resource.url) {
    redirect(resource.url);
  }

  return (
    <div className="max-w-5xl mx-auto pb-8">
      <Link
        href="/advisory/resources"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--hex-text-secondary)] hover:text-[var(--hex-text-primary)] transition-colors mb-4"
      >
        <ArrowLeft size={14} />
        Resources
      </Link>

      <div className="mb-6">
        <div className="flex items-center gap-3 flex-wrap mb-2">
          <h1 className="font-display text-2xl font-bold text-[var(--hex-text-primary)]">
            {resource.title}
          </h1>
          {resource.category && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-hex-dark-600 text-hex-text-secondary">
              {resource.category}
            </span>
          )}
        </div>
        {resource.description && (
          <p className="text-[var(--hex-text-secondary)] text-sm">{resource.description}</p>
        )}
      </div>

      {documentMd && <ResourceDocument markdown={documentMd} />}
      {listData && <ResourceList data={listData} />}
      {tableData && <LessonTable data={tableData} />}
      {!documentMd && !listData && !tableData && (
        <p className="text-[var(--hex-text-muted)] text-sm">No content available.</p>
      )}

      {(documentMd || listData || tableData) && resource.url && (
        <div className="mt-4">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-hex-teal hover:underline"
          >
            Open original sheet <ExternalLink size={14} />
          </a>
        </div>
      )}
    </div>
  );
}
