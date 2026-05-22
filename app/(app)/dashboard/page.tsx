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

interface CourseProgress {
  eligible: boolean;
  course?: { id: string; title: string } | null;
  totalLessons?: number;
  completedLessons?: number;
  completionPct?: number;
  nextLesson?: { slug: string; title: string } | null;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [recentConversations, setRecentConversations] = useState<RecentConversation[]>([]);
  const [profile, setProfile] = useState<AgencyProfile | null>(null);
  const [progress, setProgress] = useState<CourseProgress | null>(null);

  useEffect(() => {
    fetch("/api/conversations?limit=3")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setRecentConversations(data); })
      .catch(() => {});

    fetch("/api/profile")
      .then((r) => r.json())
      .then(setProfile)
      .catch(() => {});

    fetch("/api/advisory/progress")
      .then((r) => r.json())
      .then(setProgress)
      .catch(() => {});
  }, []);

  const popularGpts = GPT_CATALOG.filter((g) => g.badge === "popular" || g.slug === "hamza-ai").slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-8">
      {/* Hero Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-4xl font-bold text-[var(--hex-text-primary)]">
          {getGreeting()},{" "}
          <span className="text-gradient">
            {session?.user?.name?.split(" ")[0] || "there"}
          </span>
          .
        </h1>
        <p className="text-[var(--hex-text-secondary)] mt-3 text-base">
          Here&apos;s your agency command center.
        </p>
      </motion.div>

      {/* Profile Snapshot */}
      {profile?.completedAt && (
        <ProfileSnapshot profile={profile} progress={progress} />
      )}

      {/* Suggested Action */}
      {!profile?.completedAt && (
        <Link href="/onboarding?resume=1">
          <Card className="border-hex-teal/30 hover:border-hex-teal/50 cursor-pointer !p-6">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-hex-teal/15 flex items-center justify-center shrink-0">
                <LucideIcons.Rocket className="w-6 h-6 text-hex-teal" />
              </div>
              <div>
                <p className="text-[var(--hex-text-primary)] font-semibold text-base">Complete your agency profile</p>
                <p className="text-[var(--hex-text-secondary)] text-sm mt-0.5">Personalize all AI tools to your agency in 3 minutes</p>
              </div>
            </div>
          </Card>
        </Link>
      )}

      {/* Continue Where You Left Off */}
      {recentConversations.length > 0 && (
        <div>
          <h2 className="font-display text-xl font-semibold text-[var(--hex-text-primary)] mb-4">
            Continue where you left off
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {recentConversations.map((conv) => {
              const gpt = GPT_CATALOG.find((g) => g.slug === conv.gptSlug);
              return (
                <Link key={conv.id} href={conv.client ? `/clients/${conv.client.id}/advisors/${conv.gptSlug}?conversation=${conv.id}` : `/advisors/${conv.gptSlug}?conversation=${conv.id}`}>
                  <Card className="cursor-pointer !p-6 h-full">
                    <p className="text-base text-hex-teal font-semibold">{gpt?.name || conv.gptSlug}</p>
                    <p className="text-[var(--hex-text-primary)] text-sm mt-1.5 truncate">
                      {conv.title || "Untitled conversation"}
                    </p>
                    {conv.client && (
                      <p className="text-sm text-[var(--hex-text-secondary)] mt-1.5">{conv.client.businessName}</p>
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
        <h2 className="font-display text-xl font-semibold text-[var(--hex-text-primary)] mb-4">
          Quick access
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popularGpts.map((gpt) => (
            <GPTQuickCard key={gpt.slug} gpt={gpt} />
          ))}
        </div>
      </div>

      {/* All Categories */}
      <div>
        <h2 className="font-display text-xl font-semibold text-[var(--hex-text-primary)] mb-4">
          All Advisors
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(Object.entries(GPT_CATEGORIES) as [string, { label: string; icon: string; color: string }][]).map(
            ([key, cat]) => (
              <Link key={key} href={`/advisors/${key}`}>
                <Card className="cursor-pointer flex items-center gap-5 !p-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${cat.color}20` }}
                  >
                    {(() => {
                      const Icon = (LucideIcons as unknown as Record<string, React.ElementType>)[cat.icon] || LucideIcons.Zap;
                      return <Icon size={22} style={{ color: cat.color }} />;
                    })()}
                  </div>
                  <div>
                    <p className="text-[var(--hex-text-primary)] font-semibold text-base">{cat.label}</p>
                    <p className="text-[var(--hex-text-secondary)] text-sm mt-0.5">
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

function ProfileSnapshot({
  profile,
  progress,
}: {
  profile: AgencyProfile;
  progress: CourseProgress | null;
}) {
  const hasProgress = !!(
    progress?.eligible &&
    progress.course &&
    (progress.totalLessons ?? 0) > 0
  );

  const cards: {
    icon: React.ElementType;
    color: string;
    label: string;
    value: string;
    subtitle?: string;
    href?: string;
    progressPct?: number;
  }[] = [];

  if (profile.niche) {
    cards.push({
      icon: LucideIcons.Target,
      color: "#A855F7",
      label: "Niche",
      value: profile.niche,
      subtitle: "Your target market",
    });
  }
  if (profile.monthlyRevenue) {
    cards.push({
      icon: LucideIcons.DollarSign,
      color: "#10B981",
      label: "Revenue",
      value: profile.monthlyRevenue,
      subtitle: "Current monthly",
    });
  }
  if (profile.revenueGoal) {
    cards.push({
      icon: LucideIcons.TrendingUp,
      color: "#F59E0B",
      label: "Goal",
      value: profile.revenueGoal,
      subtitle: "12-month target",
    });
  }
  if (hasProgress) {
    cards.push({
      icon: LucideIcons.GraduationCap,
      color: "#00C4CC",
      label: "Course Progress",
      value: `${progress!.completionPct}%`,
      subtitle: `${progress!.completedLessons} of ${progress!.totalLessons} lessons`,
      href: progress!.nextLesson ? `/advisory/${progress!.nextLesson.slug}` : "/advisory",
      progressPct: progress!.completionPct,
    });
  }

  if (cards.length === 0) return null;

  const cols =
    cards.length === 1 ? "grid-cols-1" : cards.length === 2 ? "sm:grid-cols-2" : cards.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div className={`grid gap-4 ${cols}`}>
      {cards.map((c) => {
        const Icon = c.icon;
        const inner = (
          <Card hoverable={!!c.href} className="!p-5 h-full">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${c.color}20` }}
              >
                <Icon size={18} style={{ color: c.color }} />
              </div>
              <span className="text-xs uppercase tracking-wider text-[var(--hex-text-muted)] font-semibold">
                {c.label}
              </span>
            </div>
            <p className="text-2xl font-bold text-[var(--hex-text-primary)] truncate">{c.value}</p>
            {c.subtitle && (
              <p className="text-xs text-[var(--hex-text-muted)] mt-1 truncate">{c.subtitle}</p>
            )}
            {typeof c.progressPct === "number" && (
              <div className="h-1.5 bg-hex-dark-700 rounded-full overflow-hidden mt-3">
                <div
                  className="h-full bg-gradient-to-r from-hex-teal to-[#0095A8]"
                  style={{ width: `${c.progressPct}%` }}
                />
              </div>
            )}
          </Card>
        );
        return c.href ? (
          <Link key={c.label} href={c.href} className="block">
            {inner}
          </Link>
        ) : (
          <div key={c.label}>{inner}</div>
        );
      })}
    </div>
  );
}

function GPTQuickCard({ gpt }: { gpt: GPT }) {
  const Icon = (LucideIcons as unknown as Record<string, React.ElementType>)[gpt.icon] || LucideIcons.Zap;
  const category = GPT_CATEGORIES[gpt.category];

  return (
    <Link href={`/advisors/${gpt.slug}`}>
      <Card className="cursor-pointer h-full !p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${category.color}20` }}
          >
            <Icon size={22} style={{ color: category.color }} />
          </div>
          {gpt.badge && (
            <Badge variant={gpt.badge === "popular" ? "teal" : gpt.badge === "pro" ? "warning" : "success"}>
              {gpt.badge}
            </Badge>
          )}
        </div>
        <p className="text-[var(--hex-text-primary)] font-semibold text-base">{gpt.name}</p>
        <p className="text-[var(--hex-text-secondary)] text-sm mt-1.5 line-clamp-2">{gpt.description}</p>
      </Card>
    </Link>
  );
}
