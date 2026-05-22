import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const FUNNEL_INVENTORY_URL =
  "https://docs.google.com/spreadsheets/d/1VodxdHNTlC7PZPYd4zgwi0PmNtIq_iRuWDxjZYRZIYI/edit?usp=sharing";

async function main() {
  // 1) Find any matching lesson (could be in any module)
  const lessons = await prisma.lesson.findMany({
    where: {
      OR: [
        { slug: { contains: "funnel-templates", mode: "insensitive" } },
        { title: { contains: "10+ funnel templates", mode: "insensitive" } },
      ],
    },
    include: { module: { select: { title: true } } },
  });

  console.log(`Found ${lessons.length} matching lesson(s):`);
  for (const l of lessons) {
    console.log(`  - "${l.title}" (slug: ${l.slug}, module: ${l.module.title})`);
    // Point it at the funnel inventory so the lesson isn't a dead link
    await prisma.lesson.update({
      where: { id: l.id },
      data: { externalUrl: FUNNEL_INVENTORY_URL },
    });
    console.log(`    → externalUrl set to funnel inventory`);
  }

  // 2) Delete the duplicate resource
  const existing = await prisma.resource.findUnique({ where: { slug: "funnel-templates" } });
  if (existing) {
    await prisma.resource.delete({ where: { slug: "funnel-templates" } });
    console.log(`Deleted resource: ${existing.title}`);
  } else {
    console.log("No funnel-templates resource found (already cleaned up).");
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
