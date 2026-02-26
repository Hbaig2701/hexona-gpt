"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card-base p-8">
      <h2 className="font-display text-xl font-semibold text-[var(--hex-text-primary)] mb-6">
        Sign in to your account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@agency.com"
          required
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        {error && (
          <div className="p-3 rounded-lg bg-[var(--hex-error)]/10 border border-[var(--hex-error)]/20 text-[var(--hex-error)] text-sm">
            {error}
          </div>
        )}

        <Button type="submit" loading={loading} className="w-full">
          Sign In
        </Button>
      </form>

      <div className="mt-6 space-y-2 text-center text-sm">
        <Link href="/forgot-password" className="text-[var(--hex-teal)] hover:underline block">
          Forgot password?
        </Link>
        <p className="text-[var(--hex-text-muted)]">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[var(--hex-teal)] hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
