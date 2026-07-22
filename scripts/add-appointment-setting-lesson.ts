import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

// Adds an "Appointment Setting" sub-module to the Tier 1 course's
// Sales & Outreach section (between Partnerships and Pricing & Closing)
// with Volodymyr's "Appointment Setting Process A-Z" Loom video.

const SUBMODULE_TITLE = "Appointment Setting";

const VOLODYMYR_NOTE =
  "Volodymyr is a partner with Hamza. He has fantastic content specifically on sales, appointment setting and closing. Please go through his videos thoroughly.";

const LESSONS = [
  {
    slug: "appointment-setting-process-a-z",
    title: "Appointment Setting Process A-Z",
    loomUrl: "https://www.loom.com/share/d3ca4d2aec4b4d37ad4f2b1937616553",
    description:
      VOLODYMYR_NOTE +
      "\n\nCompanion document: https://docs.google.com/document/d/1JjaNFskiQNiFlI2mjwzQgO0I-VdSJD_zWZhwpBJIbPQ/edit?tab=t.0#heading=h.aoej1ljzinth",
  },
  {
    slug: "how-to-follow-up-with-leads",
    title: "How to Follow Up with Leads",
    loomUrl: "https://www.loom.com/share/910a2d735b644df395dc1983839fd4d3",
    description: VOLODYMYR_NOTE,
  },
  {
    slug: "stop-cancellations-no-shows",
    title: "How to Stop Cancellations & No Shows",
    loomUrl: "https://www.loom.com/share/c4a7615fac314dd89bc6aa27d38cc70d",
    description: VOLODYMYR_NOTE,
  },
];

async function main() {
  const sales = await prisma.module.findFirst({
    where: { title: "Sales & Outreach", course: { slug: "ai-automation-accelerator" } },
    include: { children: { orderBy: { order: "asc" } } },
  });
  if (!sales) throw new Error("Sales & Outreach module not found");

  let sub = sales.children.find((c) => c.title === SUBMODULE_TITLE);
  if (!sub) {
    // Insert after Partnerships (order 1); bump Pricing & Closing and later down
    const insertAt = 2;
    await prisma.module.updateMany({
      where: { parentId: sales.id, order: { gte: insertAt } },
      data: { order: { increment: 1 } },
    });
    sub = await prisma.module.create({
      data: {
        courseId: sales.courseId,
        parentId: sales.id,
        title: SUBMODULE_TITLE,
        order: insertAt,
      },
    });
    console.log(`Created sub-module "${SUBMODULE_TITLE}" at order ${insertAt}`);
  } else {
    console.log(`Sub-module "${SUBMODULE_TITLE}" already exists`);
  }

  for (const lesson of LESSONS) {
    const data = {
      title: lesson.title,
      description: lesson.description,
      type: "VIDEO" as const,
      loomUrl: lesson.loomUrl,
      isPublished: true,
    };
    const existing = await prisma.lesson.findFirst({
      where: { moduleId: sub.id, slug: lesson.slug },
    });
    if (existing) {
      await prisma.lesson.update({ where: { id: existing.id }, data });
      console.log(`Updated lesson "${lesson.title}"`);
    } else {
      const lastLesson = await prisma.lesson.findFirst({
        where: { moduleId: sub.id },
        orderBy: { order: "desc" },
        select: { order: true },
      });
      await prisma.lesson.create({
        data: {
          moduleId: sub.id,
          slug: lesson.slug,
          order: (lastLesson?.order ?? -1) + 1,
          ...data,
        },
      });
      console.log(`Created lesson "${lesson.title}"`);
    }
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
