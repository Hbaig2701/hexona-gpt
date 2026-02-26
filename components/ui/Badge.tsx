"use client";

type BadgeVariant = "default" | "success" | "warning" | "error" | "teal";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-hex-dark-600 text-hex-text-secondary",
  success: "bg-hex-success/15 text-hex-success",
  warning: "bg-hex-warning/15 text-hex-warning",
  error: "bg-hex-error/15 text-hex-error",
  teal: "bg-hex-teal/15 text-hex-teal",
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
