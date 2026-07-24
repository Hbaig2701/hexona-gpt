"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ExternalLink, Layers, Vault, X } from "lucide-react";
import {
  VAULT_CATEGORIES,
  VAULT_INDUSTRY_COUNT,
  type VaultIndustry,
} from "@/lib/resource-vault/industries";

const GOLD = "#F0B429";

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
    <div
      className="min-h-dvh bg-[#0A1428] text-[#C6D2E8]"
      style={{
        backgroundImage: [
          "radial-gradient(52rem 36rem at 85% -10%, rgba(240,180,41,0.10), transparent)",
          "radial-gradient(44rem 32rem at -5% 105%, rgba(78,143,224,0.09), transparent)",
        ].join(", "),
      }}
    >
      {/* Header */}
      <header className="border-b border-white/[0.06]">
        <div className="mx-auto flex w-full max-w-4xl items-center gap-3 px-4 py-5 sm:px-6">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl border"
            style={{ borderColor: `${GOLD}55`, background: `${GOLD}14` }}
          >
            <Vault size={20} style={{ color: GOLD }} />
          </div>
          <div className="leading-tight">
            <h1 className="text-xl font-bold text-white [font-family:var(--font-ghl-display)]">
              Hamza&apos;s Resource Vault
            </h1>
            <p className="text-xs text-white/40">
              Free templates, prompts &amp; assets for agency owners
            </p>
          </div>
        </div>
      </header>

      {/* Vault sections */}
      <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
          {/* Section: Industry Templates */}
          <button
            onClick={() => setOpenSection(templatesOpen ? null : "industry-templates")}
            className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-white/[0.04]"
          >
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
              style={{ borderColor: `${GOLD}44`, background: `${GOLD}10` }}
            >
              <Layers size={17} style={{ color: GOLD }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold tracking-wide text-white [font-family:var(--font-ghl-display)]">
                INDUSTRY TEMPLATES (Snapshots, Websites, Prompts)
              </p>
              <p className="mt-0.5 text-xs text-white/40">
                {VAULT_INDUSTRY_COUNT} industries — snapshot + website prompt for each
              </p>
            </div>
            <ChevronDown
              size={18}
              className={`shrink-0 text-white/40 transition-transform ${
                templatesOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {templatesOpen && (
            <div className="border-t border-white/[0.06] px-5 pb-6">
              {VAULT_CATEGORIES.map((cat) => (
                <div key={cat.heading} className="mt-6">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/35">
                    {cat.heading}
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                    {cat.items.map((ind) => (
                      <button
                        key={ind.name}
                        onClick={() => setSelected(ind)}
                        className="group flex flex-col items-start gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3 text-left transition hover:border-[#F0B429]/50 hover:bg-white/[0.06]"
                      >
                        <span className="text-2xl leading-none">{ind.emoji}</span>
                        <span className="text-xs font-medium leading-snug text-white/75 group-hover:text-white">
                          {ind.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Future sections placeholder */}
          <div className="border-t border-white/[0.06] px-5 py-4">
            <p className="text-xs italic text-white/25">More sections coming soon.</p>
          </div>
        </div>

        <p className="mt-6 text-center text-[10px] leading-relaxed text-white/25">
          An independent resource collection for HighLevel users — not affiliated with or
          endorsed by HighLevel Inc. Some links are affiliate or referral links.
        </p>
      </main>

      {/* Industry popup */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0D1B36] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl leading-none">{selected.emoji}</span>
                <h2 className="text-lg font-bold leading-tight text-white [font-family:var(--font-ghl-display)]">
                  {selected.name}
                </h2>
              </div>
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="rounded-lg p-1.5 text-white/40 transition hover:bg-white/10 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-5 space-y-2.5">
              <a
                href={selected.snapshotUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-[#0A1428] transition hover:brightness-110"
                style={{ background: GOLD }}
              >
                Snapshot Link <ExternalLink size={15} />
              </a>
              {selected.websitePromptUrl ? (
                <a
                  href={selected.websitePromptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/15 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Website Prompt <ExternalLink size={15} />
                </a>
              ) : (
                <div className="flex items-center justify-between rounded-xl border border-dashed border-white/15 px-4 py-3 text-sm text-white/35">
                  Website Prompt <span className="text-[10px] uppercase tracking-wider">Coming soon</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
