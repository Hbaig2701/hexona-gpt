import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export type Tier = "TIER_0" | "TIER_1" | "TIER_2" | "TIER_3";

export const TIER_LEVELS: Record<Tier, number> = {
  TIER_0: 0,
  TIER_1: 1,
  TIER_2: 2,
  TIER_3: 3,
};

export const TIER_LABELS: Record<Tier, string> = {
  TIER_0: "Tier 0",
  TIER_1: "Tier 1",
  TIER_2: "Tier 2",
  TIER_3: "Tier 3",
};

export function isTier(value: unknown): value is Tier {
  return value === "TIER_0" || value === "TIER_1" || value === "TIER_2" || value === "TIER_3";
}

// Admins always pass tier checks. Otherwise compare numeric levels.
export function hasTierAccess(
  userTier: Tier | null | undefined,
  minTier: Tier,
  role?: string | null
): boolean {
  if (role === "ADMIN") return true;
  if (!userTier) return false;
  return TIER_LEVELS[userTier] >= TIER_LEVELS[minTier];
}

export async function requireTier(minTier: Tier) {
  const session = await getServerSession(authOptions);
  if (!session) return { authorized: false as const, error: "Unauthorized" };
  const tier = (session.user as { tier?: string }).tier;
  const role = session.user.role;
  if (!hasTierAccess(isTier(tier) ? tier : "TIER_0", minTier, role)) {
    return { authorized: false as const, error: "Forbidden" };
  }
  return { authorized: true as const, session };
}
