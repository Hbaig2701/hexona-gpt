"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  Copy,
  FileText,
  Lock,
  Video,
  X,
} from "lucide-react";
import {
  VAULT_CATEGORIES,
  type VaultIndustry,
} from "@/lib/resource-vault/industries";
import { getWebsitePrompt } from "@/lib/resource-vault/website-prompts";
import {
  AI_PROMPT_GROUPS,
  BUSINESS_GROUPS,
  COACHING_GROUPS,
  COLD_CALL_GROUPS,
  COLD_CALL_INTRO,
  FUNNEL_SNAPSHOTS,
  GUIDE_GROUPS,
  LICENSEE_AUTOMATIONS,
  LIVE_CALLS,
  SUPPORT_GROUPS,
  type VaultCall,
  type VaultLink,
  type VaultLinkGroup,
} from "@/lib/resource-vault/sections";

const CARD_SHADOW =
  "shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_1px_2px_rgba(22,22,22,0.05),0_3px_8px_-2px_rgba(22,22,22,0.08)]";
const CARD_HOVER =
  "hover:-translate-y-0.5 hover:border-black/25 hover:shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_2px_4px_rgba(22,22,22,0.06),0_12px_24px_-6px_rgba(22,22,22,0.18)]";

/** One resource row. Without a url it renders as a dashed "Adding soon" row. */
function LinkRow({ link }: { link: VaultLink }) {
  const body = (
    <>
      <span className="min-w-0">
        <span className="block text-[14px] font-medium text-[#3A3934]">{link.title}</span>
        {link.note && (
          <span className="mt-0.5 block text-[12px] leading-snug text-[#8A8880]">
            {link.note}
          </span>
        )}
      </span>
      {link.url ? (
        <ArrowUpRight size={16} strokeWidth={2} className="shrink-0 text-[#8A8880]" />
      ) : (
        <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#A5A39B]">
          Adding soon
        </span>
      )}
    </>
  );

  if (!link.url) {
    return (
      <div className="flex items-center justify-between gap-4 rounded-xl border border-dashed border-black/15 bg-[#FAF8F4] px-5 py-4 text-[#A5A39B]">
        {body}
      </div>
    );
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-between gap-4 rounded-xl border border-black/[0.10] bg-white px-5 py-4 transition-all duration-150 ${CARD_SHADOW} ${CARD_HOVER}`}
    >
      {body}
    </a>
  );
}

/** Small-caps label with a rule running to the end of the row. */
function GroupHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-baseline gap-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#75736B]">
        {children}
      </p>
      <div className="h-px flex-1 bg-black/[0.09]" />
    </div>
  );
}

/** Grouped rows with optional small-caps headings, for a section body. */
function LinkGroups({ groups }: { groups: VaultLinkGroup[] }) {
  return (
    <>
      {groups.map((group, i) => (
        <div key={group.heading ?? i} className={i === 0 ? "" : "mt-7"}>
          {group.heading && <GroupHeading>{group.heading}</GroupHeading>}
          <div className="space-y-2.5">
            {group.links.map((link) => (
              <LinkRow key={link.title} link={link} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

/** A recurring live call: standing time, a join button and an RSVP button. */
function CallCard({ call }: { call: VaultCall }) {
  return (
    <div className={`rounded-xl border border-black/[0.10] bg-white px-5 py-4 ${CARD_SHADOW}`}>
      <p className="text-[14px] font-semibold text-[#3A3934]">{call.title}</p>
      <p className="mt-1.5 flex items-center gap-1.5 text-[12px] font-medium text-[#6E6C64]">
        <CalendarDays size={13} strokeWidth={2} className="shrink-0 text-[#8A8880]" />
        {call.cadence}
      </p>
      {call.note && (
        <p className="mt-1 text-[12px] leading-snug text-[#A5A39B]">{call.note}</p>
      )}
      <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
        <a
          href={call.joinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#161616] px-4 py-3 text-[13px] font-semibold text-white shadow-[0_2px_0_rgba(0,0,0,0.3),0_8px_20px_-4px_rgba(22,22,22,0.4)] transition-all hover:-translate-y-px hover:bg-black"
        >
          <Video size={15} strokeWidth={2} /> Join Call
        </a>
        <a
          href={call.rsvpUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-black/15 bg-white px-4 py-3 text-[13px] font-semibold text-[#161616] shadow-[0_1px_2px_rgba(22,22,22,0.06)] transition-all hover:-translate-y-px hover:border-black/30"
        >
          {call.rsvpLabel} <ArrowUpRight size={15} strokeWidth={2} />
        </a>
      </div>
    </div>
  );
}

/** Collapsible top-level folder header. */
function SectionButton({
  title,
  blurb,
  open,
  first,
  onClick,
}: {
  title: string;
  blurb: string;
  open: boolean;
  first?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-5 px-6 py-5 text-left transition-colors hover:bg-[#FAF8F4] sm:px-8 ${
        first ? "" : "border-t border-black/[0.09]"
      }`}
    >
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-semibold tracking-tight text-[#161616]">
          {title}
          <span className="ml-2 font-normal text-[#8A8880]">· {blurb}</span>
        </p>
      </div>
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
          open
            ? "rotate-180 border-black/20 bg-[#161616] text-white"
            : "border-black/15 bg-white text-[#6E6C64] shadow-[0_1px_2px_rgba(22,22,22,0.08)]"
        }`}
      >
        <ChevronDown size={15} strokeWidth={2} />
      </div>
    </button>
  );
}

/** Tinted body panel revealed under an open section header. */
function SectionBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-t border-black/[0.09] bg-[#F6F4EF] px-6 py-6 shadow-[0_2px_6px_rgba(22,22,22,0.05)_inset] sm:px-8">
      {children}
    </div>
  );
}

export default function ResourceVaultApp() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openSubSection, setOpenSubSection] = useState<string | null>(null);
  const [selected, setSelected] = useState<VaultIndustry | null>(null);
  const [promptView, setPromptView] = useState<VaultIndustry | null>(null);
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  // In-memory only (no storage), so the gate re-prompts on every load and refresh.
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);

  // Escape closes only the topmost layer, so it steps back one modal at a time.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (promptView) setPromptView(null);
      else setSelected(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [promptView]);

  function copyPrompt(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function copySnapshotLink(url: string) {
    navigator.clipboard.writeText(url);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  }

  function submitPin(value: string) {
    if (value === "2701") {
      setUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPin("");
    }
  }

  function onPinChange(raw: string) {
    const digits = raw.replace(/\D/g, "").slice(0, 4);
    setPin(digits);
    setPinError(false);
    if (digits.length === 4) submitPin(digits);
  }

  if (!unlocked) {
    return (
      <div
        className="flex min-h-dvh items-center justify-center bg-[#F1EFE9] px-5 text-[#161616] antialiased"
        style={{
          backgroundImage: [
            "radial-gradient(60rem 30rem at 50% -8rem, rgba(255,255,255,0.9), transparent)",
            "radial-gradient(rgba(22,22,22,0.045) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "auto, 22px 22px",
        }}
      >
        <div className="w-full max-w-sm rounded-2xl border border-black/[0.12] bg-white p-8 text-center shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_1px_3px_rgba(22,22,22,0.06),0_16px_40px_-12px_rgba(22,22,22,0.18)]">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#161616] shadow-[0_2px_0_rgba(0,0,0,0.25),0_10px_24px_rgba(22,22,22,0.28)]">
            <Lock size={20} className="text-white" strokeWidth={2} />
          </div>
          <h1 className="text-[1.6rem] font-semibold leading-tight tracking-tight [font-family:var(--font-vault-display)]">
            Hamza&apos;s Resource Vault
          </h1>
          <p className="mt-2 text-[14px] leading-relaxed text-[#6E6C64]">
            Enter your 4-digit access PIN to continue.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitPin(pin);
            }}
            className="mt-7"
          >
            <input
              autoFocus
              type="password"
              inputMode="numeric"
              autoComplete="off"
              value={pin}
              onChange={(e) => onPinChange(e.target.value)}
              aria-label="4-digit access PIN"
              className={`w-full rounded-xl border bg-[#FCFBF9] px-5 py-4 text-center text-2xl font-semibold tracking-[0.6em] text-[#161616] outline-none transition-colors placeholder:tracking-[0.6em] placeholder:text-[#C9C6BE] ${
                pinError
                  ? "border-[#C0392B] focus:border-[#C0392B]"
                  : "border-black/15 focus:border-[#161616]"
              }`}
              placeholder="••••"
            />
            {pinError && (
              <p className="mt-3 text-[13px] font-medium text-[#C0392B]">
                Incorrect PIN. Please try again.
              </p>
            )}
            <button
              type="submit"
              className="mt-5 w-full rounded-xl bg-[#161616] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_2px_0_rgba(0,0,0,0.3),0_8px_20px_-4px_rgba(22,22,22,0.4)] transition-all hover:-translate-y-px hover:bg-black"
            >
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  const templatesOpen = openSubSection === "industry-templates";
  const isOpen = (id: string) => openSection === id;

  // Top-level sections stay mutually exclusive; opening one collapses any
  // subfolder left open inside the other.
  function toggleSection(id: string) {
    setOpenSection((current) => (current === id ? null : id));
    setOpenSubSection(null);
  }

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
                A growing collection of templates, prompts and assets. Everything you
                need to launch and sell faster.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Vault sections */}
      <main className="mx-auto w-full max-w-4xl px-5 pb-14 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-black/[0.12] bg-white shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_1px_3px_rgba(22,22,22,0.06),0_16px_40px_-12px_rgba(22,22,22,0.18)]">
          {/* Section: Pre-Built Automations and Templates */}
          <SectionButton
            first
            title="Pre-Built Automations and Templates"
            blurb="Ready-to-import assets"
            open={isOpen("automations")}
            onClick={() => toggleSection("automations")}
          />

          {isOpen("automations") && (
            <SectionBody>
              <div className="space-y-2.5">
                {/* Subfolder: Industry Templates */}
                <div
                  className={`overflow-hidden rounded-xl border border-black/[0.10] bg-white ${CARD_SHADOW}`}
                >
                  <button
                    onClick={() =>
                      setOpenSubSection(templatesOpen ? null : "industry-templates")
                    }
                    className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-[#FAF8F4]"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-semibold tracking-tight text-[#3A3934]">
                        Industry Templates
                        <span className="ml-2 font-normal text-[#8A8880]">
                          · 87 snapshots, websites and prompts
                        </span>
                      </p>
                    </div>
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                        templatesOpen
                          ? "rotate-180 border-black/20 bg-[#161616] text-white"
                          : "border-black/15 bg-white text-[#6E6C64] shadow-[0_1px_2px_rgba(22,22,22,0.08)]"
                      }`}
                    >
                      <ChevronDown size={14} strokeWidth={2} />
                    </div>
                  </button>

                  {templatesOpen && (
                    <div className="border-t border-black/[0.08] bg-[#F6F4EF] px-5 pb-8 shadow-[0_2px_6px_rgba(22,22,22,0.05)_inset]">
                      {VAULT_CATEGORIES.map((cat) => (
                        <div key={cat.heading} className="mt-7">
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
                                className={`group flex min-h-[108px] flex-col items-center justify-center gap-2.5 rounded-xl border border-black/[0.10] bg-white px-3 py-4 text-center transition-all duration-150 hover:-translate-y-1 ${CARD_SHADOW} ${CARD_HOVER}`}
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
                </div>

                <LinkRow link={LICENSEE_AUTOMATIONS} />
                <LinkRow link={FUNNEL_SNAPSHOTS} />
              </div>
            </SectionBody>
          )}

          {/* Section: AI Prompts and Frameworks */}
          <SectionButton
            title="AI Prompts and Frameworks"
            blurb="Ready-to-run prompts and prompting systems"
            open={isOpen("ai-prompts")}
            onClick={() => toggleSection("ai-prompts")}
          />
          {isOpen("ai-prompts") && (
            <SectionBody>
              <LinkGroups groups={AI_PROMPT_GROUPS} />
            </SectionBody>
          )}

          {/* Section: Cold Calling Examples */}
          <SectionButton
            title="Listen to Cold Calling Examples 📢"
            blurb="Real calls, objections, fails and follow ups"
            open={isOpen("cold-calls")}
            onClick={() => toggleSection("cold-calls")}
          />
          {isOpen("cold-calls") && (
            <SectionBody>
              <p className="mb-5 max-w-2xl text-[13px] leading-relaxed text-[#6E6C64]">
                {COLD_CALL_INTRO}
              </p>
              <LinkGroups groups={COLD_CALL_GROUPS} />
            </SectionBody>
          )}

          {/* Section: Guides and Playbooks */}
          <SectionButton
            title="Guides and Playbooks"
            blurb="Written guides and process maps"
            open={isOpen("guides")}
            onClick={() => toggleSection("guides")}
          />
          {isOpen("guides") && (
            <SectionBody>
              <LinkGroups groups={GUIDE_GROUPS} />
            </SectionBody>
          )}

          {/* Section: Agency Business Assets */}
          <SectionButton
            title="Agency Business Assets"
            blurb="Contracts, calculators and offers"
            open={isOpen("business")}
            onClick={() => toggleSection("business")}
          />
          {isOpen("business") && (
            <SectionBody>
              <LinkGroups groups={BUSINESS_GROUPS} />
            </SectionBody>
          )}

          {/* Section: Coaching Calls */}
          <SectionButton
            title="Coaching Calls"
            blurb="Live schedule and past recordings"
            open={isOpen("coaching")}
            onClick={() => toggleSection("coaching")}
          />
          {isOpen("coaching") && (
            <SectionBody>
              <GroupHeading>Live Calls</GroupHeading>
              <div className="space-y-2.5">
                {LIVE_CALLS.map((call) => (
                  <CallCard key={call.title} call={call} />
                ))}
              </div>
              <div className="mt-7">
                <LinkGroups groups={COACHING_GROUPS} />
              </div>
            </SectionBody>
          )}

          {/* Section: Support and Vendors */}
          <SectionButton
            title="Support and Vendors"
            blurb="Get unstuck fast"
            open={isOpen("support")}
            onClick={() => toggleSection("support")}
          />
          {isOpen("support") && (
            <SectionBody>
              <LinkGroups groups={SUPPORT_GROUPS} />
            </SectionBody>
          )}
        </div>

        <p className="mx-auto mt-8 max-w-md text-center text-[11px] leading-relaxed text-[#A5A39B]">
          An independent resource collection for HighLevel users. Not affiliated with or
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
            className="relative max-h-[88dvh] w-full max-w-sm overflow-y-auto rounded-2xl border border-black/[0.12] bg-white p-7 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_10px_20px_rgba(22,22,22,0.12),0_32px_80px_-12px_rgba(22,22,22,0.35)]"
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

            <div className="mt-7 space-y-6">
              {/* Path 1: licensees request the snapshot via the Hexona form. */}
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#75736B]">
                  Hexona Licensees:
                </p>
                <button
                  onClick={() => copySnapshotLink(selected.snapshotUrl)}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-5 py-3.5 text-sm font-semibold transition-all ${
                    linkCopied
                      ? "bg-[#1D7A46] text-white"
                      : "bg-[#161616] text-white shadow-[0_2px_0_rgba(0,0,0,0.3),0_8px_20px_-4px_rgba(22,22,22,0.4)] hover:-translate-y-px hover:bg-black"
                  }`}
                >
                  {linkCopied ? (
                    <>
                      Copied to clipboard
                      <Check size={16} strokeWidth={2.5} className="shrink-0" />
                    </>
                  ) : (
                    <>
                      Copy this Template
                      <Copy size={16} strokeWidth={2} className="shrink-0" />
                    </>
                  )}
                </button>
                <p className="mt-3 text-[12.5px] leading-relaxed text-[#6E6C64]">
                  If you are a Hexona Licensee, please copy and paste this link in the{" "}
                  <a
                    href="https://connect.hexonasystems.com/widget/form/eWHwmMZ7OIh2MHLQmMvd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#161616] underline underline-offset-2 hover:text-black"
                  >
                    Snapshot Request form
                  </a>{" "}
                  under Custom Link.
                </p>
              </div>

              {/* Path 2: affiliates import the snapshot directly. */}
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#75736B]">
                  GoHighLevel Affiliates:
                </p>
                <a
                  href={selected.snapshotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded-xl bg-[#161616] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_2px_0_rgba(0,0,0,0.3),0_8px_20px_-4px_rgba(22,22,22,0.4)] transition-all hover:-translate-y-px hover:bg-black"
                >
                  GHL Snapshot link
                  <ArrowUpRight size={16} strokeWidth={2} className="shrink-0" />
                </a>
              </div>

              {/* Relevant to both paths. */}
              <div className="border-t border-black/[0.08] pt-5">
              {getWebsitePrompt(selected.name) ? (
                <button
                  onClick={() => {
                    setPromptView(selected);
                    setCopied(false);
                  }}
                  className="flex w-full items-center justify-between gap-3 rounded-xl border border-black/15 bg-white px-5 py-3.5 text-sm font-semibold text-[#161616] shadow-[0_1px_2px_rgba(22,22,22,0.06)] transition-all hover:-translate-y-px hover:border-black/30"
                >
                  <span className="text-left">
                    Website Prompt{" "}
                    <span className="font-normal text-[#6E6C64]">
                      (Paste in AI Studio)
                    </span>
                  </span>
                  <FileText size={16} strokeWidth={2} className="shrink-0" />
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
