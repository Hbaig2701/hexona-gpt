"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BackLinkProps {
  href: string;
  label?: string;
  className?: string;
}

export default function BackLink({ href, label = "Back", className = "" }: BackLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1 text-sm text-hex-text-muted hover:text-hex-teal transition-colors ${className}`}
    >
      <ArrowLeft size={14} />
      {label}
    </Link>
  );
}
