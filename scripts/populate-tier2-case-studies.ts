import "dotenv/config";
import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const SLUG = "case-studies";

// Renders as a collapsible list on /advisory/resources/case-studies.
// Each item expands to reveal its link(s).
const listData = {
  items: [
    {
      title:
        "From Bottlenecks to Booked Jobs: How a Home Improvement Sales Team Automated Their Workflow and Scaled Profitably",
      links: [
        {
          label: "View case study",
          url: "https://drive.google.com/drive/folders/1klhcZbiCwU8eI9HcRmugbLcVOAlKQ2C1",
        },
      ],
    },
    {
      title:
        "How We Helped a Solar Installer Unlock $24.5K in Profit from Dormant Leads in Under 3 Weeks",
      links: [
        {
          label: "View case study",
          url: "https://drive.google.com/drive/folders/1klhcZbiCwU8eI9HcRmugbLcVOAlKQ2C1",
        },
      ],
    },
  ],
};

async function main() {
  const data = {
    title: "Case Studies",
    description:
      "Real client results you can reference in outreach, discovery calls, and proposals.",
    url: "",
    category: "Sales Assets",
    requiredTier: "TIER_2" as const,
    listData: listData as unknown as Prisma.InputJsonValue,
    tableData: Prisma.JsonNull,
    documentMd: null,
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

  console.log(`${existing ? "Updated" : "Created"} resource: "${resource.title}" (${resource.requiredTier})`);
  console.log(`  ${listData.items.length} case studies under category "${resource.category}"`);
  console.log(`  Detail page: /advisory/resources/${SLUG}`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
