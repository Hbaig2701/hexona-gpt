"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink, Copy, Check } from "lucide-react";

export type ResourceListData = {
  items: Array<{
    title: string;
    description?: string;
    links: Array<{ label: string; url: string }>;
  }>;
};

interface Props {
  data: ResourceListData;
}

export default function ResourceList({ data }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  async function copyLink(key: string, url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1500);
    } catch {
      // clipboard unavailable — silently ignore
    }
  }

  return (
    <div className="rounded-xl bg-hex-dark-800 border border-hex-dark-500 divide-y divide-hex-dark-500/60 overflow-hidden">
      {data.items.map((item, i) => {
        const open = openIdx === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpenIdx(open ? null : i)}
              className="w-full px-5 py-3 flex items-center gap-3 hover:bg-hex-dark-700/40 transition-colors text-left"
            >
              <motion.div
                animate={{ rotate: open ? 0 : -90 }}
                transition={{ duration: 0.15 }}
                className="text-hex-text-muted shrink-0"
              >
                <ChevronDown size={16} />
              </motion.div>
              <p className="flex-1 font-medium text-hex-text-primary text-sm">
                {item.title}
              </p>
              {!open && item.links.length > 0 && (
                <span className="text-xs text-hex-text-muted">
                  {item.links.length} link{item.links.length !== 1 ? "s" : ""}
                </span>
              )}
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 pl-12 space-y-3 bg-hex-dark-700/20">
                    {item.description && (
                      <p className="text-sm text-hex-text-secondary leading-relaxed">
                        {item.description}
                      </p>
                    )}
                    {item.links.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.links.map((link, j) => {
                          const key = `${i}-${j}`;
                          const copied = copiedKey === key;
                          return (
                            <div key={j} className="inline-flex items-stretch rounded-md border border-hex-dark-500 overflow-hidden">
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-hex-dark-600 text-hex-text-primary text-xs font-medium hover:bg-hex-dark-500 hover:text-hex-teal transition-colors"
                              >
                                {link.label}
                                <ExternalLink size={12} />
                              </a>
                              <button
                                type="button"
                                onClick={() => copyLink(key, link.url)}
                                className={`px-2.5 py-1.5 text-xs font-medium border-l border-hex-dark-500 transition-colors ${
                                  copied
                                    ? "bg-hex-success/15 text-hex-success"
                                    : "bg-hex-dark-700 text-hex-text-muted hover:text-hex-text-primary"
                                }`}
                                title="Copy link"
                                aria-label="Copy link"
                              >
                                {copied ? <Check size={12} /> : <Copy size={12} />}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
