"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Check, ChevronDown, Copy, FileText, X } from "lucide-react";
import {
  VAULT_CATEGORIES,
  type VaultIndustry,
} from "@/lib/resource-vault/industries";
import { getWebsitePrompt } from "@/lib/resource-vault/website-prompts";

export default function ResourceVaultApp() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [selected, setSelected] = useState<VaultIndustry | null>(null);
  const [promptView, setPromptView] = useState<VaultIndustry | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setPromptView(null);
        setSelected(null);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function copyPrompt(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const templatesOpen = openSection === "industry-templates";

  return (
    <div
      className="min-h-dvh bg-[#F1EFE9] text-[#161616] antialiased"
      style={{
        backgroundImage: [
          "radial-gradient(60rem 30rem at 50% -8rem, rgba(255,255,255,0.9), transparent)",
          "radial-gradient(rgba(22,22,22,0.045) 1px, transparent 1px)",
        ].join(", "),
        backgroundSize: "auto, 22px 22px",
      }}
    >
      {/* Header */}
      <header>
        <div className="mx-auto w-full max-w-4xl px-5 pb-10 pt-14 sm:px-6">
          <div className="flex items-start gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#161616] shadow-[0_2px_0_rgba(0,0,0,0.25),0_10px_24px_rgba(22,22,22,0.28)]">
              <span className="text-xl font-semibold text-white [font-family:var(--font-vault-display)]">
                H
              </span>
            </div>
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8A8880]">
                Free for Hamza&apos;s GHL Affiliates
              </p>
              <h1 className="text-[2rem] font-semibold leading-tight tracking-tight sm:text-[2.5rem] [font-family:var(--font-vault-display)]">
                Hamza&apos;s Resource Vault
              </h1>
              <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-[#6E6C64]">
                A growing collection of templates, prompts and assets — everything you
                need to launch and sell faster.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Vault sections */}
      <main className="mx-auto w-full max-w-4xl px-5 pb-14 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-black/[0.12] bg-white shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_1px_3px_rgba(22,22,22,0.06),0_16px_40px_-12px_rgba(22,22,22,0.18)]">
          {/* Section: Industry Templates */}
          <button
            onClick={() => setOpenSection(templatesOpen ? null : "industry-templates")}
            className="flex w-full items-center gap-5 px-6 py-5 text-left transition-colors hover:bg-[#FAF8F4] sm:px-8"
          >
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-semibold tracking-tight text-[#161616]">
                Industry Templates
                <span className="ml-2 font-normal text-[#8A8880]">
                  — Snapshots, Websites, Prompts
                </span>
              </p>
            </div>
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                templatesOpen
                  ? "rotate-180 border-black/20 bg-[#161616] text-white"
                  : "border-black/15 bg-white text-[#6E6C64] shadow-[0_1px_2px_rgba(22,22,22,0.08)]"
              }`}
            >
              <ChevronDown size={15} strokeWidth={2} />
            </div>
          </button>

          {templatesOpen && (
            <div className="border-t border-black/[0.09] bg-[#F6F4EF] px-6 pb-9 shadow-[0_2px_6px_rgba(22,22,22,0.05)_inset] sm:px-8">
              {VAULT_CATEGORIES.map((cat) => (
                <div key={cat.heading} className="mt-8">
                  <div className="mb-4 flex items-baseline gap-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#75736B]">
                      {cat.heading}
                    </p>
                    <div className="h-px flex-1 bg-black/[0.09]" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {cat.items.map((ind) => (
                      <button
                        key={ind.name}
                        onClick={() => setSelected(ind)}
                        className="group flex min-h-[108px] flex-col items-center justify-center gap-2.5 rounded-xl border border-black/[0.10] bg-white px-3 py-4 text-center shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_1px_2px_rgba(22,22,22,0.05),0_3px_8px_-2px_rgba(22,22,22,0.08)] transition-all duration-150 hover:-translate-y-1 hover:border-black/25 hover:shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_2px_4px_rgba(22,22,22,0.06),0_12px_24px_-6px_rgba(22,22,22,0.18)]"
                      >
                        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-black/[0.08] bg-[#F6F4EF] text-[22px] leading-none shadow-[0_1px_2px_rgba(22,22,22,0.05)_inset] transition-colors group-hover:bg-[#F1EFE9]">
                          {ind.emoji}
                        </span>
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
          <div className="border-t border-black/[0.09] bg-white px-6 py-4 sm:px-8">
            <p className="text-[13px] text-[#B4B2AA]">More sections coming soon</p>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-md text-center text-[11px] leading-relaxed text-[#A5A39B]">
          An independent resource collection for HighLevel users — not affiliated with or
          endorsed by HighLevel Inc. Some links are affiliate or referral links.
        </p>
      </main>

      {/* Industry popup */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#161616]/40 p-4 backdrop-blur-[3px]"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-sm rounded-2xl border border-black/[0.12] bg-white p-7 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_10px_20px_rgba(22,22,22,0.12),0_32px_80px_-12px_rgba(22,22,22,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white text-[#8A8880] shadow-[0_1px_2px_rgba(22,22,22,0.08)] transition-colors hover:border-black/25 hover:text-[#161616]"
            >
              <X size={14} strokeWidth={2} />
            </button>

            <div className="flex flex-col items-center pt-2 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-black/[0.08] bg-[#F6F4EF] text-[30px] leading-none shadow-[0_2px_4px_rgba(22,22,22,0.06)_inset]">
                {selected.emoji}
              </span>
              <h2 className="mt-4 text-xl font-semibold leading-snug tracking-tight [font-family:var(--font-vault-display)]">
                {selected.name}
              </h2>
            </div>

            <div className="mt-7 space-y-2.5">
              <a
                href={selected.snapshotUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl bg-[#161616] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_2px_0_rgba(0,0,0,0.3),0_8px_20px_-4px_rgba(22,22,22,0.4)] transition-all hover:-translate-y-px hover:bg-black"
              >
                Snapshot Link <ArrowUpRight size={16} strokeWidth={2} />
              </a>
              {getWebsitePrompt(selected.name) ? (
                <button
                  onClick={() => {
                    setPromptView(selected);
                    setCopied(false);
                  }}
                  className="flex w-full items-center justify-between rounded-xl border border-black/15 bg-white px-5 py-3.5 text-sm font-semibold text-[#161616] shadow-[0_1px_2px_rgba(22,22,22,0.06)] transition-all hover:-translate-y-px hover:border-black/30"
                >
                  Website Prompt <FileText size={16} strokeWidth={2} />
                </button>
              ) : (
                <div className="flex items-center justify-between rounded-xl border border-dashed border-black/15 bg-[#FAF8F4] px-5 py-3.5 text-sm text-[#A5A39B]">
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

      {/* Website prompt viewer */}
      {promptView && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#161616]/45 p-4 backdrop-blur-[3px]"
          onClick={() => setPromptView(null)}
        >
          <div
            className="flex max-h-[85dvh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-black/[0.12] bg-white shadow-[0_10px_20px_rgba(22,22,22,0.12),0_32px_80px_-12px_rgba(22,22,22,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-black/[0.08] px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl leading-none">{promptView.emoji}</span>
                <div>
                  <h2 className="text-base font-semibold leading-tight tracking-tight [font-family:var(--font-vault-display)]">
                    {promptView.name}
                  </h2>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#A5A39B]">
                    Website Prompt
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPromptView(null)}
                aria-label="Close"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-[#8A8880] shadow-[0_1px_2px_rgba(22,22,22,0.08)] transition-colors hover:border-black/25 hover:text-[#161616]"
              >
                <X size={14} strokeWidth={2} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-[#FCFBF9] px-6 py-5">
              <pre className="whitespace-pre-wrap text-[13px] leading-relaxed text-[#3A3934] [font-family:inherit]">
                {getWebsitePrompt(promptView.name)}
              </pre>
            </div>

            <div className="border-t border-black/[0.08] bg-white px-6 py-4">
              <button
                onClick={() => copyPrompt(getWebsitePrompt(promptView.name) ?? "")}
                className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition-all ${
                  copied
                    ? "bg-[#1D7A46] text-white"
                    : "bg-[#161616] text-white shadow-[0_2px_0_rgba(0,0,0,0.3),0_8px_20px_-4px_rgba(22,22,22,0.4)] hover:-translate-y-px hover:bg-black"
                }`}
              >
                {copied ? (
                  <>
                    <Check size={16} strokeWidth={2.5} /> Copied to clipboard
                  </>
                ) : (
                  <>
                    <Copy size={16} strokeWidth={2} /> Copy Prompt
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
