"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Circle, MessageSquare, Award } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import BackLink from "@/components/ui/BackLink";
import { getGptBySlug } from "@/lib/gpt-catalog";

type Tier = "TIER_0" | "TIER_1" | "TIER_2" | "TIER_3";

interface ProgressLesson {
  id: string;
  slug: string;
  title: string;
  type: string;
  completed: boolean;
  completedAt: string | null;
}

interface ProgressModule {
  id: string;
  title: string;
  color: string | null;
  lessonsTotal: number;
  lessonsCompleted: number;
  lessons: ProgressLesson[];
  children: { id: string; title: string; lessons: ProgressLesson[] }[];
}

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
  eligibleForAdvisory: boolean;
  advisory: {
    course: { id: string; title: string; requiredTier: string };
    totalLessons: number;
    completedLessons: number;
    completionPct: number;
    currentModule: { id: string; title: string } | null;
    modules: ProgressModule[];
    quizSubmissions: { lessonTitle: string; score: number; passed: boolean; submittedAt: string }[];
    lastLessonCompletedAt: string | null;
  } | null;
  activityTimeline: {
    type: "lesson_completed" | "conversation_started" | "quiz_submitted";
    timestamp: string;
    label: string;
    detail?: string;
  }[];
}

function formatGptSlug(slug: string): string {
  const gpt = getGptBySlug(slug);
  return gpt?.name ?? slug;
}

function formatRelative(iso: string): string {
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
                <span className="text-hex-text-secondary">{formatGptSlug(g.gptSlug)}</span>
                <span className="text-hex-text-primary">{g._count} conversations</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Advisory (Course) Progress */}
      <Card hoverable={false}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-sm font-semibold text-hex-text-primary">
            Advisory — Course Progress
          </h3>
          {user.advisory && (
            <Badge variant="teal">{user.advisory.course.requiredTier.replace("_", " ")}</Badge>
          )}
        </div>

        {!user.eligibleForAdvisory ? (
          <p className="text-sm text-hex-text-muted">
            User is on Tier 0 — Advisory access requires a paid tier.
          </p>
        ) : !user.advisory ? (
          <p className="text-sm text-hex-text-muted">
            No course is currently assigned to this tier.
          </p>
        ) : user.advisory.totalLessons === 0 ? (
          <p className="text-sm text-hex-text-muted">
            Course has no published lessons yet.
          </p>
        ) : (
          <>
            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-hex-text-secondary">
                  {user.advisory.completedLessons} of {user.advisory.totalLessons} lessons
                </span>
                <span className="text-hex-teal font-semibold">{user.advisory.completionPct}%</span>
              </div>
              <div className="h-2 bg-hex-dark-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-hex-teal to-[#0095A8]"
                  style={{ width: `${user.advisory.completionPct}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-hex-text-muted mt-1.5">
                <span>
                  {user.advisory.currentModule
                    ? `Current: ${user.advisory.currentModule.title}`
                    : "All modules complete"}
                </span>
                <span>
                  {user.advisory.lastLessonCompletedAt
                    ? `Last activity: ${formatRelative(user.advisory.lastLessonCompletedAt)}`
                    : "No lessons completed yet"}
                </span>
              </div>
            </div>

            {/* Per-module breakdown */}
            <div className="space-y-3 border-t border-hex-dark-500 pt-4">
              {user.advisory.modules.map((m) => (
                <ModuleProgressBlock key={m.id} module={m} />
              ))}
            </div>

            {/* Quiz submissions */}
            {user.advisory.quizSubmissions.length > 0 && (
              <div className="border-t border-hex-dark-500 mt-4 pt-4">
                <h4 className="text-xs font-semibold text-hex-text-secondary uppercase tracking-wider mb-2">
                  Checkpoints
                </h4>
                <div className="space-y-1.5">
                  {user.advisory.quizSubmissions.map((s, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-hex-text-primary">
                        <Award size={14} className={s.passed ? "text-hex-success" : "text-hex-warning"} />
                        {s.lessonTitle}
                      </span>
                      <span className="text-xs text-hex-text-muted">
                        {s.score}% · {formatRelative(s.submittedAt)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </Card>

      {/* Activity Timeline */}
      {user.activityTimeline.length > 0 && (
        <Card hoverable={false}>
          <h3 className="font-display text-sm font-semibold text-hex-text-primary mb-3">
            Recent Activity
          </h3>
          <div className="space-y-2">
            {user.activityTimeline.map((evt, i) => {
              const Icon =
                evt.type === "lesson_completed"
                  ? CheckCircle2
                  : evt.type === "quiz_submitted"
                  ? Award
                  : MessageSquare;
              const iconColor =
                evt.type === "lesson_completed"
                  ? "text-hex-success"
                  : evt.type === "quiz_submitted"
                  ? "text-hex-warning"
                  : "text-hex-teal";
              return (
                <div key={i} className="flex items-start gap-3 text-sm py-1">
                  <Icon size={14} className={`${iconColor} mt-0.5 shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-hex-text-primary truncate">{evt.label}</p>
                    {evt.detail && (
                      <p className="text-xs text-hex-text-muted truncate">{evt.detail}</p>
                    )}
                  </div>
                  <span className="text-xs text-hex-text-muted shrink-0">
                    {formatRelative(evt.timestamp)}
                  </span>
                </div>
              );
            })}
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

function ModuleProgressBlock({ module }: { module: ProgressModule }) {
  const [expanded, setExpanded] = useState(false);
  const pct =
    module.lessonsTotal > 0 ? Math.round((module.lessonsCompleted / module.lessonsTotal) * 100) : 0;

  return (
    <div>
      <button
        onClick={() => setExpanded((x) => !x)}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2 min-w-0">
          {module.color && (
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: module.color }}
            />
          )}
          <span className="text-sm text-hex-text-primary truncate">{module.title}</span>
        </div>
        <span className="text-xs text-hex-text-muted shrink-0 ml-2">
          {module.lessonsCompleted}/{module.lessonsTotal} · {pct}%
        </span>
      </button>
      <div className="h-1 bg-hex-dark-700 rounded-full overflow-hidden mt-1">
        <div
          className="h-full bg-hex-teal/70"
          style={{ width: `${pct}%` }}
        />
      </div>
      {expanded && (
        <div className="pl-4 mt-2 space-y-1 border-l border-hex-dark-500">
          {module.lessons.map((l) => (
            <LessonRow key={l.id} lesson={l} />
          ))}
          {module.children.map((c) => (
            <div key={c.id} className="pt-1">
              <p className="text-xs text-hex-text-muted italic mb-1">{c.title}</p>
              {c.lessons.map((l) => (
                <LessonRow key={l.id} lesson={l} />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LessonRow({ lesson }: { lesson: ProgressLesson }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      {lesson.completed ? (
        <CheckCircle2 size={12} className="text-hex-success shrink-0" />
      ) : (
        <Circle size={12} className="text-hex-text-muted shrink-0" />
      )}
      <span className={`flex-1 truncate ${lesson.completed ? "text-hex-text-secondary" : "text-hex-text-muted"}`}>
        {lesson.title}
      </span>
      {lesson.completedAt && (
        <span className="text-hex-text-muted shrink-0">{formatRelative(lesson.completedAt)}</span>
      )}
    </div>
  );
}
