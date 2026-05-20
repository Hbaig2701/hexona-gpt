"use client";

import Link from "next/link";

// Custom ReactMarkdown components. Internal links (starting with "/") use
// Next.js Link for client-side navigation; external links open in a new tab.
export const markdownComponents = {
  a({ href, children, ...props }: { href?: string; children?: React.ReactNode }) {
    if (href && href.startsWith("/")) {
      return (
        <Link href={href} className="text-hex-teal hover:underline">
          {children}
        </Link>
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

// Defensive autolinker: turn bare /gpts/<slug>, /clients/<id>, etc. into real
// markdown links. Models often write the path as plain text instead of using
// proper [text](url) syntax — this catches those so the path is still clickable.
//
// Skips:
// - Paths already inside markdown link URL portion: ](/gpts/...)
// - Paths inside markdown link text portion: [/gpts/...](...)
// - Paths that are part of a longer URL: example.com/gpts/...
const INTERNAL_PATH_RE = /(?<!\]\()(?<![\[a-zA-Z0-9.])\/(?:gpts|clients|admin|dashboard|settings)\/[a-z0-9_-]+(?:\/[a-z0-9_-]+)*/gi;

export function linkifyInternalPaths(content: string): string {
  return content.replace(INTERNAL_PATH_RE, (match) => `[${match}](${match})`);
}
