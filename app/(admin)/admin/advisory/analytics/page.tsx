"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { RefreshCw, Users, CheckCircle2, TrendingUp, Activity } from "lucide-react";
import Card from "@/components/ui/Card";
import BackLink from "@/components/ui/BackLink";

type Tier = "TIER_1" | "TIER_2" | "TIER_3";

interface Student {
  id: string;
  name?: string;
  email: string;
  completed: number;
  totalLessons: number;
  pct: number;
  lastCompletedAt: string | null;
  lastActiveAt: string | null;
  createdAt: string;
}

interface AnalyticsData {
  tier: Tier | null;
  tierCounts: { tier: Tier; users: number; course: { id: string; title: string } | null }[];
  course: { id: string; title: string; totalLessons: number } | null;
  kpis?: {
    totalStudents: number;
    activated: number;
    activatedPct: number;
    completedAll: number;
    avgCompletionPct: number;
    avgLessonsCompleted: number;
    recentlyActive: number;
  };
  funnel?: { bucket: string; count: number }[];
  moduleStats?: { id: string; title: string; lessons: number; pct: number }[];
  topLessons?: { id: string; title: string; moduleTitle: string; count: number; pct: number }[];
  bottomLessons?: { id: string; title: string; moduleTitle: string; count: number; pct: number }[];
  students?: Student[];
  recentCompletions?: { userId: string; userName: string; lessonTitle: string; completedAt: string }[];
}

const BUCKET_COLORS: Record<string, string> = {
  "0%": "#475569",
  "1-24%": "#F59E0B",
  "25-49%": "#FBBF24",
  "50-74%": "#0095A8",
  "75-99%": "#00C4CC",
  "100%": "#10B981",
};

function formatRelative(iso: string | null): string {
  if (!iso) return "Never";
  const ms = Date.now() - new Date(iso).getTime();
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(iso).toLocaleDateString();
}

