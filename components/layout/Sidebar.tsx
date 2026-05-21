"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings as SettingsIcon, Shield, Menu, X } from "lucide-react";
import { useSidebarStore } from "@/lib/stores/sidebar-store";
import ModeToggle, { getModeFromPath } from "./sidebar/ModeToggle";
import AdvisorsSidebarContent from "./sidebar/AdvisorsSidebarContent";
import AdvisorySidebarContent from "./sidebar/AdvisorySidebarContent";

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { isCollapsed, toggle } = useSidebarStore();

  const userTier = (session?.user as { tier?: string } | undefined)?.tier ?? "TIER_0";
  const hasAdvisory = userTier !== "TIER_0";
  const mode = getModeFromPath(pathname);

  const isActive = (path: string) => pathname === path;
  const isActivePrefix = (prefix: string) => pathname.startsWith(prefix);

  const navLinkClass = (active: boolean) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
      active
        ? "bg-[rgba(0,196,204,0.1)] border-l-2 border-hex-teal text-hex-teal"
        : "text-[var(--hex-text-secondary)] hover:text-[var(--hex-text-primary)] hover:bg-hex-dark-700"
    }`;

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={toggle}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-hex-dark-800 text-hex-text-secondary"
      >
        {isCollapsed ? <Menu size={20} /> : <X size={20} />}
      </button>

      {/* Overlay on mobile */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={toggle}
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-[260px] bg-[var(--hex-dark-800)] border-r border-[var(--hex-dark-500)] flex flex-col h-screen transition-transform duration-300 ${
          isCollapsed ? "-translate-x-full lg:translate-x-0 lg:w-0 lg:overflow-hidden" : "translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-[var(--hex-dark-500)]">
          <Link href={mode === "advisory" ? "/advisory" : "/dashboard"} className="flex items-center gap-2">
            <span className="font-display text-xl font-bold text-gradient">Agency</span>
            <span className="text-[var(--hex-text-muted)] font-display text-xl">Advisory</span>
          </Link>
        </div>

        {/* Mode toggle — only for paid tiers */}
        {hasAdvisory && <ModeToggle />}

        {/* Mode-specific navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {mode === "advisory" && hasAdvisory ? (
            <AdvisorySidebarContent />
          ) : (
            <AdvisorsSidebarContent />
          )}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-[var(--hex-dark-500)] px-3 py-3 space-y-1">
          {(session?.user as { role?: string } | undefined)?.role === "ADMIN" && (
            <Link href="/admin" className={navLinkClass(isActivePrefix("/admin"))}>
              <Shield size={18} />
              Admin
            </Link>
          )}
          <Link href="/settings" className={navLinkClass(isActive("/settings"))}>
            <SettingsIcon size={18} />
            Settings
          </Link>
          {session?.user && (
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-hex-teal to-[#0095A8] flex items-center justify-center text-hex-dark-900 font-semibold text-sm">
                {session.user.name?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[var(--hex-text-primary)] truncate">
                  {session.user.name || "User"}
                </p>
                <p className="text-xs text-[var(--hex-text-muted)] truncate">
                  {session.user.email}
                </p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
