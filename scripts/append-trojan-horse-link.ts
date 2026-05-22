import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const TROJAN_HORSE_DOC =
  "https://docs.google.com/document/d/1kLhklqIGF0OkHXYIAjpGqJVmdGydRtiho4C_cOoS2fE/edit?tab=t.eukrcy2lh73";
const LINK_LABEL = "Access Trojan Horse Offer Details Here";
const APPEND_TEXT = `[${LINK_LABEL}](${TROJAN_HORSE_DOC})`;

async function main() {
  const lessons = await prisma.lesson.findMany({
    where: { title: { contains: "Trojan Horse", mode: "insensitive" } },
    include: { module: { select: { title: true } } },
  });

  console.log(`Found ${lessons.length} Trojan Horse lesson(s):\n`);

  for (const l of lessons) {
    if (l.description && l.description.includes(TROJAN_HORSE_DOC)) {
      console.log(`  - "${l.title}" — already has the link, skipping`);
      continue;
    }
    const newDesc = l.description ? `${l.description.trimEnd()}\n\n${APPEND_TEXT}` : APPEND_TEXT;
    await prisma.lesson.update({
      where: { id: l.id },
      data: { description: newDesc },
    });
    console.log(`  ✓ "${l.title}" (module: ${l.module.title}) — link appended`);
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