export default function AdvisoryAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [tier, setTier] = useState<Tier | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [sortKey, setSortKey] = useState<"pct" | "lastCompletedAt" | "createdAt">("pct");

  useEffect(() => {
    setLoading(true);
    const url = tier
      ? `/api/admin/advisory/analytics?tier=${tier}`
      : `/api/admin/advisory/analytics`;
    fetch(url)
      .then((r) => r.json())
      .then((d: AnalyticsData) => {
        setData(d);
        if (!tier && d.tier) setTier(d.tier);
      })
      .finally(() => setLoading(false));
  }, [tier, refreshKey]);

  const sortedStudents = (() => {
    if (!data?.students) return [];
    const arr = [...data.students];
    arr.sort((a, b) => {
      if (sortKey === "pct") return b.pct - a.pct;
      if (sortKey === "createdAt")
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      const av = a.lastCompletedAt ? new Date(a.lastCompletedAt).getTime() : 0;
      const bv = b.lastCompletedAt ? new Date(b.lastCompletedAt).getTime() : 0;
      return bv - av;
    });
    return arr;
  })();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <BackLink href="/admin/advisory" label="Back to Advisory Admin" />

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-2xl font-bold text-hex-text-primary">
            Course Analytics
          </h1>
          <button
            onClick={() => setRefreshKey((k) => k + 1)}
            className="p-2 text-hex-text-muted hover:text-hex-teal transition-colors rounded-lg hover:bg-hex-dark-600"
            title="Refresh"
          >
            <RefreshCw size={18} />
          </button>
        </div>
        {/* Tier switcher */}
        <div className="flex gap-2">
          {data?.tierCounts.map((t) => {
            const active = t.tier === (data?.tier ?? tier);
            return (
              <button
                key={t.tier}
                onClick={() => setTier(t.tier)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors border ${
                  active
                    ? "bg-hex-teal text-hex-dark-900 border-hex-teal font-semibold"
                    : "bg-hex-dark-600 text-hex-text-secondary border-hex-dark-500 hover:text-hex-text-primary"
                }`}
                disabled={!t.course}
                title={t.course ? t.course.title : "No course assigned"}
              >
                {t.tier.replace("_", " ")} · {t.users}
              </button>
            );
          })}
        </div>
      </div>

      {loading ? (
        <div className="h-64 bg-hex-dark-700 rounded-lg animate-pulse" />
      ) : !data || !data.course ? (
        <Card hoverable={false} className="text-center py-12">
          <p className="text-hex-text-muted text-sm">
            {data?.tier
              ? `No published course assigned to ${data.tier.replace("_", " ")} yet.`
              : "No paid-tier courses available yet."}
          </p>
        </Card>
      ) : (
        <>
          {/* KPI cards */}
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <KpiCard icon={Users} label="Students" value={data.kpis!.totalStudents} />
            <KpiCard
              icon={Activity}
              label="Activated"
              value={`${data.kpis!.activated} (${data.kpis!.activatedPct}%)`}
              hint="Completed ≥1 lesson"
            />
            <KpiCard
              icon={TrendingUp}
              label="Avg Progress"
              value={`${data.kpis!.avgCompletionPct}%`}
              hint={`${data.kpis!.avgLessonsCompleted} lessons/student`}
            />
            <KpiCard
              icon={CheckCircle2}
              label="Finished Course"
              value={data.kpis!.completedAll}
            />
            <KpiCard icon={Users} label="Active 7d" value={data.kpis!.recentlyActive} />
            <KpiCard
              icon={Activity}
              label="Lessons"
              value={data.course.totalLessons}
              hint="Published in course"
            />
          </div>

          {/* Funnel chart + module heatmap */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card hoverable={false}>
              <h3 className="font-display text-sm font-semibold text-hex-text-primary mb-3">
                Progress Funnel
              </h3>
              <p className="text-xs text-hex-text-muted mb-3">
                Students grouped by % of course completed.
              </p>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data.funnel}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2E3847" />
                  <XAxis dataKey="bucket" tick={{ fill: "#8B9BB4", fontSize: 11 }} />
                  <YAxis tick={{ fill: "#8B9BB4", fontSize: 11 }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      background: "#1E2530",
                      border: "1px solid #2E3847",
                      borderRadius: 8,
                    }}
                  />
                  <Bar dataKey="count">
                    {data.funnel?.map((b) => (
                      <Cell key={b.bucket} fill={BUCKET_COLORS[b.bucket] ?? "#00C4CC"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card hoverable={false}>
              <h3 className="font-display text-sm font-semibold text-hex-text-primary mb-3">
                Module Completion
              </h3>
              <p className="text-xs text-hex-text-muted mb-3">
                % of student-lesson slots completed per module.
              </p>
              <div className="space-y-2">
                {data.moduleStats?.map((m) => (
                  <div key={m.id}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-hex-text-secondary truncate">{m.title}</span>
                      <span className="text-hex-text-muted shrink-0 ml-2">
                        {m.pct}% · {m.lessons} lessons
                      </span>
                    </div>
                    <div className="h-1.5 bg-hex-dark-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-hex-teal to-[#0095A8]"
                        style={{ width: `${m.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Top + Bottom lessons */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card hoverable={false}>
              <h3 className="font-display text-sm font-semibold text-hex-text-primary mb-3">
                Top 5 Lessons (Completed)
              </h3>
              <LessonList lessons={data.topLessons ?? []} />
            </Card>
            <Card hoverable={false}>
              <h3 className="font-display text-sm font-semibold text-hex-text-primary mb-3">
                Bottom 5 Lessons (Drop-off)
              </h3>
              <LessonList lessons={data.bottomLessons ?? []} />
            </Card>
          </div>

          {/* Student list */}
          <Card hoverable={false}>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h3 className="font-display text-sm font-semibold text-hex-text-primary">
                Students
              </h3>
              <select
                value={sortKey}
                onChange={(e) =>
                  setSortKey(e.target.value as "pct" | "lastCompletedAt" | "createdAt")
                }
                className="px-3 py-1.5 bg-hex-dark-600 border border-hex-dark-500 rounded text-hex-text-primary text-xs focus:outline-none focus:border-hex-teal"
              >
                <option value="pct">Sort by progress</option>
                <option value="lastCompletedAt">Sort by recent activity</option>
                <option value="createdAt">Sort by signup date</option>
              </select>
            </div>
            {sortedStudents.length === 0 ? (
              <p className="text-sm text-hex-text-muted text-center py-6">
                No students on this tier yet.
              </p>
            ) : (
              <div className="space-y-2">
                {sortedStudents.map((s) => (
                  <Link
                    key={s.id}
                    href={`/admin/users/${s.id}`}
                    className="block p-3 rounded-lg bg-hex-dark-700/30 border border-hex-dark-500/40 hover:border-hex-teal/40 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3 mb-1.5">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-hex-text-primary truncate">
                          {s.name || "Unnamed"}
                        </p>
                        <p className="text-xs text-hex-text-muted truncate">{s.email}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-semibold text-hex-teal">{s.pct}%</p>
                        <p className="text-xs text-hex-text-muted">
                          {s.completed}/{s.totalLessons}
                        </p>
                      </div>
                    </div>
                    <div className="h-1.5 bg-hex-dark-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-hex-teal to-[#0095A8]"
                        style={{ width: `${s.pct}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-hex-text-muted mt-1.5">
                      <span>Joined {formatRelative(s.createdAt)}</span>
                      <span>Last lesson {formatRelative(s.lastCompletedAt)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Card>

          {/* Recent activity */}
          {(data.recentCompletions?.length ?? 0) > 0 && (
            <Card hoverable={false}>
              <h3 className="font-display text-sm font-semibold text-hex-text-primary mb-3">
                Recent Lesson Completions
              </h3>
              <div className="space-y-1.5">
                {data.recentCompletions!.map((c, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 min-w-0 flex-1">
                      <CheckCircle2 size={14} className="text-hex-success shrink-0" />
                      <Link
                        href={`/admin/users/${c.userId}`}
                        className="text-hex-text-secondary hover:text-hex-teal truncate"
                      >
                        {c.userName}
                      </Link>
                      <span className="text-hex-text-muted shrink-0">→</span>
                      <span className="text-hex-text-primary truncate">{c.lessonTitle}</span>
                    </span>
                    <span className="text-xs text-hex-text-muted shrink-0 ml-2">
                      {formatRelative(c.completedAt)}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}

function KpiCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <Card hoverable={false}>
      <div className="flex items-center gap-2 text-hex-text-muted mb-1">
        <Icon size={14} />
        <p className="text-xs">{label}</p>
      </div>
      <p className="text-xl font-bold text-hex-text-primary">{value}</p>
      {hint && <p className="text-xs text-hex-text-muted mt-0.5">{hint}</p>}
    </Card>
  );
}

function LessonList({
  lessons,
}: {
  lessons: { id: string; title: string; moduleTitle: string; count: number; pct: number }[];
}) {
  if (lessons.length === 0) {
    return <p className="text-sm text-hex-text-muted">No data.</p>;
  }
  return (
    <div className="space-y-2">
      {lessons.map((l) => (
        <div key={l.id} className="text-sm">
          <div className="flex justify-between items-baseline gap-2">
            <span className="text-hex-text-primary truncate flex-1">{l.title}</span>
            <span className="text-hex-text-muted shrink-0 text-xs">
              {l.count} · {l.pct}%
            </span>
          </div>
          <p className="text-xs text-hex-text-muted truncate">{l.moduleTitle}</p>
          <div className="h-1 bg-hex-dark-700 rounded-full overflow-hidden mt-1">
            <div
              className="h-full bg-hex-teal/70"
              style={{ width: `${l.pct}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
