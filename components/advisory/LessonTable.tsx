"use client";

import { useMemo, useState } from "react";
import { Search, ArrowUpDown, ArrowDown, ArrowUp } from "lucide-react";

export type TableData = {
  headers: string[];
  rows: string[][];
};

interface Props {
  data: TableData;
}

type SortDir = "asc" | "desc" | null;

const SATURATION_STYLES: Record<string, string> = {
  low: "bg-hex-success/15 text-hex-success",
  medium: "bg-hex-warning/15 text-hex-warning",
  high: "bg-hex-error/15 text-hex-error",
};

function isCurrency(value: string): boolean {
  return /^\$/.test(value.trim());
}

function isNumericLike(value: string): boolean {
  return /^[\$]?[\d,.]+$/.test(value.trim());
}

function parseNumber(value: string): number {
  const cleaned = value.replace(/[^0-9.\-]/g, "");
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : Number.NEGATIVE_INFINITY;
}

function isSaturationHeader(header: string): boolean {
  return /saturation/i.test(header);
}

function isYesNoHeader(header: string): boolean {
  return /findable|linkedin|on linkedin|available|yes\/no/i.test(header);
}

function compactNumber(n: number): string {
  if (!Number.isFinite(n)) return "";
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
  if (abs >= 1_000) {
    const k = n / 1_000;
    return `${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}K`;
  }
  return n.toLocaleString();
}

function formatCell(raw: string, opts: { numeric: boolean; currency: boolean }): string {
  if (!opts.numeric) return raw;
  const n = parseNumber(raw);
  if (!Number.isFinite(n)) return raw;
  const compact = compactNumber(n);
  return opts.currency ? `$${compact}` : compact;
}

export default function LessonTable({ data }: Props) {
  const [query, setQuery] = useState("");
  const [sortIdx, setSortIdx] = useState<number | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);

  const columnTypes = useMemo(
    () =>
      data.headers.map((h, i) => {
        const sample = data.rows.slice(0, 5).map((r) => r[i] ?? "");
        const allNumericLike =
          sample.length > 0 && sample.every((v) => v === "" || isNumericLike(v));
        const anyCurrency = sample.some((v) => isCurrency(v));
        return {
          header: h,
          numeric: allNumericLike,
          currency: anyCurrency,
          saturation: isSaturationHeader(h),
          yesNo: isYesNoHeader(h),
        };
      }),
    [data]
  );

  const filteredSorted = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = q
      ? data.rows.filter((row) => row.some((cell) => cell.toLowerCase().includes(q)))
      : [...data.rows];

    if (sortIdx !== null && sortDir) {
      const col = columnTypes[sortIdx];
      rows.sort((a, b) => {
        const av = a[sortIdx] ?? "";
        const bv = b[sortIdx] ?? "";
        if (col?.numeric) {
          const an = parseNumber(av);
          const bn = parseNumber(bv);
          return sortDir === "asc" ? an - bn : bn - an;
        }
        return sortDir === "asc"
          ? av.localeCompare(bv, undefined, { numeric: true })
          : bv.localeCompare(av, undefined, { numeric: true });
      });
    }
    return rows;
  }, [data.rows, query, sortIdx, sortDir, columnTypes]);

  function toggleSort(idx: number) {
    if (sortIdx !== idx) {
      setSortIdx(idx);
      setSortDir("asc");
      return;
    }
    if (sortDir === "asc") setSortDir("desc");
    else if (sortDir === "desc") {
      setSortIdx(null);
      setSortDir(null);
    } else setSortDir("asc");
  }

  return (
    <div className="rounded-xl bg-hex-dark-800 border border-hex-dark-500 overflow-hidden">
      <div className="px-3 py-2 border-b border-hex-dark-500 bg-hex-dark-700/40">
        <div className="relative max-w-xs">
          <Search
            size={13}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-hex-text-muted pointer-events-none"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            className="w-full pl-8 pr-2 py-1 bg-hex-dark-600 border border-hex-dark-500 rounded text-xs text-hex-text-primary placeholder:text-hex-text-muted focus:outline-none focus:border-hex-teal"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-hex-dark-700/40 border-b border-hex-dark-500 text-left">
            <tr>
              {data.headers.map((h, i) => {
                const isSorted = sortIdx === i;
                const SortIcon =
                  isSorted && sortDir === "asc"
                    ? ArrowUp
                    : isSorted && sortDir === "desc"
                    ? ArrowDown
                    : ArrowUpDown;
                const col = columnTypes[i];
                return (
                  <th
                    key={i}
                    className={`px-2 py-1.5 font-semibold text-[10px] uppercase tracking-wider text-hex-text-secondary align-bottom ${
                      col?.numeric ? "text-right" : ""
                    }`}
                  >
                    <button
                      onClick={() => toggleSort(i)}
                      className={`inline-flex items-baseline gap-1 hover:text-hex-text-primary transition-colors leading-tight text-left ${
                        isSorted ? "text-hex-teal" : ""
                      }`}
                    >
                      <span className="whitespace-pre-line">{h}</span>
                      <SortIcon size={10} className="opacity-60 shrink-0 translate-y-0.5" />
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-hex-dark-500/40">
            {filteredSorted.map((row, ri) => (
              <tr key={ri} className="hover:bg-hex-dark-700/30 transition-colors">
                {row.map((cell, ci) => {
                  const col = columnTypes[ci];
                  if (col?.saturation) {
                    const k = cell.toLowerCase().trim();
                    const cls = SATURATION_STYLES[k] ?? "bg-hex-dark-600 text-hex-text-secondary";
                    return (
                      <td key={ci} className="px-2 py-1.5">
                        <span className={`inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium rounded ${cls}`}>
                          {cell}
                        </span>
                      </td>
                    );
                  }
                  if (col?.yesNo) {
                    return (
                      <td key={ci} className="px-2 py-1.5 text-hex-text-secondary text-[11px] whitespace-nowrap">
                        {cell}
                      </td>
                    );
                  }
                  if (col?.numeric) {
                    return (
                      <td
                        key={ci}
                        className="px-2 py-1.5 text-right text-hex-text-primary font-mono text-[11px] tabular-nums whitespace-nowrap"
                      >
                        {formatCell(cell, { numeric: true, currency: col.currency })}
                      </td>
                    );
                  }
                  return (
                    <td
                      key={ci}
                      className={`px-2 py-1.5 text-hex-text-primary leading-snug ${
                        ci === 0 ? "font-medium" : ""
                      }`}
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
            {filteredSorted.length === 0 && (
              <tr>
                <td
                  colSpan={data.headers.length}
                  className="px-3 py-8 text-center text-hex-text-muted text-xs"
                >
                  No matches for &quot;{query}&quot;.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
