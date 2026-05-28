"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import Card from "@/components/ui/Card";

interface ActionItem {
  id: string;
  title: string;
  description: string | null;
  phase: string;
}

interface Props {
  items: ActionItem[];
  initialCompletedIds: string[];
}

export default function ActionPlanChecklist({ items, initialCompletedIds }: Props) {
  const [completed, setCompleted] = useState<Set<string>>(new Set(initialCompletedIds));
  const [pending, setPending] = useState<Set<string>>(new Set());

  // Group by phase, preserving the global order in which phases first appear.
  const phases = useMemo(() => {
    const order: string[] = [];
    const byPhase: Record<string, ActionItem[]> = {};
    for (const item of items) {
      if (!byPhase[item.phase]) {
        byPhase[item.phase] = [];
        order.push(item.phase);
      }
      byPhase[item.phase].push(item);
    }
    return order.map((phase) => ({ phase, items: byPhase[phase] }));
  }, [items]);

  const totalDone = items.filter((i) => completed.has(i.id)).length;
  const pct = items.length > 0 ? Math.round((totalDone / items.length) * 100) : 0;

  async function toggle(id: string) {
    if (pending.has(id)) return;
    const isDone = completed.has(id);
    const next = !isDone;

    // Optimistic update
    setCompleted((prev) => {
      const s = new Set(prev);
      if (next) s.add(id);
      else s.delete(id);
      return s;
    });
    setPending((prev) => new Set(prev).add(id));

    try {
      const res = await fetch(`/api/advisory/action-items/${id}/complete`, {
        method: next ? "POST" : "DELETE",
      });
      if (!res.ok) throw new Error("request failed");
    } catch {
      // Revert on failure
      setCompleted((prev) => {
        const s = new Set(prev);
        if (next) s.delete(id);
        else s.add(id);
        return s;
      });
    } finally {
      setPending((prev) => {
        const s = new Set(prev);
        s.delete(id);
        return s;
      });
    }
  }

  return (
    <div className="space-y-8">
      {/* Overall progress */}
      <Card hoverable={false} className="!p-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-[var(--hex-text-primary)]">
            {totalDone} of {items.length} complete
          </p>
          <p className="text-sm font-semibold text-hex-teal">{pct}%</p>
        </div>
        <div className="h-2.5 bg-hex-dark-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-hex-teal to-[#0095A8] transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        {pct === 100 && (
          <p className="text-xs text-hex-success mt-2">
            Every step done. You&apos;ve built a real agency — keep the momentum going.
          </p>
        )}
      </Card>

      {/* Phases */}
      {phases.map(({ phase, items: phaseItems }) => {
        const doneInPhase = phaseItems.filter((i) => completed.has(i.id)).length;
        return (
          <div key={phase}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--hex-text-muted)]">
                {phase}
              </p>
              <p className="text-xs text-[var(--hex-text-muted)]">
                {doneInPhase}/{phaseItems.length}
              </p>
            </div>
            <div className="space-y-2">
              {phaseItems.map((item) => {
                const isDone = completed.has(item.id);
                const isPending = pending.has(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggle(item.id)}
                    className="w-full text-left"
                  >
                    <Card
                      className={`flex items-start gap-3 transition-colors ${
                        isDone ? "border-hex-success/30 bg-hex-success/5" : ""
                      }`}
                    >
                      <span className="shrink-0 mt-0.5">
                        {isPending ? (
                          <Loader2 size={18} className="text-hex-teal animate-spin" />
                        ) : isDone ? (
                          <CheckCircle2 size={18} className="text-hex-success" />
                        ) : (
                          <Circle size={18} className="text-[var(--hex-text-muted)]" />
                        )}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-medium ${
                            isDone
                              ? "text-[var(--hex-text-muted)] line-through"
                              : "text-[var(--hex-text-primary)]"
                          }`}
                        >
                          {item.title}
                        </p>
                        {item.description && (
                          <p className="text-xs text-[var(--hex-text-muted)] mt-0.5">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </Card>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
