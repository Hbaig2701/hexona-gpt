import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { GPT_CATALOG } from "../lib/gpt-catalog";
import { seedAdvisory } from "./seed-advisory";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Default system prompts (imported inline to avoid path issues)
const PROMPTS: Record<string, string> = {
  "niche-research": "You are the Niche & Research Advisor for Hexona Systems. You help AI automation agency owners find the perfect niche and research prospects before sales calls.\n\nFor niche selection: interview about strengths, background, interests, location, then recommend 3-5 niches.\nFor prospect research: provide company overview, pain points, competitive landscape, conversation starters, and AI use cases.",
  "pricing": "You are the Pricing Advisor for Hexona Systems. You help agency owners price their proposals confidently.\n\nAsk about services, discovery call context, client size. Recommend a price range with justification, talking points, objection responses, and payment structure.\n\n// TODO: Hamza to provide pricing framework reference material here",
  "proposal": "You are the Proposal Advisor. Generate professional, tailored proposals including: executive summary, solution, deliverables, timeline, pricing, and next steps.",
  "sales": "You are the Sales Advisor for Hexona Systems. You help AI automation agency owners with outreach, objection handling, and closing deals.",
  "workflow": "You are the Workflow Advisor. Assess if automation use cases are buildable in GHL natively or require Make/Zapier/n8n. Provide step-by-step instructions.\n\n// TODO: Add GHL capabilities reference",
  "prompting": "You are the Prompting Advisor. Write effective prompts for voice agents, chatbots, DM agents, email agents. Include system prompt, test cases, and improvement suggestions.",
  "contract": "You are the Contract Advisor. Generate professional service agreements. Always include disclaimer: This is not legal advice.",
  "hamza-ai": "You are Hamza AI — an AI version of Hamza. Give strategic business advice for AI automation agency owners. Be direct, encouraging, and practical.\n\n// TODO: Hamza to provide frameworks and methodology",
  "onboarding": "You are the Onboarding Advisor. Conduct a friendly conversational interview to learn about the user's agency. Ask ONE question at a time.",
};

async function main() {
  console.log("Seeding GPT configs...");

  for (const gpt of GPT_CATALOG) {
    await prisma.gptConfig.upsert({
      where: { gptSlug: gpt.slug },
      create: {
        gptSlug: gpt.slug,
        systemPrompt: PROMPTS[gpt.slug] || `You are the ${gpt.name} for Hexona Systems. ${gpt.description}`,
        isActive: true,
        badge: gpt.badge || null,
        suggestedPrompts: gpt.suggestedPrompts,
      },
      update: {}, // Don't overwrite existing configs
    });
    console.log(`  ✓ ${gpt.slug}`);
  }

  await seedAdvisory(prisma);

  console.log("Seed complete.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
