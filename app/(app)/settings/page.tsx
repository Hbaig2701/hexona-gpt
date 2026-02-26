"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface AgencyProfile {
  niche: string;
  services: string[];
  location: string;
  monthlyRevenue: string;
  revenueGoal: string;
  experienceLevel: string;
  background: string;
  biggestChallenge: string;
  completedAt?: string;
}

export default function SettingsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<AgencyProfile | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then(setProfile)
      .catch(() => {});
  }, []);

  async function handleSave() {
    if (!profile) return;
    setSaving(true);
    await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function updateField(field: keyof AgencyProfile, value: string | string[]) {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="font-display text-2xl font-bold text-hex-text-primary">Settings</h1>

      {/* Account */}
      <Card hoverable={false}>
        <h2 className="font-display text-sm font-semibold text-hex-text-primary mb-4">Account</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-hex-text-muted">Name</span>
            <span className="text-hex-text-primary">{session?.user?.name || "Not set"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-hex-text-muted">Email</span>
            <span className="text-hex-text-primary">{session?.user?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-hex-text-muted">Role</span>
            <span className="text-hex-text-primary">{session?.user?.role}</span>
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          <Button variant="secondary" size="sm" onClick={() => router.push("/onboarding")}>
            Re-run Onboarding
          </Button>
          <Button variant="danger" size="sm" onClick={() => signOut({ callbackUrl: "/login" })}>
            Sign Out
          </Button>
        </div>
      </Card>

      {/* Agency Profile */}
      {profile && (
        <Card hoverable={false}>
          <h2 className="font-display text-sm font-semibold text-hex-text-primary mb-4">Agency Profile</h2>
          <div className="space-y-4">
            <Input
              label="Niche"
              value={profile.niche || ""}
              onChange={(e) => updateField("niche", e.target.value)}
            />
            <Input
              label="Services (comma-separated)"
              value={profile.services?.join(", ") || ""}
              onChange={(e) => updateField("services", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
            />
            <Input
              label="Location"
              value={profile.location || ""}
              onChange={(e) => updateField("location", e.target.value)}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Monthly Revenue"
                value={profile.monthlyRevenue || ""}
                onChange={(e) => updateField("monthlyRevenue", e.target.value)}
              />
              <Input
                label="Revenue Goal"
                value={profile.revenueGoal || ""}
                onChange={(e) => updateField("revenueGoal", e.target.value)}
              />
            </div>
            <Input
              label="Experience Level"
              value={profile.experienceLevel || ""}
              onChange={(e) => updateField("experienceLevel", e.target.value)}
            />
            <Input
              label="Background"
              value={profile.background || ""}
              onChange={(e) => updateField("background", e.target.value)}
            />
            <Input
              label="Biggest Challenge"
              value={profile.biggestChallenge || ""}
              onChange={(e) => updateField("biggestChallenge", e.target.value)}
            />

            <Button onClick={handleSave} loading={saving}>
              {saved ? "Saved!" : "Save Changes"}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
