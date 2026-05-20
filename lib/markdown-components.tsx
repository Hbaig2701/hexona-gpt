"use client";

import Link from "next/link";

// Custom ReactMarkdown components. Link rendering:
// - Internal app paths (starting with "/") use Next.js Link for client-side nav
// - mailto:, tel:, and in-page anchors (#...) render as plain <a> (no new tab)
// - Everything else (http/https) opens in a new tab
export const markdownComponents = {
  a({ href, children, ...props }: { href?: string; children?: React.ReactNode }) {
    if (!href) return <a {...props}>{children}</a>;
    if (href.startsWith("/")) {
      return (
        <Link href={href} className="text-hex-teal hover:underline">
          {children}
        </Link>
      );
    }
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return (
        <a href={href} className="text-hex-teal hover:underline" {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-hex-teal hover:underline"
        {...props}
      >
        {children}
      </a>
    );
  },
};

// Defensive autolinker: turn bare /advisors/<slug>, /clients/<id>, etc. into
// real markdown links. Models often write the path as plain text instead of
// using proper [text](url) syntax — this catches those so the path is still
// clickable.
//
// Includes legacy /gpts/<slug> so older assistant responses still linkify
// (those URLs 308-redirect to /advisors/<slug> at request time).
//
// Skips:
// - Paths already inside markdown link URL portion: ](/advisors/...)
// - Paths inside markdown link text portion: [/advisors/...](...)
// - Paths that are part of a longer URL: example.com/advisors/...
// - Paths inside backtick code spans or fenced code blocks (preserved as code)
const INTERNAL_PATH_RE = /(?<!\]\()(?<![\[a-zA-Z0-9.])\/(?:advisors|gpts|clients|admin|dashboard|settings)\/[a-z0-9_-]+(?:\/[a-z0-9_-]+)*/gi;

// Splits content into alternating prose and code spans (single backtick or
// fenced triple backtick). Odd-indexed parts are code and must be left alone.
const CODE_SPAN_RE = /(```[\s\S]*?```|`[^`\n]+`)/g;

export function linkifyInternalPaths(content: string): string {
  const parts = content.split(CODE_SPAN_RE);
  return parts
    .map((part, i) => {
      if (i % 2 === 1) return part; // code span, leave alone
      return part.replace(INTERNAL_PATH_RE, (match) => `[${match}](${match})`);
    })
    .join("");
}
