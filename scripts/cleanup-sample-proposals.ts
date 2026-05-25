import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function main() {
  const existing = await prisma.resource.findUnique({ where: { slug: "sample-proposals" } });
  if (!existing) {
    console.log("No sample-proposals resource found (already cleaned up).");
  } else {
    await prisma.resource.delete({ where: { slug: "sample-proposals" } });
    console.log(`Deleted resource: ${existing.title}`);
  }
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
