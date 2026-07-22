import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

// "Discovery Call Recordings" section on the Advisory resources page.
// Tier visibility is exact-match (resources page filters requiredTier === userTier),
// so "Tier 1 and above" = one copy of each recording per paid tier.

const RECORDINGS = [
  {
    baseSlug: "bakery-discovery-call",
    title: "Bakery Discovery Call",
    url: "https://drive.google.com/file/d/1GcN93bVzi1BSGAqMY3afvmrSQO76Y7ct/view?usp=sharing",
  },
  {
    baseSlug: "daycare-discovery-call",
    title: "Daycare Discovery Call",
    url: "https://drive.google.com/file/d/1Hw8bl497MUPWD09raTL-nZIRHLZxKkWo/view?usp=sharing",
  },
];

const TIERS = [
  { tier: "TIER_1" as const, suffix: "" },
  { tier: "TIER_2" as const, suffix: "-t2" },
  { tier: "TIER_3" as const, suffix: "-t3" },
];

async function main() {
  const last = await prisma.resource.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  });
  let nextOrder = (last?.order ?? -1) + 1;

  for (const { tier, suffix } of TIERS) {
    for (const rec of RECORDINGS) {
      const slug = `${rec.baseSlug}${suffix}`;
      const data = {
        title: rec.title,
        description: "Full recording of a real discovery call.",
        url: rec.url,
        category: "Discovery Call Recordings",
        requiredTier: tier,
        isPublished: true,
      };

      const existing = await prisma.resource.findUnique({ where: { slug } });
      if (existing) {
        await prisma.resource.update({ where: { slug }, data });
        console.log(`Updated ${slug} (${tier})`);
      } else {
        await prisma.resource.create({ data: { slug, ...data, order: nextOrder++ } });
        console.log(`Created ${slug} (${tier})`);
      }
    }
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
