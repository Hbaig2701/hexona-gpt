import "dotenv/config";
import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const funnels = [
  { title: "Lead Magnet Funnel", url: "https://app.gohighlevel.com/v2/preview/npsgW9Fn30PkkIWweTl4" },
  { title: "Business Event Funnel", url: "https://app.gohighlevel.com/v2/preview/HzM9NrTBDGjIsWOnJwbN" },
  { title: "SaaS Funnel", url: "https://app.gohighlevel.com/v2/preview/xlOQZBjER9AexMu5dAg6" },
  { title: "Order Form Page", url: "https://app.gohighlevel.com/v2/preview/ydgn7L63ThbhIDk6grlY" },
  { title: "Order Confirmation Page", url: "https://app.gohighlevel.com/v2/preview/Fg8ibe0MloQE5VUTXoCl" },
  { title: "Webinar / VSL Opt-in", url: "https://app.gohighlevel.com/v2/preview/3k21yrmtCcfaGPBZM33d" },
  { title: "Automated VSL / Webinar", url: "https://app.gohighlevel.com/v2/preview/0RDcxL55WdBZPPMWGkRn" },
  { title: "Application Page", url: "https://app.gohighlevel.com/v2/preview/zt6DhSpeYp5nKJmJlt23" },
  { title: "Application Confirmation Page", url: "https://app.gohighlevel.com/v2/preview/R9cx64bE41HSOLRDmWIZ" },
  { title: "Female Lead Magnet Funnel", url: "https://app.gohighlevel.com/v2/preview/PhN9c2sjVC3U3SJgY3e7" },
];

async function main() {
  const listData = {
    items: funnels.map((f) => ({
      title: f.title,
      description:
        "Preview the GHL funnel and clone the template into your sub-account from the preview screen.",
      links: [{ label: "Preview & Download", url: f.url }],
    })),
  };

  const resource = await prisma.resource.findUnique({ where: { slug: "funnel-inventory" } });
  if (!resource) {
    console.error("funnel-inventory resource not found. Run seed first.");
    process.exit(1);
  }

  await prisma.resource.update({
    where: { id: resource.id },
    data: {
      listData,
      url: "https://docs.google.com/spreadsheets/d/1VodxdHNTlC7PZPYd4zgwi0PmNtIq_iRuWDxjZYRZIYI/edit",
      description:
        "10 high-converting GHL funnel templates you can clone directly into your sub-account.",
      tableData: Prisma.JsonNull,
    },
  });

  console.log(`Populated funnel-inventory with ${funnels.length} items`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
