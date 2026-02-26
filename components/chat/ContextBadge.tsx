"use client";

import { User } from "lucide-react";

export default function ContextBadge({ clientName }: { clientName: string }) {
  return (
    <div className="flex items-center gap-2 mt-1 px-2.5 py-1 rounded-lg bg-hex-dark-700 border border-hex-dark-500 w-fit">
      <User size={12} className="text-hex-teal" />
      <span className="text-xs text-hex-text-secondary">
        Context: <span className="text-hex-teal">{clientName}</span>
      </span>
    </div>
  );
}
