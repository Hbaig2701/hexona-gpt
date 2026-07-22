import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

// Copies the Tier 2 "Cold Email Outreach Course" module into the Tier 1 course
// as "Cold Email (Instantly)" and renames Tier 1's existing "Cold Email" module
// to "Cold Email (Koldify)". Lessons are flattened into the new module (the
// Tier 2 wrapper's single "DIY Cold Email Outreach" child is an artifact of the
// Tier 2 phase structure; Tier 1 modules hold lessons directly).

const NEW_TITLE = "Cold Email (Instantly)";
const RENAMED_TITLE = "Cold Email (Koldify)";

async function main() {
  const t1Course = await prisma.course.findUnique({
    where: { slug: "ai-automation-accelerator" },
    select: { id: true },
  });
  if (!t1Course) throw new Error("Tier 1 course not found");

  // 1. Rename the existing Tier 1 cold email module (idempotent)
  const koldify = await prisma.module.findFirst({
    where: {
      courseId: t1Course.id,
      parentId: null,
      title: { in: ["Cold Email", RENAMED_TITLE] },
    },
  });
  if (!koldify) throw new Error("Tier 1 'Cold Email' module not found");
  if (koldify.title !== RENAMED_TITLE) {
    await prisma.module.update({
      where: { id: koldify.id },
      data: { title: RENAMED_TITLE },
    });
    console.log(`Renamed "Cold Email" -> "${RENAMED_TITLE}"`);
  } else {
    console.log(`"${RENAMED_TITLE}" already renamed`);
  }

  // 2. Bail if the copy already exists
  const already = await prisma.module.findFirst({
    where: { courseId: t1Course.id, parentId: null, title: NEW_TITLE },
  });
  if (already) {
    console.log(`"${NEW_TITLE}" already exists — nothing to copy`);
    await prisma.$disconnect();
    return;
  }

  // 3. Source lessons: all lessons under the Tier 2 wrapper's child modules
  const source = await prisma.module.findFirst({
    where: { title: "Cold Email Outreach Course", course: { slug: "tier-2-course" } },
    include: {
      lessons: { orderBy: { order: "asc" } },
      children: {
        orderBy: { order: "asc" },
        include: { lessons: { orderBy: { order: "asc" } } },
      },
    },
  });
  if (!source) throw new Error("Tier 2 'Cold Email Outreach Course' module not found");
  const sourceLessons = [
    ...source.lessons,
    ...source.children.flatMap((c) => c.lessons),
  ];
  if (sourceLessons.length === 0) throw new Error("No source lessons found");

  // 4. Insert the new module right after the renamed one; shift later modules down
  const insertAt = koldify.order + 1;
  await prisma.module.updateMany({
    where: { courseId: t1Course.id, parentId: null, order: { gte: insertAt } },
    data: { order: { increment: 1 } },
  });

  const newModule = await prisma.module.create({
    data: {
      courseId: t1Course.id,
      parentId: null,
      title: NEW_TITLE,
      color: "#06B6D4",
      order: insertAt,
    },
  });

  for (let i = 0; i < sourceLessons.length; i++) {
    const l = sourceLessons[i];
    await prisma.lesson.create({
      data: {
        moduleId: newModule.id,
        slug: l.slug,
        title: l.title,
        description: l.description,
        type: l.type,
        loomUrl: l.loomUrl,
        durationSec: l.durationSec,
        externalUrl: l.externalUrl,
        advisorSlug: l.advisorSlug,
        tableData: l.tableData ?? undefined,
        thumbnailUrl: l.thumbnailUrl,
        cardBg: l.cardBg,
        order: i,
        isPublished: l.isPublished,
      },
    });
  }

  console.log(
    `Created "${NEW_TITLE}" at order ${insertAt} with ${sourceLessons.length} lessons`
  );
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
