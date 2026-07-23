import "dotenv/config";
import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

// "AI Automation Bootcamp - Recordings" resource: a list with Week 1-10
// entries. All weeks currently point at the same Drive folder; swap
// individual URLs here as per-week folders/links become available.

const SLUG = "bootcamp-recordings";
const DRIVE = "https://drive.google.com/drive/folders/1ZFg2tCELQ9UigVtj9eaB9qHKBZvkdwYH?usp=sharing";

const listData = {
  items: Array.from({ length: 10 }, (_, i) => ({
    title: `Week ${i + 1}`,
    links: [{ label: `Open Week ${i + 1} recordings`, url: DRIVE }],
  })),
};

async function main() {
  const data = {
    title: "AI Automation Bootcamp - Recordings",
    description: "Session recordings from the AI Automation Bootcamp, week by week.",
    url: "",
    category: "Recordings",
    requiredTier: "TIER_1" as const,
    listData: listData as unknown as Prisma.InputJsonValue,
    isPublished: true,
  };

  const existing = await prisma.resource.findUnique({ where: { slug: SLUG } });
  const last = await prisma.resource.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  });

  const resource = existing
    ? await prisma.resource.update({ where: { slug: SLUG }, data })
    : await prisma.resource.create({
        data: { slug: SLUG, ...data, order: (last?.order ?? -1) + 1 },
      });

  console.log(`${existing ? "Updated" : "Created"} "${resource.title}" (${resource.requiredTier})`);
  console.log(`  ${listData.items.length} weeks -> /advisory/resources/${SLUG}`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
