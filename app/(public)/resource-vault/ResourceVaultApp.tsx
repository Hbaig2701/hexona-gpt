"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown, X } from "lucide-react";
import {
  VAULT_CATEGORIES,
  VAULT_INDUSTRY_COUNT,
  type VaultIndustry,
} from "@/lib/resource-vault/industries";

export default function ResourceVaultApp() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [selected, setSelected] = useState<VaultIndustry | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelected(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const templatesOpen = openSection === "industry-templates";

  return (
    <div className="min-h-dvh bg-[#FAF9F6] text-[#161616] antialiased">
      {/* Header */}
      <header className="border-b border-black/[0.07] bg-[#FAF9F6]">
        <div className="mx-auto w-full max-w-4xl px-5 pb-8 pt-12 sm:px-6">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8A8880]">
            Free for agency owners
          </p>
          <h1 className="text-[2rem] font-semibold leading-tight tracking-tight sm:text-[2.5rem] [font-family:var(--font-vault-display)]">
            Hamza&apos;s Resource Vault
          </h1>
          <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-[#6E6C64]">
            A growing collection of templates, prompts and assets — everything you need
            to launch and sell faster.
          </p>
        </div>
      </header>

      {/* Vault sections */}
      <main className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          {/* Section: Industry Templates */}
          <button
            onClick={() => setOpenSection(templatesOpen ? null : "industry-templates")}
            className="flex w-full items-center gap-5 px-6 py-5 text-left transition-colors hover:bg-black/[0.02] sm:px-8"
          >
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-semibold tracking-tight text-[#161616]">
                Industry Templates
                <span className="ml-2 font-normal text-[#8A8880]">
                  — Snapshots, Websites, Prompts
                </span>
              </p>
              <p className="mt-1 text-[13px] text-[#8A8880]">
                {VAULT_INDUSTRY_COUNT} industries, each with a ready-to-import snapshot
              </p>
            </div>
            <ChevronDown
              size={18}
              strokeWidth={1.75}
              className={`shrink-0 text-[#8A8880] transition-transform duration-200 ${
                templatesOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {templatesOpen && (
            <div className="border-t border-black/[0.06] bg-[#FCFBF9] px-6 pb-8 sm:px-8">
              {VAULT_CATEGORIES.map((cat) => (
                <div key={cat.heading} className="mt-8">
                  <div className="mb-3.5 flex items-baseline gap-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A8880]">
                      {cat.heading}
                    </p>
                    <div className="h-px flex-1 bg-black/[0.06]" />
                  </div>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
                    {cat.items.map((ind) => (
                      <button
                        key={ind.name}
                        onClick={() => setSelected(ind)}
                        className="flex min-h-[104px] flex-col items-center justify-center gap-2.5 rounded-xl border border-black/[0.07] bg-white px-3 py-4 text-center transition-all duration-150 hover:-translate-y-0.5 hover:border-black/20 hover:shadow-[0_4px_14px_rgba(0,0,0,0.06)]"
                      >
                        <span className="text-[26px] leading-none">{ind.emoji}</span>
                        <span className="text-[12.5px] font-medium leading-snug text-[#3A3934]">
                          {ind.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Future sections */}
          <div className="border-t border-black/[0.06] px-6 py-4 sm:px-8">
            <p className="text-[13px] text-[#B4B2AA]">More sections coming soon</p>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-md text-center text-[11px] leading-relaxed text-[#B4B2AA]">
          An independent resource collection for HighLevel users — not affiliated with or
          endorsed by HighLevel Inc. Some links are affiliate or referral links.
        </p>
      </main>

      {/* Industry popup */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#161616]/30 p-4 backdrop-blur-[2px]"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-black/[0.08] bg-white p-7 shadow-[0_24px_60px_rgba(0,0,0,0.18)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute-none float-right -mr-2 -mt-2 rounded-lg p-2 text-[#B4B2AA] transition-colors hover:bg-black/[0.05] hover:text-[#161616]"
            >
              <X size={16} strokeWidth={1.75} />
            </button>

            <div className="flex flex-col items-center pt-1 text-center">
              <span className="text-4xl leading-none">{selected.emoji}</span>
              <h2 className="mt-4 text-xl font-semibold leading-snug tracking-tight [font-family:var(--font-vault-display)]">
                {selected.name}
              </h2>
            </div>

            <div className="mt-7 space-y-2.5">
              <a
                href={selected.snapshotUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl bg-[#161616] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-black"
              >
                Snapshot Link <ArrowUpRight size={16} strokeWidth={2} />
              </a>
              {selected.websitePromptUrl ? (
                <a
                  href={selected.websitePromptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-black/15 bg-white px-5 py-3.5 text-sm font-semibold text-[#161616] transition-colors hover:bg-black/[0.03]"
                >
                  Website Prompt <ArrowUpRight size={16} strokeWidth={2} />
                </a>
              ) : (
                <div className="flex items-center justify-between rounded-xl border border-dashed border-black/15 px-5 py-3.5 text-sm text-[#B4B2AA]">
                  Website Prompt
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em]">
                    Coming soon
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
