import React from "react";

// Match http(s) URLs. The character class is permissive on the path but stops
// at whitespace + a few delimiters that should never be inside a URL.
const URL_REGEX = /\bhttps?:\/\/[^\s<>"']+/g;
// Strip these from the URL's tail and push them back into the surrounding text
// so things like "Visit https://example.com." don't link the trailing period.
const TRAILING_PUNCT = /[.,;:!?)\]}>'"]+$/;

/**
 * Split a plain-text string into a mix of text segments and clickable anchor
 * elements for any http/https URLs found. Preserves all whitespace in text
 * segments so callers using `whitespace-pre-line` still render newlines.
 */
export function linkifyText(text: string): React.ReactNode[] {
  if (!text) return [];
  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  let key = 0;

  URL_REGEX.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = URL_REGEX.exec(text)) !== null) {
    const start = match.index;
    let url = match[0];
    const fullLen = url.length;
    const trim = url.match(TRAILING_PUNCT);
    if (trim) url = url.slice(0, -trim[0].length);

    if (start > cursor) {
      nodes.push(text.slice(cursor, start));
    }
    nodes.push(
      <a
        key={key++}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-hex-teal underline underline-offset-2 hover:text-hex-teal/80 break-all"
      >
        {url}
      </a>
    );
    cursor = start + (fullLen - (trim ? trim[0].length : 0));
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes;
}
