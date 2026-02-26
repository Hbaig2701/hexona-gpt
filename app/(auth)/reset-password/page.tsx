"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!token) {
    return (
      <div className="card-base p-8 text-center">
        <h2 className="font-display text-xl font-semibold text-[var(--hex-error)] mb-2">
          Invalid Link
        </h2>
        <p className="text-[var(--hex-text-secondary)] text-sm mb-4">
          This password reset link is invalid or has expired.
        </p>
        <Link href="/forgot-password" className="text-[var(--hex-teal)] hover:underline text-sm">
          Request a new reset link
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      router.push("/login");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card-base p-8">
      <h2 className="font-display text-xl font-semibold text-[var(--hex-text-primary)] mb-2">
        Set new password
      </h2>
      <p className="text-[var(--hex-text-secondary)] text-sm mb-6">
        Enter your new password below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Min. 8 characters"
          required
        />
        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Repeat password"
          required
        />

        {error && (
          <div className="p-3 rounded-lg bg-[var(--hex-error)]/10 border border-[var(--hex-error)]/20 text-[var(--hex-error)] text-sm">
            {error}
          </div>
        )}

        <Button type="submit" loading={loading} className="w-full">
          Reset Password
        </Button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="card-base p-8 text-center text-[var(--hex-text-secondary)]">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
