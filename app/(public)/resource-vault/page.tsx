import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import ResourceVaultApp from "./ResourceVaultApp";

// Public standalone page — outside the (app) route group, no login required.

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-vault-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hamza's Resource Vault",
  description:
    "A free collection of Hamza's resources — industry snapshot templates, website prompts, and more for GoHighLevel agency owners.",
};

export default function ResourceVaultPage() {
  return (
    <div className={fraunces.variable}>
      <ResourceVaultApp />
    </div>
  );
}
