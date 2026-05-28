import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

// Creates a blank, UNPUBLISHED Tier 2 course shell so the admin has a place to
// build out the curriculum when the Tier 2 content arrives. Unpublished means
// Tier 2 users see the "no course yet" empty state until it's filled + published.
async function main() {
  const existing = await prisma.course.findFirst({ where: { requiredTier: "TIER_2" } });
  if (existing) {
    console.log(`Tier 2 course already exists: "${existing.title}" (slug: ${existing.slug}, published: ${existing.isPublished}). No changes.`);
    await prisma.$disconnect();
    return;
  }

  const last = await prisma.course.findFirst({ orderBy: { order: "desc" }, select: { order: true } });

  const course = await prisma.course.create({
    data: {
      slug: "tier-2-course",
      title: "Tier 2 Course",
      subtitle: "Curriculum coming soon.",
      ctaLabel: "Start Course",
      requiredTier: "TIER_2",
      isPublished: false,
      order: (last?.order ?? -1) + 1,
    },
  });

  console.log(`Created Tier 2 course shell: "${course.title}" (slug: ${course.slug}, unpublished).`);
  console.log("Build it out at /admin/advisory/courses, then publish when ready.");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
