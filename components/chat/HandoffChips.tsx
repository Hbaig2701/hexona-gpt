"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getGptBySlug } from "@/lib/gpt-catalog";

interface HandoffChipsProps {
  gptSlug: string;
  clientId?: string;
  messageContent: string;
}

// Match /gpts/<slug> paths in assistant message content. Same regex shape used
// by linkifyInternalPaths so behavior is consistent. Returns unique slugs in
// the order they appear.
function extractReferencedSlugs(content: string, currentSlug: string): string[] {
  const re = /\/gpts\/([a-z0-9_-]+)/gi;
  const seen = new Set<string>();
  const slugs: string[] = [];
  let match;
  while ((match = re.exec(content)) !== null) {
    const slug = match[1].toLowerCase();
    if (slug === currentSlug) continue; // don't suggest self
    if (seen.has(slug)) continue;
    if (!getGptBySlug(slug)) continue; // skip unknown slugs
    seen.add(slug);
    slugs.push(slug);
  }
  return slugs;
}

export default function HandoffChips({ gptSlug, clientId, messageContent }: HandoffChipsProps) {
  const slugs = extractReferencedSlugs(messageContent, gptSlug);
  if (slugs.length === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap mt-2 mb-1">
      <span className="text-xs text-[var(--hex-text-muted)] flex items-center gap-1">
        Continue with <ArrowRight size={12} />
      </span>
      {slugs.map((slug) => {
        const gpt = getGptBySlug(slug)!;
        const href = clientId
          ? `/clients/${clientId}/gpts/${slug}`
          : `/gpts/${slug}`;

        return (
          <Link
            key={slug}
            href={href}
            className="px-3 py-1 rounded-full text-xs border border-[var(--hex-dark-500)] text-[var(--hex-text-secondary)] hover:border-hex-teal hover:text-hex-teal transition-colors"
          >
            {gpt.name}
          </Link>
        );
      })}
    </div>
  );
}
