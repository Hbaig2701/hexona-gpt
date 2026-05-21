import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const URL =
  "https://docs.google.com/document/d/1PXH1Azf7MGZO3GueqwM7WTcj0cf_AvssFDOXnWcHt7A/edit?usp=sharing";
const TITLE = "AI Photoshoot Bundle (Prompts Included)";
const SLUG = "ai-photoshoot-bundle";

async function main() {
  // 1) Wire the existing lesson(s) with this slug to the doc URL
  const lessons = await prisma.lesson.findMany({ where: { slug: SLUG } });
  for (const l of lessons) {
    const updated = await prisma.lesson.update({
      where: { id: l.id },
      data: { externalUrl: URL },
    });
    console.log("Lesson updated:", updated.title, "->", updated.externalUrl);
  }
  if (lessons.length === 0) console.log("No matching lessons found for slug:", SLUG);

  // 2) Create the resource (or update if it already exists)
  const existing = await prisma.resource.findUnique({ where: { slug: SLUG } });
  const last = await prisma.resource.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  });

  const data = {
    title: TITLE,
    description:
      "A bundle of ready-to-use AI prompts for generating professional headshots and product/branding photos — paste into Midjourney, Sora, or your preferred image model.",
    url: URL,
    category: "Samples",
    requiredTier: "TIER_1" as const,
    isPublished: true,
  };

  const resource = existing
    ? await prisma.resource.update({ where: { slug: SLUG }, data })
    : await prisma.resource.create({
        data: {
          slug: SLUG,
          ...data,
          order: (last?.order ?? -1) + 1,
        },
      });

  console.log(existing ? "Resource updated:" : "Resource created:", resource.title);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
