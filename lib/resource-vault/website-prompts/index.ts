// Aggregates the per-category website prompt records and exposes a lookup
// keyed by the exact industry name used in lib/resource-vault/industries.ts.

import { TAX_FINANCIAL_PROMPTS } from "./tax-financial";
import { HOME_IMPROVEMENT_PROMPTS } from "./home-improvement";
import { HOME_EXTERIOR_A_PROMPTS } from "./home-exterior-a";
import { HOME_EXTERIOR_B_PROMPTS } from "./home-exterior-b";
import { CLEANING_PROMPTS } from "./cleaning-services";
import { HEALTH_WELLNESS_PROMPTS } from "./health-wellness";
import { EDUCATIONAL_PROMPTS } from "./educational";
import { PROFESSIONAL_A_PROMPTS } from "./professional-a";
import { PROFESSIONAL_B_PROMPTS } from "./professional-b";
import { BUSINESS_PROMPTS } from "./business";
import { HOME_MAINTENANCE_A_PROMPTS } from "./home-maintenance-a";
import { HOME_MAINTENANCE_B_PROMPTS } from "./home-maintenance-b";

export const WEBSITE_PROMPTS: Record<string, string> = {
  ...TAX_FINANCIAL_PROMPTS,
  ...HOME_IMPROVEMENT_PROMPTS,
  ...HOME_EXTERIOR_A_PROMPTS,
  ...HOME_EXTERIOR_B_PROMPTS,
  ...CLEANING_PROMPTS,
  ...HEALTH_WELLNESS_PROMPTS,
  ...EDUCATIONAL_PROMPTS,
  ...PROFESSIONAL_A_PROMPTS,
  ...PROFESSIONAL_B_PROMPTS,
  ...BUSINESS_PROMPTS,
  ...HOME_MAINTENANCE_A_PROMPTS,
  ...HOME_MAINTENANCE_B_PROMPTS,
};

export function getWebsitePrompt(industryName: string): string | null {
  return WEBSITE_PROMPTS[industryName] ?? null;
}
