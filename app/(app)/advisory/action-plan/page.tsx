import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { hasAdvisoryAccess } from "@/lib/advisory";
import Card from "@/components/ui/Card";
import ActionPlanChecklist from "@/components/advisory/ActionPlanChecklist";
import type { UserTier } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function ActionPlanPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const userTier = (session.user as { tier?: UserTier }).tier ?? "TIER_0";
  const userId = (session.user as { id: string }).id;
  if (!hasAdvisoryAccess(userTier)) redirect("/dashboard");

  const [items, completions] = await Promise.all([
    prisma.actionItem.findMany({
      where: { isPublished: true, requiredTier: userTier },
      orderBy: { order: "asc" },
      select: { id: true, title: true, description: true, phase: true },
    }),
    prisma.actionItemCompletion.findMany({
      where: { userId },
      select: { actionItemId: true },
    }),
  ]);

  const completedIds = new Set(completions.map((c) => c.actionItemId));

  return (
    <div className="max-w-3xl mx-auto pb-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-[var(--hex-text-primary)]">Action Plan</h1>
        <p className="text-[var(--hex-text-secondary)] mt-2 text-sm">
          Your step-by-step path through the course. Check items off as you complete them.
        </p>
      </div>

      {items.length === 0 ? (
        <Card hoverable={false} className="text-center py-10">
          <p className="text-[var(--hex-text-muted)] text-sm">No action plan for your tier yet.</p>
        </Card>
      ) : (
        <ActionPlanChecklist
          items={items}
          initialCompletedIds={Array.from(completedIds)}
        />
      )}
    </div>
  );
}
