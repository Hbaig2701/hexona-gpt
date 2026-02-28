"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import { Users, Brain, BarChart3, MessageSquare, RefreshCw } from "lucide-react";

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalMessages: number;
  totalCost: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setStats(null);
    fetch("/api/admin/analytics?period=30d&summary=true")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, [refreshKey]);

  const cards = [
    {
      title: "Users",
      value: stats?.totalUsers ?? "...",
      subtitle: `${stats?.activeUsers ?? 0} active`,
      icon: Users,
      href: "/admin/users",
      color: "#00C4CC",
    },
    {
      title: "GPT Config",
      value: "13",
      subtitle: "GPTs configured",
      icon: Brain,
      href: "/admin/gpts",
      color: "#F59E0B",
    },
    {
      title: "Messages",
      value: stats?.totalMessages?.toLocaleString() ?? "...",
      subtitle: "Last 30 days",
      icon: MessageSquare,
      href: "/admin/analytics",
      color: "#10B981",
    },
    {
      title: "API Cost",
      value: stats?.totalCost ? `$${stats.totalCost.toFixed(2)}` : "...",
      subtitle: "Last 30 days",
      icon: BarChart3,
      href: "/admin/analytics",
      color: "#EF4444",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-hex-text-primary">
          Admin Dashboard
        </h1>
        <button
          onClick={() => setRefreshKey((k) => k + 1)}
          className="p-2 text-hex-text-muted hover:text-hex-teal transition-colors rounded-lg hover:bg-hex-dark-600"
          title="Refresh data"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {cards.map((card) => (
          <Link key={card.title} href={card.href}>
            <Card className="cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-hex-text-muted text-sm">{card.title}</p>
                  <p className="text-2xl font-bold text-hex-text-primary mt-1">{card.value}</p>
                  <p className="text-xs text-hex-text-muted mt-1">{card.subtitle}</p>
                </div>
                <card.icon size={24} style={{ color: card.color }} />
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/admin/users">
          <Card className="cursor-pointer">
            <h3 className="font-display text-sm font-semibold text-hex-text-primary mb-1">User Management</h3>
            <p className="text-hex-text-muted text-sm">Manage users, toggle access, reset passwords</p>
          </Card>
        </Link>
        <Link href="/admin/gpts">
          <Card className="cursor-pointer">
            <h3 className="font-display text-sm font-semibold text-hex-text-primary mb-1">GPT Configuration</h3>
            <p className="text-hex-text-muted text-sm">Edit system prompts, knowledge base, settings</p>
          </Card>
        </Link>
        <Link href="/admin/analytics">
          <Card className="cursor-pointer">
            <h3 className="font-display text-sm font-semibold text-hex-text-primary mb-1">Analytics</h3>
            <p className="text-hex-text-muted text-sm">Usage stats, cost tracking, model breakdown</p>
          </Card>
        </Link>
        <Link href="/admin/conversations">
          <Card className="cursor-pointer">
            <h3 className="font-display text-sm font-semibold text-hex-text-primary mb-1">Conversation Viewer</h3>
            <p className="text-hex-text-muted text-sm">Browse and review all conversations</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
