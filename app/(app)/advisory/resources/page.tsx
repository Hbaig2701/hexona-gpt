import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { ExternalLink, List as ListIcon, Table as TableIcon, FileText, ChevronRight } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { hasAdvisoryAccess } from "@/lib/advisory";
import Card from "@/components/ui/Card";
import type { UserTier } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function ResourcesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const userTier = (session.user as { tier?: UserTier }).tier ?? "TIER_0";
  if (!hasAdvisoryAccess(userTier)) redirect("/dashboard");

  const resources = await prisma.resource.findMany({
    where: { isPublished: true, requiredTier: userTier },
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });

  const grouped = resources.reduce<Record<string, typeof resources>>((acc, r) => {
    const key = r.category ?? "Other";
    (acc[key] ||= []).push(r);
    return acc;
  }, {});

  return (
    <div className="max-w-3xl mx-auto pb-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-[var(--hex-text-primary)]">Resources</h1>
        <p className="text-[var(--hex-text-secondary)] mt-2 text-sm">
          Templates, samples, flowcharts &amp; guides for your tier.
        </p>
      </div>

      {resources.length === 0 ? (
        <Card hoverable={false} className="text-center py-10">
          <p className="text-[var(--hex-text-muted)] text-sm">No resources for your tier yet.</p>
        </Card>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--hex-text-muted)] mb-3">
                {category}
              </p>
              <div className="space-y-2">
                {items.map((r) => {
                  const hasUrl = r.url && r.url.length > 0;
                  const hasList = !!r.listData;
                  const hasTable = !!r.tableData;
                  const hasDoc = !!r.documentMd && r.documentMd.trim().length > 0;
                  const inline = hasList || hasTable || hasDoc;
                  const Icon = hasDoc
                    ? FileText
                    : hasList
                    ? ListIcon
                    : hasTable
                    ? TableIcon
                    : ExternalLink;

                  const row = (
                    <Card className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-hex-teal/10 flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-hex-teal" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[var(--hex-text-primary)] font-medium text-sm">
                          {r.title}
                        </p>
                        {r.description && (
                          <p className="text-xs text-[var(--hex-text-muted)] line-clamp-1 mt-0.5">
                            {r.description}
                          </p>
                        )}
                        {!hasUrl && !inline && (
                          <p className="text-xs text-hex-warning mt-1">Coming soon</p>
                        )}
                      </div>
                      {inline ? (
                        <ChevronRight size={16} className="text-[var(--hex-text-muted)] shrink-0" />
                      ) : hasUrl ? (
                        <ExternalLink size={15} className="text-[var(--hex-text-muted)] shrink-0" />
                      ) : null}
                    </Card>
                  );

                  // Inline (list / table / document) → in-app detail page
                  if (inline) {
                    return (
                      <Link key={r.id} href={`/advisory/resources/${r.slug}`} className="block">
                        {row}
                      </Link>
                    );
                  }
                  // External link → open in new tab
                  if (hasUrl) {
                    return (
                      <a key={r.id} href={r.url} target="_blank" rel="noopener noreferrer" className="block">
                        {row}
                      </a>
                    );
                  }
                  // Placeholder (no content yet)
                  return (
                    <div key={r.id} className="opacity-60 cursor-not-allowed">
                      {row}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
