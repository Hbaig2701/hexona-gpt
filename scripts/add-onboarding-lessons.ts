import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

// Appends video lessons to the Tier 1 course's "Onboarding & Management"
// module. loomEmbedUrl() only uses the video ID, so plain share URLs suffice.

const LESSONS = [
  {
    slug: "onboarding-into-hexona",
    title: "Onboarding into Hexona",
    loomUrl: "https://www.loom.com/share/9ba4439f11ac403bbca6c7455183ee7e",
  },
  {
    slug: "sending-proposals",
    title: "Sending Proposals",
    loomUrl: "https://www.loom.com/share/b41384d537e2443bae37f0b097aa0880",
  },
  {
    slug: "send-invoices-subscriptions",
    title: "How to Send Invoices + Subscriptions",
    loomUrl: "https://www.loom.com/share/8613b1953590468f9bb67202758ee958",
  },
];

async function main() {
  const mod = await prisma.module.findFirst({
    where: { title: "Onboarding & Management", course: { slug: "ai-automation-accelerator" } },
  });
  if (!mod) throw new Error("Onboarding & Management module not found");

  for (const lesson of LESSONS) {
    const data = {
      title: lesson.title,
      type: "VIDEO" as const,
      loomUrl: lesson.loomUrl,
      isPublished: true,
    };
    const existing = await prisma.lesson.findFirst({
      where: { moduleId: mod.id, slug: lesson.slug },
    });
    if (existing) {
      await prisma.lesson.update({ where: { id: existing.id }, data });
      console.log(`Updated "${lesson.title}"`);
    } else {
      const last = await prisma.lesson.findFirst({
        where: { moduleId: mod.id },
        orderBy: { order: "desc" },
        select: { order: true },
      });
      await prisma.lesson.create({
        data: { moduleId: mod.id, slug: lesson.slug, order: (last?.order ?? -1) + 1, ...data },
      });
      console.log(`Created "${lesson.title}"`);
    }
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
