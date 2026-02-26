"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

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

interface OnboardingReviewProps {
  data: AgencyData;
  onUpdate: (data: AgencyData) => void;
  onConfirm: () => Promise<void>;
}

export default function OnboardingReview({ data, onUpdate, onConfirm }: OnboardingReviewProps) {
  const [loading, setLoading] = useState(false);

  function updateField(field: keyof AgencyData, value: string | string[]) {
    onUpdate({ ...data, [field]: value });
  }

  async function handleConfirm() {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  }

  return (
    <div className="w-full max-w-lg">
      <h2 className="font-display text-xl font-semibold text-[var(--hex-text-primary)] mb-2 text-center">
        Here&apos;s what I&apos;ve captured about your agency
      </h2>
      <p className="text-[var(--hex-text-secondary)] text-sm mb-6 text-center">
        Review and edit anything that needs correcting.
      </p>

      <div className="card-base p-6 space-y-4 mb-6">
        <Input
          label="Niche / Target Industry"
          value={data.niche}
          onChange={(e) => updateField("niche", e.target.value)}
        />
        <Input
          label="Services (comma-separated)"
          value={data.services.join(", ")}
          onChange={(e) => updateField("services", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
        />
        <Input
          label="Location"
          value={data.location}
          onChange={(e) => updateField("location", e.target.value)}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Current Revenue"
            value={data.monthlyRevenue}
            onChange={(e) => updateField("monthlyRevenue", e.target.value)}
          />
          <Input
            label="Revenue Goal (12mo)"
            value={data.revenueGoal}
            onChange={(e) => updateField("revenueGoal", e.target.value)}
          />
        </div>
        <Input
          label="Experience Level"
          value={data.experienceLevel}
          onChange={(e) => updateField("experienceLevel", e.target.value)}
        />
        <Input
          label="Professional Background"
          value={data.background}
          onChange={(e) => updateField("background", e.target.value)}
        />
        <Input
          label="Biggest Challenge"
          value={data.biggestChallenge}
          onChange={(e) => updateField("biggestChallenge", e.target.value)}
        />
      </div>

      <Button onClick={handleConfirm} loading={loading} size="lg" className="w-full">
        This looks right &rarr;
      </Button>
    </div>
  );
}
