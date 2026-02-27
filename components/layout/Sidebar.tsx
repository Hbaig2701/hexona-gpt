"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Plus,
  Search,
  TrendingUp,
  Settings as SettingsIcon,
  Brain,
  Rocket,
  ChevronDown,
  ChevronRight,
  Shield,
  Menu,
  X,
  Trash2,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useSidebarStore } from "@/lib/stores/sidebar-store";
import { GPT_CATEGORIES, getGptsByCategory, type GPTCategory } from "@/lib/gpt-catalog";

interface ClientItem {
  id: string;
  businessName: string;
}

const categoryIcons: Record<string, React.ElementType> = {
  Search,
  TrendingUp,
  Settings: SettingsIcon,
  Brain,
  Rocket,
};

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const { isCollapsed, toggle } = useSidebarStore();
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [clientsExpanded, setClientsExpanded] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<ClientItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch("/api/clients")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setClients(data);
      })
      .catch(() => {});
  }, [pathname]);

  function toggleCategory(cat: string) {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  const handleDeleteContact = useCallback(async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/clients/${deleteTarget.id}`, { method: "DELETE" });
      if (res.ok) {
        setClients((prev) => prev.filter((c) => c.id !== deleteTarget.id));
        // Redirect if currently viewing the deleted contact
        if (pathname.startsWith(`/clients/${deleteTarget.id}`)) {
          router.push("/dashboard");
        }
      }
    } catch {
      // silently fail
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  }, [deleteTarget, pathname, router]);

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
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="font-display text-xl font-bold text-gradient">Hexona</span>
            <span className="text-[var(--hex-text-muted)] font-display text-xl">GPT</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {/* Dashboard */}
          <Link href="/dashboard" className={navLinkClass(isActive("/dashboard"))}>
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          {/* Clients */}
          <div className="pt-4">
            <button
              onClick={() => setClientsExpanded(!clientsExpanded)}
              className="flex items-center justify-between w-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--hex-text-muted)]"
            >
              Contacts
              {clientsExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>

            <AnimatePresence>
              {clientsExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <Link
                    href="/clients/new"
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-hex-teal hover:bg-hex-dark-700 transition-colors`}
                  >
                    <Plus size={16} />
                    New Contact
                  </Link>
                  {clients.map((client) => (
                    <Link
                      key={client.id}
                      href={`/clients/${client.id}`}
                      className={`${navLinkClass(isActivePrefix(`/clients/${client.id}`))} justify-between`}
                    >
                      <span className="flex items-center gap-3 min-w-0">
                        <span className="w-2 h-2 rounded-full bg-hex-teal/50 shrink-0" />
                        <span className="truncate">{client.businessName}</span>
                      </span>
                      <span
                        role="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setDeleteTarget(client);
                        }}
                        className="shrink-0 p-1 rounded text-red-400 hover:bg-red-400/10"
                      >
                        <Trash2 size={14} />
                      </span>
                    </Link>
                  ))}
                  {clients.length === 0 && (
                    <p className="px-3 py-2 text-xs text-[var(--hex-text-muted)]">No contacts yet</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* GPT Tools */}
          <div className="pt-4">
            <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--hex-text-muted)]">
              GPT Tools
            </p>
            {(Object.entries(GPT_CATEGORIES) as [GPTCategory, typeof GPT_CATEGORIES[GPTCategory]][]).map(
              ([key, cat]) => {
                const IconComponent = categoryIcons[cat.icon] || Search;
                return (
                  <div key={key}>
                    <button
                      onClick={() => toggleCategory(key)}
                      className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActivePrefix(`/gpts/${key}`)
                          ? "text-hex-teal"
                          : "text-[var(--hex-text-secondary)] hover:text-[var(--hex-text-primary)] hover:bg-hex-dark-700"
                      }`}
                    >
                      <IconComponent size={18} style={{ color: cat.color }} />
                      <span className="flex-1 text-left">{cat.label}</span>
                      {expandedCategories.has(key) ? (
                        <ChevronDown size={14} />
                      ) : (
                        <ChevronRight size={14} />
                      )}
                    </button>
                    <AnimatePresence>
                      {expandedCategories.has(key) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          {getGptsByCategory(key as GPTCategory).map((gpt) => (
                            <Link
                              key={gpt.slug}
                              href={`/gpts/${gpt.slug}`}
                              className={navLinkClass(isActive(`/gpts/${gpt.slug}`))}
                            >
                              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                              <span className="truncate">{gpt.name}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
            )}
          </div>
        </nav>

        {/* Bottom section */}
        <div className="border-t border-[var(--hex-dark-500)] px-3 py-3 space-y-1">
          {session?.user?.role === "ADMIN" && (
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

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            onClick={() => !deleting && setDeleteTarget(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--hex-dark-800)] border border-[var(--hex-dark-500)] rounded-xl p-6 max-w-sm mx-4 shadow-xl"
            >
              <h3 className="text-lg font-semibold text-[var(--hex-text-primary)] mb-2">
                Delete contact?
              </h3>
              <p className="text-sm text-[var(--hex-text-secondary)] mb-6">
                Are you sure you want to delete <strong>{deleteTarget.businessName}</strong>? This will remove all conversations and data associated with this contact. This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setDeleteTarget(null)}
                  disabled={deleting}
                  className="px-4 py-2 rounded-lg text-sm text-[var(--hex-text-secondary)] hover:bg-hex-dark-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteContact}
                  disabled={deleting}
                  className="px-4 py-2 rounded-lg text-sm bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
