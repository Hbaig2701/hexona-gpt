"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import OnboardingChat from "@/components/onboarding/OnboardingChat";
import OnboardingReview from "@/components/onboarding/OnboardingReview";

type Step = "welcome" | "interview" | "review" | "done";

interface AgencyData {
  niche: string;
  services: string[];
  location: string;
  monthlyRevenue: string;
  revenueGoal: string;
  experienceLevel: string;
  background: string;
  biggestChallenge: string;
}

export default function OnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resuming = searchParams.get("resume") === "1";
  const [step, setStep] = useState<Step>(resuming ? "interview" : "welcome");
  const [agencyData, setAgencyData] = useState<AgencyData>({
    niche: "",
    services: [],
    location: "",
    monthlyRevenue: "",
    revenueGoal: "",
    experienceLevel: "",
    background: "",
    biggestChallenge: "",
  });

  async function saveProfile(data: AgencyData) {
    await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, completedAt: new Date().toISOString() }),
    });
  }

  return (
    <div className="min-h-screen bg-[var(--hex-dark-900)] hex-pattern">
      <AnimatePresence mode="wait">
        {step === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
          >
            <div className="mb-8">
              <h1 className="font-display text-4xl font-bold text-gradient mb-4">
                Hexona GPT
              </h1>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-[var(--hex-text-primary)] mb-3">
              Let&apos;s set up your AI Command Center.
            </h2>
            <p className="text-[var(--hex-text-secondary)] text-lg mb-8 max-w-md">
              3 minutes to personalize every tool to your agency.
            </p>
            <Button size="lg" onClick={() => setStep("interview")}>
              Let&apos;s Go &rarr;
            </Button>
          </motion.div>
        )}

        {step === "interview" && (
          <motion.div
            key="interview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-screen flex flex-col max-w-2xl mx-auto px-4 py-8"
          >
            <h2 className="font-display text-xl font-semibold text-[var(--hex-text-primary)] mb-6 text-center">
              Tell me about your agency
            </h2>
            <OnboardingChat
              onComplete={(data) => {
                setAgencyData(data);
                setStep("review");
              }}
              onEarlyExit={() => {
                setStep("done");
              }}
            />
          </motion.div>
        )}

        {step === "review" && (
          <motion.div
            key="review"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-screen flex flex-col items-center justify-center px-4"
          >
            <OnboardingReview
              data={agencyData}
              onUpdate={setAgencyData}
              onConfirm={async () => {
                await saveProfile(agencyData);
                setStep("done");
              }}
            />
          </motion.div>
        )}

        {step === "done" && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-hex-teal/20 flex items-center justify-center mb-6"
            >
              <svg className="w-10 h-10 text-hex-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h2 className="font-display text-2xl font-semibold text-[var(--hex-text-primary)] mb-3">
              Your dashboard is ready.
            </h2>
            <p className="text-[var(--hex-text-secondary)] mb-8 max-w-sm">
              All your AI tools are now personalized to your agency.
            </p>
            <Button size="lg" onClick={() => router.push("/dashboard")}>
              Go to Dashboard &rarr;
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
