import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

// Adds a "Running the Meeting" sub-module to the Tier 1 course's
// Sales & Outreach section, after Appointment Setting.

const SUBMODULE_TITLE = "Running the Meeting";

const QUESTION_BANK_DOC =
  "https://docs.google.com/document/d/1tZ35sqg_jT2AZvg4MsBmRfEPqvSKFrIPTTXFzjo4FWY/edit?tab=t.dl4cceye4kgf#heading=h.cjw5blur3cgj";

const LESSONS = [
  {
    slug: "booking-the-meeting",
    title: "Booking the Meeting",
    loomUrl: "https://www.loom.com/share/72e3aea6ec5640f284ed42a83ed828f2",
    description:
      "How to go from interested lead to a meeting on the calendar — locking in a time, setting expectations, and making sure they actually show up.",
  },
  {
    slug: "discovery-call-framework",
    title: "Discovery Call Framework",
    loomUrl: "https://www.loom.com/share/8ddb06ebb7404c5eb03727e7cd532d3c",
    description:
      "The framework for running a discovery call from open to close — the structure to follow so you stay in control of the conversation and leave with everything you need.",
  },
  {
    slug: "discovery-call-question-bank",
    title: "Discovery Call Question Bank",
    loomUrl: "https://www.loom.com/share/c283aa1d4a2242d49618d1d2042c52e7",
    description:
      "The exact questions to ask on a discovery call — and why each one matters for qualifying the prospect and setting up the close.\n\n" +
      `Question bank document: ${QUESTION_BANK_DOC}`,
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
    const appt = sales.children.find((c) => c.title === "Appointment Setting");
    const insertAt = appt ? appt.order + 1 : sales.children.length;
    await prisma.module.updateMany({
      where: { parentId: sales.id, order: { gte: insertAt } },
      data: { order: { increment: 1 } },
    });
    sub = await prisma.module.create({
      data: { courseId: sales.courseId, parentId: sales.id, title: SUBMODULE_TITLE, order: insertAt },
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
      console.log(`Updated "${lesson.title}"`);
    } else {
      const last = await prisma.lesson.findFirst({
        where: { moduleId: sub.id },
        orderBy: { order: "desc" },
        select: { order: true },
      });
      await prisma.lesson.create({
        data: { moduleId: sub.id, slug: lesson.slug, order: (last?.order ?? -1) + 1, ...data },
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
