import type { UserTier, LessonType } from "@prisma/client";

const PAID_TIERS: UserTier[] = ["TIER_1", "TIER_2", "TIER_3"];

export function hasAdvisoryAccess(tier: UserTier): boolean {
  return PAID_TIERS.includes(tier);
}

export function tierMatches(userTier: UserTier, requiredTier: UserTier): boolean {
  return userTier === requiredTier;
}

const LOOM_EMBED_PARAMS = "hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true";

export function loomEmbedUrl(shareUrl: string | null | undefined): string | null {
  if (!shareUrl) return null;
  const match = shareUrl.match(/loom\.com\/(?:share|embed)\/([a-zA-Z0-9-]+)/);
  if (!match) return null;
  return `https://www.loom.com/embed/${match[1]}?${LOOM_EMBED_PARAMS}`;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export const LESSON_TYPE_LABELS: Record<LessonType, string> = {
  VIDEO: "Video",
  CHECKPOINT: "Checkpoint",
  RESOURCE: "Resource link",
  TOOL_LINK: "Advisor link",
  TABLE: "Data table",
};

export const USER_TIERS = ["TIER_0", "TIER_1", "TIER_2", "TIER_3"] as const satisfies readonly UserTier[];
export const PAID_USER_TIERS = ["TIER_1", "TIER_2", "TIER_3"] as const satisfies readonly UserTier[];
