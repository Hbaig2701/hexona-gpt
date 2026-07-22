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
    slug: "hiring-guide",
    title: "Hiring and Operations Guide",
    description: "How to hire, delegate, and run your agency's day-to-day operations.",
    url: "https://drive.google.com/file/d/1EiG8GPY7w92bmvv8_YJeLFm3RgF12obo/view?usp=sharing",
  },
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
  {
    slug: "onboarding-checklist-guide",
    title: "Onboarding Checklist",
    description: "Checklist for onboarding new clients, start to finish.",
    url: "https://drive.google.com/file/d/1uOBKpxQU3wua9ud-1uP5rNka8CMK-1Vp/view?usp=sharing",
  },
];

// Also wire the same document into the course's "Onboarding Checklist" lesson
const CHECKLIST_LESSON_URL =
  "https://drive.google.com/file/d/1uOBKpxQU3wua9ud-1uP5rNka8CMK-1Vp/view?usp=sharing";

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

  const lessonUpdate = await prisma.lesson.updateMany({
    where: { slug: "onboarding-checklist" },
    data: { externalUrl: CHECKLIST_LESSON_URL },
  });
  console.log(`Linked checklist doc on ${lessonUpdate.count} lesson(s)`);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
