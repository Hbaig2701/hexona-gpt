"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { GPT_CATALOG, GPT_CATEGORIES, type GPT } from "@/lib/gpt-catalog";
import * as LucideIcons from "lucide-react";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

interface RecentConversation {
  id: string;
  title: string;
  gptSlug: string;
  updatedAt: string;
  client?: { id: string; businessName: string };
}

interface AgencyProfile {
  niche?: string;
  monthlyRevenue?: string;
  revenueGoal?: string;
  completedAt?: string;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [recentConversations, setRecentConversations] = useState<RecentConversation[]>([]);
  const [profile, setProfile] = useState<AgencyProfile | null>(null);

  useEffect(() => {
    fetch("/api/conversations?limit=3")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setRecentConversations(data); })
      .catch(() => {});

    fetch("/api/profile")
      .then((r) => r.json())
      .then(setProfile)
      .catch(() => {});
  }, []);

  const popularGpts = GPT_CATALOG.filter((g) => g.badge === "popular" || g.slug === "hamza-ai").slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Hero Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-3xl font-bold text-[var(--hex-text-primary)]">
          {getGreeting()},{" "}
          <span className="text-gradient">
            {session?.user?.name?.split(" ")[0] || "there"}
          </span>
          .
        </h1>
        <p className="text-[var(--hex-text-secondary)] mt-1">
          Here&apos;s your agency command center.
        </p>
      </motion.div>

      {/* Profile Snapshot */}
      {profile?.completedAt && (
        <Card hoverable={false}>
          <div className="flex flex-wrap gap-6 text-sm">
            {profile.niche && (
              <div>
                <span className="text-[var(--hex-text-muted)]">Niche</span>
                <p className="text-[var(--hex-text-primary)] font-medium">{profile.niche}</p>
              </div>
            )}
            {profile.monthlyRevenue && (
              <div>
                <span className="text-[var(--hex-text-muted)]">Revenue</span>
                <p className="text-[var(--hex-text-primary)] font-medium">{profile.monthlyRevenue}</p>
              </div>
            )}
            {profile.revenueGoal && (
              <div>
                <span className="text-[var(--hex-text-muted)]">Goal</span>
                <p className="text-[var(--hex-text-primary)] font-medium">{profile.revenueGoal}</p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Suggested Action */}
      {!profile?.completedAt && (
        <Link href="/onboarding">
          <Card className="border-hex-teal/30 hover:border-hex-teal/50 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-hex-teal/15 flex items-center justify-center">
                <LucideIcons.Rocket className="w-5 h-5 text-hex-teal" />
              </div>
              <div>
                <p className="text-[var(--hex-text-primary)] font-medium">Complete your agency profile</p>
                <p className="text-[var(--hex-text-secondary)] text-sm">Personalize all AI tools to your agency in 3 minutes</p>
              </div>
            </div>
          </Card>
        </Link>
      )}

      {/* Continue Where You Left Off */}
      {recentConversations.length > 0 && (
        <div>
          <h2 className="font-display text-lg font-semibold text-[var(--hex-text-primary)] mb-3">
            Continue where you left off
          </h2>
          <div className="grid gap-3 md:grid-cols-3">
            {recentConversations.map((conv) => {
              const gpt = GPT_CATALOG.find((g) => g.slug === conv.gptSlug);
              return (
                <Link key={conv.id} href={conv.client ? `/clients/${conv.client.id}/gpts/${conv.gptSlug}?conversation=${conv.id}` : `/gpts/${conv.gptSlug}?conversation=${conv.id}`}>
                  <Card className="cursor-pointer">
                    <p className="text-sm text-hex-teal font-medium">{gpt?.name || conv.gptSlug}</p>
                    <p className="text-[var(--hex-text-primary)] text-sm mt-1 truncate">
                      {conv.title || "Untitled conversation"}
                    </p>
                    {conv.client && (
                      <p className="text-xs text-[var(--hex-text-muted)] mt-1">{conv.client.businessName}</p>
                    )}
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Access GPT Grid */}
      <div>
        <h2 className="font-display text-lg font-semibold text-[var(--hex-text-primary)] mb-3">
          Quick access
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {popularGpts.map((gpt) => (
            <GPTQuickCard key={gpt.slug} gpt={gpt} />
          ))}
        </div>
      </div>

      {/* All Categories */}
      <div>
        <h2 className="font-display text-lg font-semibold text-[var(--hex-text-primary)] mb-3">
          All GPT tools
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(Object.entries(GPT_CATEGORIES) as [string, { label: string; icon: string; color: string }][]).map(
            ([key, cat]) => (
              <Link key={key} href={`/gpts/${key}`}>
                <Card className="cursor-pointer flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${cat.color}20` }}
                  >
                    {(() => {
                      const Icon = (LucideIcons as unknown as Record<string, React.ElementType>)[cat.icon] || LucideIcons.Zap;
                      return <Icon size={20} style={{ color: cat.color }} />;
                    })()}
                  </div>
                  <div>
                    <p className="text-[var(--hex-text-primary)] font-medium text-sm">{cat.label}</p>
                    <p className="text-[var(--hex-text-muted)] text-xs">
                      {GPT_CATALOG.filter((g) => g.category === key).length} tools
                    </p>
                  </div>
                </Card>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function GPTQuickCard({ gpt }: { gpt: GPT }) {
  const Icon = (LucideIcons as unknown as Record<string, React.ElementType>)[gpt.icon] || LucideIcons.Zap;
  const category = GPT_CATEGORIES[gpt.category];
  const href = gpt.scope === "client" ? `/gpts/${gpt.slug}` : `/gpts/${gpt.slug}`;

  return (
    <Link href={href}>
      <Card className="cursor-pointer h-full">
        <div className="flex items-start justify-between mb-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${category.color}20` }}
          >
            <Icon size={20} style={{ color: category.color }} />
          </div>
          {gpt.badge && (
            <Badge variant={gpt.badge === "popular" ? "teal" : gpt.badge === "pro" ? "warning" : "success"}>
              {gpt.badge}
            </Badge>
          )}
        </div>
        <p className="text-[var(--hex-text-primary)] font-medium text-sm">{gpt.name}</p>
        <p className="text-[var(--hex-text-muted)] text-xs mt-1 line-clamp-2">{gpt.description}</p>
      </Card>
    </Link>
  );
}
