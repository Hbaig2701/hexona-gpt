"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="card-base p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-hex-teal/15 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-hex-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="font-display text-xl font-semibold text-[var(--hex-text-primary)] mb-2">
          Check your email
        </h2>
        <p className="text-[var(--hex-text-secondary)] text-sm mb-6">
          If an account with that email exists, we&apos;ve sent a password reset link.
        </p>
        <Link href="/login" className="text-[var(--hex-teal)] hover:underline text-sm">
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="card-base p-8">
      <h2 className="font-display text-xl font-semibold text-[var(--hex-text-primary)] mb-2">
        Forgot your password?
      </h2>
      <p className="text-[var(--hex-text-secondary)] text-sm mb-6">
        Enter your email and we&apos;ll send you a reset link.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@agency.com"
          required
        />
        <Button type="submit" loading={loading} className="w-full">
          Send Reset Link
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--hex-text-muted)]">
        <Link href="/login" className="text-[var(--hex-teal)] hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
