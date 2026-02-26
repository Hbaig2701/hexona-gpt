"use client";

import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export default function Card({ hoverable = true, className = "", children, ...props }: CardProps) {
  return (
    <div
      className={`card-base ${hoverable ? "card-hover" : ""} p-5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
