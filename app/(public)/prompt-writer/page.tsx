import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import PromptWriterApp from "./PromptWriterApp";

// Public standalone page — intentionally outside the (app) route group so the
// session guard in app/(app)/layout.tsx never applies. No account required.

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-ghl-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GoHighLevel Prompt Writer — Free AI Prompt Generator for GHL",
  description:
    "Describe what you want to build in GoHighLevel and get a copy-paste-ready prompt engineered for Ask AI, the Workflow AI Builder, or AI Studio. Free, no account needed.",
};

export default function PromptWriterPage() {
  return (
    <div className={bricolage.variable}>
      <PromptWriterApp />
    </div>
  );
}
