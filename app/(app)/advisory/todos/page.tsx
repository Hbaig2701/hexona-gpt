import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { hasAdvisoryAccess } from "@/lib/advisory";
import type { UserTier } from "@prisma/client";
import TodoList from "@/components/advisory/TodoList";

export const dynamic = "force-dynamic";

export default async function TodosPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const userTier = (session.user as { tier?: UserTier }).tier ?? "TIER_0";
  if (!hasAdvisoryAccess(userTier)) redirect("/dashboard");

  return (
    <div className="max-w-3xl mx-auto pb-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-[var(--hex-text-primary)]">
          My To-Dos
        </h1>
        <p className="text-[var(--hex-text-secondary)] mt-2 text-sm">
          Track action items as you work through the course.
        </p>
      </div>
      <TodoList />
    </div>
  );
}
