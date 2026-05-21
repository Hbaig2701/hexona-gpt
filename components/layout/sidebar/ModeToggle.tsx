"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Sparkles } from "lucide-react";

export type SidebarMode = "advisors" | "advisory";

export function getModeFromPath(pathname: string): SidebarMode {
  return pathname.startsWith("/advisory") ? "advisory" : "advisors";
}

export default function ModeToggle() {
  const pathname = usePathname();
  const mode = getModeFromPath(pathname);

  const base =
    "flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-semibold transition-all";
  const active = "bg-hex-dark-900 text-hex-teal shadow-sm";
  const inactive = "text-[var(--hex-text-muted)] hover:text-[var(--hex-text-secondary)]";

  return (
    <div className="px-3 pt-3">
      <div className="flex p-1 bg-hex-dark-700 rounded-lg border border-[var(--hex-dark-500)]">
        <Link
          href="/dashboard"
          className={`${base} ${mode === "advisors" ? active : inactive}`}
        >
          <Sparkles size={13} />
          Advisors
        </Link>
        <Link
          href="/advisory"
          className={`${base} ${mode === "advisory" ? active : inactive}`}
        >
          <GraduationCap size={13} />
          Advisory
        </Link>
      </div>
    </div>
  );
}
