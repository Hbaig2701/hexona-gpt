"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import BackLink from "@/components/ui/BackLink";

type Tier = "TIER_0" | "TIER_1" | "TIER_2" | "TIER_3";

interface UserDetail {
  id: string;
  name?: string;
  email: string;
  role: string;
  tier: Tier;
  isActive: boolean;
  createdAt: string;
  lastActiveAt?: string;
  agencyProfile?: {
    niche?: string;
    services: string[];
    location?: string;
    monthlyRevenue?: string;
    revenueGoal?: string;
    experienceLevel?: string;
    background?: string;
    biggestChallenge?: string;
    completedAt?: string;
  } | null;
  _count: { conversations: number; clients: number };
  usageStats: { totalMessages: number; totalTokens: number; totalCost: number };
  gptUsage: { gptSlug: string; _count: number }[];
}

export default function AdminUserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/users/${userId}`)
      .then((r) => r.json())
      .then(setUser)
      .finally(() => setLoading(false));
  }, [userId]);

  async function toggleActive() {
    if (!user) return;
    await fetch(`/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !user.isActive }),
    });
    setUser({ ...user, isActive: !user.isActive });
  }

  async function toggleRole() {
    if (!user) return;
    const newRole = user.role === "ADMIN" ? "USER" : "ADMIN";
    await fetch(`/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });
    setUser({ ...user, role: newRole });
  }

  async function changeTier(newTier: Tier) {
    if (!user || newTier === user.tier) return;
    await fetch(`/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tier: newTier }),
    });
    setUser({ ...user, tier: newTier });
  }

  async function resetPassword() {
    if (!confirm("Send a password reset email to this user?")) return;
    await fetch(`/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resetPassword: true }),
    });
    alert("Password reset email sent.");
  }

  async function deleteUser() {
    if (!confirm("Deactivate this user? Their data will be preserved.")) return;
    await fetch(`/api/admin/users/${userId}`, { method: "DELETE" });
    router.push("/admin/users");
  }

  if (loading) return <div className="animate-pulse h-64 bg-hex-dark-700 rounded-lg max-w-3xl mx-auto" />;
  if (!user) return <p className="text-hex-text-muted text-center">User not found</p>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <BackLink href="/admin/users" label="Back to users" />

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-hex-text-primary">
            {user.name || "Unnamed User"}
          </h1>
          <p className="text-hex-text-secondary text-sm">{user.email}</p>
          <div className="flex gap-2 mt-2 items-center">
            <Badge variant={user.isActive ? "success" : "error"}>
              {user.isActive ? "Active" : "Inactive"}
            </Badge>
            {user.role === "ADMIN" && <Badge variant="warning">Admin</Badge>}
            {user.tier && user.tier !== "TIER_0" && (
              <Badge variant="teal">{user.tier.replace("_", " ")}</Badge>
            )}
            <select
              value={user.tier || "TIER_0"}
              onChange={(e) => changeTier(e.target.value as Tier)}
              className="px-2 py-1 bg-hex-dark-600 border border-hex-dark-500 rounded text-hex-text-primary text-xs focus:outline-none focus:border-hex-teal"
              title="Change user tier"
            >
              <option value="TIER_0">Tier 0</option>
              <option value="TIER_1">Tier 1</option>
              <option value="TIER_2">Tier 2</option>
              <option value="TIER_3">Tier 3</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={toggleActive}>
            {user.isActive ? "Deactivate" : "Activate"}
          </Button>
          <Button variant="secondary" size="sm" onClick={toggleRole}>
            {user.role === "ADMIN" ? "Demote" : "Promote"}
          </Button>
          <Button variant="ghost" size="sm" onClick={resetPassword}>Reset PW</Button>
          <Button variant="danger" size="sm" onClick={deleteUser}>Delete</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-3 sm:grid-cols-4">
        <Card hoverable={false}>
          <p className="text-xs text-hex-text-muted">Conversations</p>
          <p className="text-xl font-bold text-hex-text-primary">{user._count.conversations}</p>
        </Card>
        <Card hoverable={false}>
          <p className="text-xs text-hex-text-muted">Contacts</p>
          <p className="text-xl font-bold text-hex-text-primary">{user._count.clients}</p>
        </Card>
        <Card hoverable={false}>
          <p className="text-xs text-hex-text-muted">Total Messages</p>
          <p className="text-xl font-bold text-hex-text-primary">{user.usageStats.totalMessages}</p>
        </Card>
        <Card hoverable={false}>
          <p className="text-xs text-hex-text-muted">Est. Cost</p>
          <p className="text-xl font-bold text-hex-text-primary">${user.usageStats.totalCost.toFixed(2)}</p>
        </Card>
      </div>

      {/* Agency Profile */}
      <Card hoverable={false}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-sm font-semibold text-hex-text-primary">Agency Profile</h3>
          {user.agencyProfile?.completedAt ? (
            <Badge variant="success">Onboarded</Badge>
          ) : (
            <Badge variant="default">Not completed</Badge>
          )}
        </div>
        {(() => {
          const p = user.agencyProfile;
          const hasAny = p && (
            p.niche || p.location || p.monthlyRevenue || p.revenueGoal ||
            p.experienceLevel || p.background || p.biggestChallenge ||
            (p.services && p.services.length > 0)
          );
          if (!hasAny) {
            return (
              <p className="text-sm text-hex-text-muted">
                This user hasn&apos;t filled out their agency profile yet.
              </p>
            );
          }
          const dash = <span className="text-hex-text-muted">—</span>;
          return (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-hex-text-muted">Niche:</span> <span className="text-hex-text-primary">{p!.niche || dash}</span></div>
              <div><span className="text-hex-text-muted">Location:</span> <span className="text-hex-text-primary">{p!.location || dash}</span></div>
              <div><span className="text-hex-text-muted">Revenue:</span> <span className="text-hex-text-primary">{p!.monthlyRevenue || dash}</span></div>
              <div><span className="text-hex-text-muted">Goal:</span> <span className="text-hex-text-primary">{p!.revenueGoal || dash}</span></div>
              <div><span className="text-hex-text-muted">Experience:</span> <span className="text-hex-text-primary">{p!.experienceLevel || dash}</span></div>
              <div className="col-span-2"><span className="text-hex-text-muted">Services:</span> <span className="text-hex-text-primary">{p!.services?.length ? p!.services.join(", ") : dash}</span></div>
              {p!.background && (
                <div className="col-span-2"><span className="text-hex-text-muted">Background:</span> <span className="text-hex-text-primary">{p!.background}</span></div>
              )}
              {p!.biggestChallenge && (
                <div className="col-span-2"><span className="text-hex-text-muted">Biggest challenge:</span> <span className="text-hex-text-primary">{p!.biggestChallenge}</span></div>
              )}
            </div>
          );
        })()}
      </Card>

      {/* Advisor Usage */}
      {user.gptUsage.length > 0 && (
        <Card hoverable={false}>
          <h3 className="font-display text-sm font-semibold text-hex-text-primary mb-3">Advisor Usage</h3>
          <div className="space-y-2">
            {user.gptUsage.map((g) => (
              <div key={g.gptSlug} className="flex justify-between text-sm">
                <span className="text-hex-text-secondary">{g.gptSlug}</span>
                <span className="text-hex-text-primary">{g._count} conversations</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Link
        href={`/admin/conversations?userId=${userId}`}
        className="text-hex-teal text-sm hover:underline"
      >
        View all conversations &rarr;
      </Link>
    </div>
  );
}
