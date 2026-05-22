import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

// Descriptions in the same order as the lessons appear in the Cold Email module (0-7).
const DESCRIPTIONS: string[] = [
  // 0. Intro
  `In this short introduction, you'll meet our team and get a quick overview of what we do. We share the scale of outbound we operate at and the types of clients we work with, giving you insight into the level of systems behind this course.

This sets the foundation for everything that follows, so you understand exactly who this is for and the results this approach is built to achieve.`,

  // 1. Why Volume Wins
  `In this video, we cover one of the most important (and misunderstood) concepts in outbound: volume. You'll learn why sending more — the right way — directly impacts your ability to generate leads, conversations, and revenue.

We also explain how scaling volume properly allows you to remove guesswork and rely on predictable outcomes instead of hoping a few emails perform.`,

  // 2. The Real Cost & Math
  `This video breaks down the numbers behind outbound email so you can clearly understand the cost, return, and scalability of your system. We walk through how small improvements in reply rates and volume can significantly impact your overall results.

By understanding the math, you'll be able to make smarter decisions, optimize performance, and confidently scale your outreach without wasting resources.`,

  // 3. New Age of Email
  `In this video, we explore how outbound email has evolved and what it takes to succeed in today's environment. From smarter infrastructure to more advanced systems, the game has completely changed.

You'll learn what separates those who struggle from those who consistently book meetings, and how to position yourself ahead of the curve using modern strategies.

Link to website: https://koldmail.io
Get started and create an account — you can purchase once you log in.

WhatsApp: +1 (647) 888-2381`,

  // 4. Scaling Inboxes (The Right Way)
  `In this video, I discuss the benefits of using domains and inboxes for cold emailing, emphasizing that this method can be 70% more cost-effective. I recommend checking out the previous videos for foundational information and insights from successful agency owners who are currently using this approach.

Link to website: https://koldmail.io
Get started and create an account — you can purchase once you log in.`,

  // 5. 1,000 Leads for $3
  `In this video, I go over the challenges of using Apollo for lead generation — particularly its high pricing and the need for additional email verification (with the added cost). A more cost-effective alternative is introduced through our API scraper, which enables the collection of verified leads at a significantly lower cost — 10,000 leads for $30 compared to Apollo's $59 for 2,500 unverified leads.

The video also walks through how to select the right filters to optimize the lead scraping process. You're encouraged to fill out a form with your Apollo link or preferred keywords so the data can be scraped accurately.

A special offer for LinkedIn leads is also included, targeting high-intent prospects who are actively searching for AI and automation solutions.

Order leads here: https://order.skrapper.co
LinkedIn leads coupon code: hamza40%`,

  // 6. Live Campaign Breakdown
  `In this video, you'll get a full cold email campaign setup using PlusVibe. I break down why it's one of the best-value tools for scaling outreach — with up to 30,000 active leads and 25,000 emails per month at the best price. You can also increase limits for only $10–15.

It includes a walkthrough of live campaign performance, showing around a 1% reply rate and under 3% bounce rate using in-house verification. The video also covers a real workspace demo, including campaign settings, spintax, email copy, inbox setup, and overall campaign structure.

You'll see exactly how campaigns are built and optimized, along with common mistakes to avoid when scaling. By the end of this video, you'll be equipped to confidently launch and manage your own campaigns.

Sequencer I use: https://fly.plusvibe.ai/ls9zbg2yzoga
Custom GPT to generate spintax: https://chatgpt.com/g/g-688d7ef74f1c8191beab3b3e79d1ba92-pipl-spintaxer-by-koldify`,

  // 7. Copy That Gets Replies
  `In this video, I break down the key elements of writing effective cold email. I share two email examples — highlighting the pitfalls of a generic approach and the success of a more personalized, results-driven strategy that has achieved a 1–2% reply rate.

I cover the need for continuous testing of different hooks and variations to optimize engagement. Remember — a killer offer is crucial, and I encourage you to focus on crafting compelling subject lines and concise messages.

If you have any questions or need assistance, my team and I are here to help!`,
];

async function main() {
  // Find the Cold Email module
  const coldEmailModule = await prisma.module.findFirst({
    where: {
      title: "Cold Email",
      course: { slug: "ai-automation-accelerator" },
    },
    include: {
      lessons: { orderBy: { order: "asc" } },
      course: { select: { title: true } },
    },
  });

  if (!coldEmailModule) {
    console.error("Could not find the 'Cold Email' module.");
    process.exit(1);
  }

  console.log(`Found module: "${coldEmailModule.title}" in "${coldEmailModule.course.title}"`);
  console.log(`Has ${coldEmailModule.lessons.length} lesson(s); applying ${DESCRIPTIONS.length} descriptions.\n`);

  if (coldEmailModule.lessons.length !== DESCRIPTIONS.length) {
    console.warn(
      `⚠ Lesson count (${coldEmailModule.lessons.length}) does not match description count (${DESCRIPTIONS.length}). Will only update overlapping range.`
    );
  }

  const limit = Math.min(coldEmailModule.lessons.length, DESCRIPTIONS.length);
  for (let i = 0; i < limit; i++) {
    const lesson = coldEmailModule.lessons[i];
    const desc = DESCRIPTIONS[i];
    await prisma.lesson.update({
      where: { id: lesson.id },
      data: { description: desc },
    });
    console.log(`  ✓ [${i}] "${lesson.title}"  ←  ${desc.slice(0, 70).replace(/\n/g, " ")}…`);
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
