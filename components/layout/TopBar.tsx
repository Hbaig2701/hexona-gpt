"use client";

import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { LogOut, Menu } from "lucide-react";
import { useSidebarStore } from "@/lib/stores/sidebar-store";

function getBreadcrumb(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return "Dashboard";

  const labels: Record<string, string> = {
    dashboard: "Dashboard",
    clients: "Contacts",
    gpts: "GPT Tools",
    settings: "Settings",
    admin: "Admin",
    new: "New",
    users: "Users",
    analytics: "Analytics",
    conversations: "Conversations",
  };

  return segments.map((s) => labels[s] || s).join(" / ");
}

export default function TopBar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { toggle } = useSidebarStore();

  return (
    <header className="h-14 border-b border-[var(--hex-dark-500)] bg-[var(--hex-dark-800)]/80 backdrop-blur-sm flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={toggle}
          className="hidden lg:flex p-1.5 rounded-lg text-[var(--hex-text-muted)] hover:text-[var(--hex-text-primary)] hover:bg-hex-dark-700 transition-colors"
        >
          <Menu size={18} />
        </button>
        <span className="text-sm text-[var(--hex-text-secondary)]">
          {getBreadcrumb(pathname)}
        </span>
      </div>

      <div className="flex items-center gap-4">
        {session?.user && (
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-2 text-sm text-[var(--hex-text-muted)] hover:text-[var(--hex-text-primary)] transition-colors"
          >
            <LogOut size={16} />
            Sign out
          </button>
        )}
      </div>
    </header>
  );
}
