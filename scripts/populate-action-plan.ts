import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

// Tier 1 action plan — mirrors the AI Automation Accelerator journey.
// phase = section heading shown in the UI. Items are ordered globally so the
// progress reads top-to-bottom across phases.
type SeedItem = { title: string; description?: string; phase: string };

const ITEMS: SeedItem[] = [
  // Phase 1 — Foundation
  { phase: "Foundation", title: "Pick your niche", description: "Choose the market you'll specialize in and commit to it." },
  { phase: "Foundation", title: "Research your golden market", description: "Validate demand, competition, and customer value for your niche." },
  { phase: "Foundation", title: "Name your AI growth firm", description: "Lock in a business name you can build a brand around." },
  { phase: "Foundation", title: "Set up your brand identity", description: "Logo, colors, and basic visual identity." },
  { phase: "Foundation", title: "Set up your Stripe account", description: "Get ready to accept client payments." },
  { phase: "Foundation", title: "Create your LinkedIn profile", description: "Your primary credibility surface for outreach and inbound." },
  { phase: "Foundation", title: "Build your professional website", description: "A clean site that positions you as a real agency." },

  // Phase 2 — Portfolio & Skills
  { phase: "Portfolio & Skills", title: "Get Hexona Systems set up", description: "Provision your platform so you can start building." },
  { phase: "Portfolio & Skills", title: "Build your first portfolio project", description: "Build an Instagram DM agent end to end." },
  { phase: "Portfolio & Skills", title: "Build a voice AI receptionist", description: "Add a flagship demo to your portfolio." },
  { phase: "Portfolio & Skills", title: "Build a website chat widget", description: "A fast, high-value build clients immediately understand." },
  { phase: "Portfolio & Skills", title: "Create your booking calendar", description: "So prospects can book discovery calls with you." },
  { phase: "Portfolio & Skills", title: "Demo your portfolio", description: "Practice walking through your builds confidently." },

  // Phase 3 — Offer & Positioning
  { phase: "Offer & Positioning", title: "Build your core offer", description: "Define exactly what you sell and the outcome it delivers." },
  { phase: "Offer & Positioning", title: "Set up a Trojan Horse offer", description: "A low-friction entry offer that opens the door to bigger deals." },
  { phase: "Offer & Positioning", title: "Optimize your LinkedIn profile for inbound", description: "Turn your profile into a lead-generating asset." },

  // Phase 4 — Outreach & First Clients
  { phase: "Outreach & First Clients", title: "Create your first lead magnet", description: "A valuable asset that attracts your ideal prospects." },
  { phase: "Outreach & First Clients", title: "Set up your content engine", description: "A repeatable system for posting and repurposing content." },
  { phase: "Outreach & First Clients", title: "Send your first outreach message", description: "Get your first real conversation started." },
  { phase: "Outreach & First Clients", title: "Set up a cold email campaign", description: "Build the infrastructure for predictable outbound at volume." },
  { phase: "Outreach & First Clients", title: "Book your first discovery call", description: "Get a qualified prospect on a call." },
  { phase: "Outreach & First Clients", title: "Close your first client", description: "Sign your first paying client. The whole game changes here." },

  // Phase 5 — Delivery & Scale
  { phase: "Delivery & Scale", title: "Onboard your first client", description: "Send the contract, collect payment, run the kickoff call." },
  { phase: "Delivery & Scale", title: "Set up your onboarding checklist", description: "Standardize the way every new client starts." },
  { phase: "Delivery & Scale", title: "Establish your first partnership", description: "Line up a referral or white-label partner to expand reach." },
];

async function main() {
  const tier = "TIER_1" as const;

  // Wipe and reseed the Tier 1 plan so reruns stay clean.
  // Completions cascade-delete with their action items.
  const deleted = await prisma.actionItem.deleteMany({ where: { requiredTier: tier } });
  console.log(`Cleared ${deleted.count} existing Tier 1 action item(s).`);

  let order = 0;
  for (const item of ITEMS) {
    await prisma.actionItem.create({
      data: {
        title: item.title,
        description: item.description ?? null,
        phase: item.phase,
        requiredTier: tier,
        order: order++,
        isPublished: true,
      },
    });
  }

  console.log(`Seeded ${ITEMS.length} Tier 1 action items across ${new Set(ITEMS.map((i) => i.phase)).size} phases.`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
