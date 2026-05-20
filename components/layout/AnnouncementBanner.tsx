"use client";

import { useEffect, useState } from "react";
import { X, Sparkles } from "lucide-react";

// Bump this ID when posting a new announcement so the banner re-shows
// for users who previously dismissed an older one.
const ANNOUNCEMENT_ID = "2026-05-updates-coming";
const STORAGE_KEY = `hexona-announcement-dismissed:${ANNOUNCEMENT_ID}`;

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY) !== "1") setVisible(true);
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // localStorage unavailable (private mode etc.) - dismiss is session-only
    }
  }

  if (!visible) return null;

  return (
    <div className="relative bg-gradient-to-r from-hex-teal/15 via-hex-teal/10 to-hex-teal/15 border-b border-hex-teal/30 px-4 py-2.5">
      <div className="flex items-center justify-center gap-2 text-sm text-[var(--hex-text-primary)]">
        <Sparkles size={14} className="text-hex-teal flex-shrink-0" />
        <span className="font-medium">
          New Updates Coming to Agency Advisory and All Advisors This Week
        </span>
      </div>
      <button
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded text-[var(--hex-text-muted)] hover:text-[var(--hex-text-primary)] hover:bg-hex-dark-700 transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
}
