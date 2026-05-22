import React from "react";

// Match markdown-style [label](url) links (label runs to first ], url runs to first )).
const MD_LINK_REGEX = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
// Match bare http(s) URLs. The character class is permissive on the path but stops
// at whitespace + a few delimiters that should never be inside a URL.
const URL_REGEX = /\bhttps?:\/\/[^\s<>"']+/g;
// Strip these from a bare URL's tail and push them back into the surrounding text
// so things like "Visit https://example.com." don't link the trailing period.
const TRAILING_PUNCT = /[.,;:!?)\]}>'"]+$/;

const LINK_CLASS =
  "text-hex-teal underline underline-offset-2 hover:text-hex-teal/80 break-words";

type Match = { start: number; end: number; url: string; label: string };

/**
 * Split a plain-text string into a mix of text segments and clickable anchor
 * elements. Recognises both markdown-style [label](url) links and bare URLs.
 * Preserves all whitespace in text segments so callers using
 * `whitespace-pre-line` still render newlines.
 */
export function linkifyText(text: string): React.ReactNode[] {
  if (!text) return [];

  // 1) Collect all matches with their bounds + the label to render.
  const matches: Match[] = [];

  MD_LINK_REGEX.lastIndex = 0;
  let md: RegExpExecArray | null;
  while ((md = MD_LINK_REGEX.exec(text)) !== null) {
    matches.push({
      start: md.index,
      end: md.index + md[0].length,
      url: md[2],
      label: md[1],
    });
  }

  URL_REGEX.lastIndex = 0;
  let bare: RegExpExecArray | null;
  while ((bare = URL_REGEX.exec(text)) !== null) {
    const start = bare.index;
    let url = bare[0];
    const fullLen = url.length;
    const trim = url.match(TRAILING_PUNCT);
    if (trim) url = url.slice(0, -trim[0].length);
    const end = start + (fullLen - (trim ? trim[0].length : 0));
    // Skip if this URL is already part of a markdown link match
    if (matches.some((m) => start >= m.start && start < m.end)) continue;
    matches.push({ start, end, url, label: url });
  }

  matches.sort((a, b) => a.start - b.start);

  // 2) Walk the string, slicing text between matches and emitting anchors at each.
  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  let key = 0;
  for (const m of matches) {
    if (m.start > cursor) nodes.push(text.slice(cursor, m.start));
    nodes.push(
      <a
        key={key++}
        href={m.url}
        target="_blank"
        rel="noopener noreferrer"
        className={LINK_CLASS}
      >
        {m.label}
      </a>
    );
    cursor = m.end;
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}
