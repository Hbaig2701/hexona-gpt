"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getRelatedGpts } from "@/lib/gpt-catalog";

interface HandoffChipsProps {
  gptSlug: string;
  clientId?: string;
}

export default function HandoffChips({ gptSlug, clientId }: HandoffChipsProps) {
  const related = getRelatedGpts(gptSlug);
  if (related.length === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap mt-2 mb-1">
      <span className="text-xs text-[var(--hex-text-muted)] flex items-center gap-1">
        Continue with <ArrowRight size={12} />
      </span>
      {related.map((gpt) => {
        const href = clientId
          ? `/clients/${clientId}/gpts/${gpt.slug}`
          : `/gpts/${gpt.slug}`;

        return (
          <Link
            key={gpt.slug}
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
