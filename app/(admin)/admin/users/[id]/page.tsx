"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

interface UserDetail {
  id: string;
  name?: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  lastActiveAt?: string;
  agencyProfile?: {
    niche?: string;
    services: string[];
    location?: string;
    monthlyRevenue?: string;
    revenueGoal?: string;
    background?: string;
    biggestChallenge?: string;
  };
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
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-hex-text-primary">
            {user.name || "Unnamed User"}
          </h1>
          <p className="text-hex-text-secondary text-sm">{user.email}</p>
          <div className="flex gap-2 mt-2">
            <Badge variant={user.isActive ? "success" : "error"}>
              {user.isActive ? "Active" : "Inactive"}
            </Badge>
            {user.role === "ADMIN" && <Badge variant="warning">Admin</Badge>}
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
      {user.agencyProfile && (
        <Card hoverable={false}>
          <h3 className="font-display text-sm font-semibold text-hex-text-primary mb-3">Agency Profile</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {user.agencyProfile.niche && <div><span className="text-hex-text-muted">Niche:</span> <span className="text-hex-text-primary">{user.agencyProfile.niche}</span></div>}
            {user.agencyProfile.location && <div><span className="text-hex-text-muted">Location:</span> <span className="text-hex-text-primary">{user.agencyProfile.location}</span></div>}
            {user.agencyProfile.monthlyRevenue && <div><span className="text-hex-text-muted">Revenue:</span> <span className="text-hex-text-primary">{user.agencyProfile.monthlyRevenue}</span></div>}
            {user.agencyProfile.revenueGoal && <div><span className="text-hex-text-muted">Goal:</span> <span className="text-hex-text-primary">{user.agencyProfile.revenueGoal}</span></div>}
            {user.agencyProfile.services?.length > 0 && <div className="col-span-2"><span className="text-hex-text-muted">Services:</span> <span className="text-hex-text-primary">{user.agencyProfile.services.join(", ")}</span></div>}
          </div>
        </Card>
      )}

      {/* GPT Usage */}
      {user.gptUsage.length > 0 && (
        <Card hoverable={false}>
          <h3 className="font-display text-sm font-semibold text-hex-text-primary mb-3">GPT Usage</h3>
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
