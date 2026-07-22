import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

// Renames the "Guides" resources section to "Agency Guides" and adds two
// Drive-linked guides to it (Tier 1, matching the existing hiring guide).

const CATEGORY = "Agency Guides";

const GUIDES = [
  {
    slug: "personal-branding-guide",
    title: "Personal Branding Guide",
    description: "How to build a personal brand that attracts agency clients.",
    url: "https://drive.google.com/file/d/1Xjet6hzZPBVGmwGuRGlRtq5omHfyD-8k/view?usp=sharing",
  },
  {
    slug: "sales-acquisition-guide",
    title: "Sales and Acquisition Guide",
    description: "Playbook for selling and acquiring clients for your agency.",
    url: "https://drive.google.com/file/d/140EvvgB4eh5_aSbYmZGvBr-b-knhzDhg/view?usp=sharing",
  },
];

async function main() {
  const renamed = await prisma.resource.updateMany({
    where: { category: "Guides" },
    data: { category: CATEGORY },
  });
  console.log(`Renamed "Guides" -> "${CATEGORY}" on ${renamed.count} resource(s)`);

  const last = await prisma.resource.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  });
  let nextOrder = (last?.order ?? -1) + 1;

  for (const g of GUIDES) {
    const data = {
      title: g.title,
      description: g.description,
      url: g.url,
      category: CATEGORY,
      requiredTier: "TIER_1" as const,
      isPublished: true,
    };
    const existing = await prisma.resource.findUnique({ where: { slug: g.slug } });
    if (existing) {
      await prisma.resource.update({ where: { slug: g.slug }, data });
      console.log(`Updated ${g.slug}`);
    } else {
      await prisma.resource.create({ data: { slug: g.slug, ...data, order: nextOrder++ } });
      console.log(`Created ${g.slug}`);
    }
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
