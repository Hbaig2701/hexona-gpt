import "dotenv/config";
import { PrismaClient, type LessonType } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { slugify } from "@/lib/advisory";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

type SeedLesson = {
  title: string;
  description?: string;
  type?: LessonType; // defaults to VIDEO
  externalUrl?: string;
};
type SeedSub = { title: string; lessons: SeedLesson[] };
type SeedPhase = { title: string; lessons?: SeedLesson[]; subs?: SeedSub[] };

// ── AI Arbitrage Program (Tier 2) ─────────────────────────────────────────
const PHASES: SeedPhase[] = [
  {
    title: "Phase I: Introduction",
    subs: [
      {
        title: "Welcome & How This Program Works",
        lessons: [
          {
            title: "What is AI Automation and Understanding the Opportunity",
            description:
              "Why businesses across industries are rapidly adopting AI automation. We break down the real-world problems it solves — reducing manual work, increasing efficiency, cutting costs — and explore common use cases like lead generation, customer support, and workflow automation.",
          },
          {
            title: "The AI Agency Business Model & Sales Process",
            description:
              "A step-by-step breakdown of the fulfillment process — from running discovery calls to closing deals and handing off projects. We show you how each stage flows and how to smoothly transition from initial interest to a fully implemented automation solution.",
          },
          {
            title: "How You Make Money (The Business Model)",
            description:
              "How the AI automation business model generates revenue by marking up service costs. We break down pricing strategies, how to package your offers, and walk through real-world profit margin examples so you can confidently price your deals and maximize your earnings.",
          },
        ],
      },
      {
        title: "Know Your Products",
        lessons: [
          {
            title: "Our Pre-Made Products (Blueprints Overview)",
            description:
              "A complete walkthrough of every pre-made blueprint we offer — what each one does, who it's for, and how to position it to clients.\n\nAccess it here: https://docs.google.com/document/d/1suIG5X-3SSnNkHMUIrqgPDWOYZbgeWF-EDmWTSFKjlQ/edit?usp=sharing",
          },
          {
            title: "Custom Deals vs Blueprints",
            description:
              "The difference between selling our pre-made blueprint solutions and scoping custom projects, and when to use each approach.",
          },
          {
            title: "How We Assess Feasibility & Set Our Quotes",
            description:
              "How our team evaluates what's possible, how we determine pricing, and what goes into the quoting process behind the scenes.",
          },
          {
            title: "Real World Automation Examples & Case Studies",
            description:
              "Real-world examples of how businesses are using AI automation to save time, reduce costs, and scale faster. Concrete examples across industries like real estate, e-commerce, healthcare, and construction.",
          },
          {
            title: "How to Submit a Project Intake Form",
            description:
              "A walkthrough of how to access and submit the intake form for projects you want fulfilled.\n\nAccess the form here: https://tally.so/r/w847EA",
          },
          {
            title: "Communicating with the Fulfillment Team",
            description:
              "Meet Ayman, our Head of Fulfillment. During your first week you'll be introduced to him via WhatsApp — your point of contact for everything technical. Feel free to keep open communication about project updates, strategy, pricing, and more.",
          },
          {
            title: "Proposal Turnaround & What to Tell Clients",
            description:
              "The difference between pre-made blueprints and custom projects, how the proposal process works, and the exact scripts to use when clients ask about timelines.",
          },
        ],
      },
      {
        title: "Study Our Case Studies",
        lessons: [
          {
            title: "How to Leverage Our Case Studies & Past Projects",
            description:
              "How to effectively reference our case studies and past projects to build trust and close deals faster. How to show real results in your outreach, discovery calls, and proposals — even if you're brand new.",
          },
          {
            title: "How We Saved a Tire Shop $50,000 in Recovered Revenue",
            description:
              "How we helped a tire shop recover over $50,000 in lost revenue by automating their lead follow-up and missed-call handling. The specific bottlenecks they faced, the automation we implemented, and the measurable impact on their bottom line.",
          },
          {
            title: "How We Helped a Daycare Get a 15% Increase in Registrations and over $80,000 in Annual Revenue",
            description:
              "How we helped a daycare center increase registrations by 15% and generate over $80,000 in additional annual revenue. How automation improved their lead follow-up, parent communication, and inquiry tracking.",
          },
          {
            title: "How We Helped a Solar Installer Unlock $24.5K in Profit from Dormant Leads in Under 3 Weeks (DBR)",
            description:
              "How we turned a 4,000-lead dead list into $24,500 in net profit for a solar company using an AI-powered Database Reactivation (DBR) system. The full breakdown — from campaign setup and message sequencing to the tech stack, AI persona, and appointments.",
          },
          {
            title: "How We Helped a Dating Coach Achieve a 34X ROI",
            description:
              "A real client success story — how we helped a dating coach achieve a 34X ROI and save over 15 hours per week using AI automation. An inside look at the problems they faced, the solution we implemented, and the exact results.",
          },
          {
            title: "How We Achieved $312K in Additional Revenue in 6 Months from Digital Loyalty Transformation",
            description:
              "A Digital Loyalty Program implementation we did that drove $312K in additional revenue over six months.",
          },
          {
            title: "How We Helped a Property Manager Reduce Leasing Cycles by 20 Percent",
            description:
              "How we helped a property management company reduce their leasing cycle by 20% through targeted automation — streamlining lead response, scheduling, and follow-up to speed up tenant acquisition. Great for pitching property management automation.",
          },
          {
            title: "How We Helped a Waste Removal Company Get +100 New Reviews & #1 Google Ranking",
            type: "RESOURCE",
            externalUrl:
              "https://docs.google.com/document/d/1mFjlEu9xqESnNyrfPNqhfFdS9z8mar-M8jPpAhyI1Za/edit?usp=sharing",
            description: "Access this case study via the link.",
          },
          {
            title: "Our B2B Outbound Cold Email Case Studies",
            description: "A list of case studies related to our cold email campaigns.",
          },
          {
            title: "Proposal Directory",
            type: "RESOURCE",
            description:
              "A resource that gives you insight into what other businesses and industries are asking for in terms of AI automation. Use it for inspiration during sales meetings and for deciding who to target. (Admin: paste the directory link here.)",
          },
          {
            title: "Case Studies by Industry",
            type: "RESOURCE",
            externalUrl:
              "https://docs.google.com/document/d/1mFjlEu9xqESnNyrfPNqhfFdS9z8mar-M8jPpAhyI1Za/edit?usp=sharing",
            description: "Access our case studies filtered by industry.",
          },
        ],
      },
    ],
  },
  {
    title: "Phase II: Your Identity & Positioning",
    subs: [
      {
        title: "Positioning (Not Niching)",
        lessons: [
          {
            title: "Two Ways to Position Yourself",
            description:
              "The two positioning paths available to you — business profile (broad) or industry niche (focused) — with pros and cons of each so you can pick the right one for your situation.",
          },
          {
            title: "Defining Your Ideal Client (Either Path)",
            description:
              "Define exactly who you're going after using a step-by-step framework, whether you chose the broad or niched positioning path.",
          },
          {
            title: "Your Elevator Pitch & Positioning Statement",
            description:
              "Build your one-sentence positioning statement using a fill-in-the-blank framework so you always have a clear, confident answer when someone asks what you do.",
          },
        ],
      },
      {
        title: "Setting Up Your Brand",
        lessons: [
          {
            title: "Naming Your AI Business",
            description:
              "How to choose a name for your AI agency that sounds professional and credible without overthinking it.",
          },
          {
            title: "The Minimum Viable Brand (Logo, Colors, Domain)",
            description:
              "Set up the minimum brand assets you need to look professional — a logo, brand colors, and a domain — using fast, AI-powered tools.",
          },
          {
            title: "Making You a Trust Authority",
            description:
              "Build your trust identity through visual assets that make you look like an established founder and AI entrepreneur.",
          },
          {
            title: "AI Photoshoot Bundle",
            type: "RESOURCE",
            description:
              "Access our AI photoshoot prompts to generate professional-looking headshots and visual assets without hiring a photographer. (Admin: paste the prompts link here.)",
          },
          {
            title: "LinkedIn Profile Set Up",
            description:
              "Optimize your LinkedIn profile using our done-for-you template so you look like a credible AI professional before you start reaching out.",
          },
          { title: "LinkedIn Optimized Profile #1", description: "Walkthrough of an optimized LinkedIn profile example you can model." },
          { title: "LinkedIn Optimized Profile #2", description: "Walkthrough of an optimized LinkedIn profile example you can model." },
          { title: "LinkedIn Optimized Profile #3", description: "Walkthrough of an optimized LinkedIn profile example you can model." },
        ],
      },
      {
        title: "Setting Up Your CRM",
        lessons: [
          {
            title: "Getting Hexona + Essential Automation Tools",
            description:
              "Get set up with Hexona and the essential automation tools.\n\nAccess Hexona here: https://licensing.hexonasystems.com/ — use the code GET1000FF",
          },
          {
            title: "Hexona Systems Walkthrough",
            description:
              "An overview of key automation platforms like Make.com, Zapier, and GoHighLevel. Their capabilities and how to position them in client conversations.",
          },
          {
            title: "Set Up Your Booking Calendar",
            description:
              "Set up your booking calendar so prospects can schedule calls with you directly, with automated reminders and confirmations.",
          },
          {
            title: "Using HexonaGPT",
            description: "How to use our proprietary agency companion SaaS, HexonaGPT.",
          },
          {
            title: "Set Up Your Payment Processor (Stripe)",
            description:
              "Set up Stripe so you can accept payments from clients as soon as you start closing deals.",
          },
          {
            title: "Set Up Your Pipeline",
            description: "How to set up sales pipelines for yourself and for your leads / clients.",
          },
          { title: "Creating Your Website", description: "Build your agency website." },
        ],
      },
    ],
  },
  {
    title: "Phase III: Sales Mastery",
    lessons: [
      {
        title: "Understanding Automation-Specific Pain Points",
        description:
          "The common pain points that make businesses ideal candidates for automation — time-consuming manual tasks, missed leads, and inconsistent workflows. How to spot these inefficiencies during conversations and position automation as the clear solution.",
      },
    ],
    subs: [
      {
        title: "The Sales Process",
        lessons: [
          {
            title: "Discovery Call Framework (What to Offer)",
            description:
              "Exactly which businesses you should be targeting with your automation services — and, more importantly, which ones to avoid.",
          },
          {
            title: "Closing Framework (Discovery → Close)",
            description:
              "The full process for moving from a discovery conversation into a confident close, including how to recap challenges and position the solution.\n\nAccess the document here: https://docs.google.com/document/d/19skymtgxuDEXacPPJtCL85cPnXNY_gtDDRu1RstbUU4/edit?usp=sharing",
          },
          {
            title: "How to Price & Sell High-Ticket Automations",
            description:
              "How to confidently sell high-ticket automation services using value-based pricing. How to position your offer around business outcomes rather than hours or tools, how to justify premium pricing with real ROI, and tips for handling price objections.",
          },
          {
            title: "Creating & Sending Contracts",
            description:
              "How to create and send professional contracts using our template so you can formalize agreements and protect yourself on every deal.",
          },
          {
            title: "Analyzing the Proposals We Give You",
            description:
              "How to use our Proposal Analyzer GPT to review proposals from the directory and understand deal structure. Upload the PDFs accordingly.\n\nAccess it here: https://chatgpt.com/share/690aaf07-7da0-8009-9204-b32592c9aa1d",
          },
        ],
      },
    ],
  },
  {
    title: "Phase IV: Outreach & Getting Meetings",
    subs: [
      {
        title: "Warm Network Activation (Start Here)",
        lessons: [
          {
            title: "Your Warm Network is Your Unfair Advantage",
            description:
              "Build your warm prospect list, categorize contacts by relationship strength, and learn how to start conversations that lead to your first deal.",
          },
          {
            title: "Using Sales GPT to Plan Your Warm Outreach",
            description:
              "Exactly how to input a warm contact into the Sales GPT and get a personalized approach plan, opening scripts, and follow-up sequences.",
          },
        ],
      },
      {
        title: "Cold Outreach",
        lessons: [
          {
            title: "Rotating Problem-Based Hooks (Your Outreach Strategy)",
            description:
              "How to craft specific, problem-based outreach messages that get replies, and how to rotate them across different prospects and industries.",
          },
          {
            title: "Getting Scripts / Talk Tracks from SalesGPT",
            description:
              "How to use the Sales GPT to generate cold DMs, cold emails, and follow-up sequences customized to specific prospects.",
          },
          {
            title: "Cold Loom Outreach Masterclass",
            description:
              "How to create hyper-personalized Loom video outreach that cuts through the noise and books meetings by showing prospects exactly what you can do.",
          },
        ],
      },
      {
        title: "Partnerships & Referrals",
        lessons: [
          {
            title: "Partner Value Stack",
            description:
              "How to build referral partnerships that send you inbound deals, including the partner value stack and how to win trust.",
          },
          {
            title: "How to Win Partner Trust",
            description:
              "How to build referral partnerships that send you inbound deals, including the partner value stack and how to win trust.",
          },
          {
            title: "How to Structure Partnerships",
            description:
              "How to build referral partnerships that send you inbound deals, including the partner value stack and how to win trust.",
          },
          {
            title: "Influencer Partner Sales Call & Incentive",
            description:
              "How to structure partnership deals with influencers so they send you qualified leads in exchange for a referral incentive.",
          },
          {
            title: "Agency Partner Sales Call & Incentive",
            description:
              "How to partner with other agencies that don't offer AI services and incentivize them to send you their overflow deals.",
          },
          {
            title: "Competitor Partner Sales Call & Incentive",
            description:
              "How to structure referral relationships with competitors so you can exchange leads on projects that aren't the right fit for either side.",
          },
        ],
      },
    ],
  },
  {
    title: "Phase V: Running Your AI Agency",
    subs: [
      {
        title: "Client Management",
        lessons: [
          {
            title: "Client Relationship Management",
            description:
              "How to manage client relationships effectively from the moment a deal is closed. Best practices for setting expectations, maintaining clear communication, and ensuring smooth project delivery. How to retain clients long-term and turn them into referrals.",
          },
          {
            title: "Setting Client Expectations on Timelines",
            description:
              "The exact scripts for communicating with clients at every stage — from signing to delivery — so you never lose trust during the fulfillment process.",
          },
        ],
      },
      {
        title: "Scaling & Growth",
        lessons: [
          {
            title: "Done-For-You Cold Email Campaigns",
            description:
              "Our preferred Cold Email Vendor runs campaigns for you. Book a call here: https://koldify.info/strategy-call — they've worked with various members of this program, so they have a deep understanding of how to sell AI automation services.",
          },
          {
            title: "Done-For-You Facebook Ads & Lead Generation",
            description:
              "Our partner agency's Facebook Ads and Lead Generation service, built to help you attract qualified leads on autopilot. If you're looking to scale without spending time managing ad campaigns or figuring out targeting, this offer can accelerate your growth.",
          },
          {
            title: "Done-for-You Website & Funnel Development",
            description:
              "If you need an agency website for yourself or for your clients, book a call with our partner.",
          },
        ],
      },
    ],
  },
  {
    title: "Phase VI: Technical Overview (Reference Only)",
    subs: [
      {
        title: "Automation Basics",
        lessons: [
          {
            title: "Understanding Automation Terminology",
            description:
              "The technical terms and concepts you'll encounter in AI automation so you can speak confidently without needing a development background.",
          },
          {
            title: "Access More Technical Tutorials and Learning",
            description:
              "Access our in-depth training videos on the Hexona Systems software: https://www.skool.com/hexona",
          },
        ],
      },
      {
        title: "Blueprint Reference Library",
        lessons: [
          { title: "Lead Gen - Instagram DM Agent", type: "RESOURCE", description: "Access all the details about this blueprint. (Admin: paste the blueprint link here.)" },
          { title: "Lead Gen - B2B Email System", type: "RESOURCE", description: "Access all the details about this blueprint. (Admin: paste the blueprint link here.)" },
          { title: "Lead Gen - AI Website Chat Widget", type: "RESOURCE", description: "Access all the details about this blueprint. (Admin: paste the blueprint link here.)" },
          { title: "Lead Conversion - Speed-to-Lead AI Agent", type: "RESOURCE", description: "Access all the details about this blueprint. (Admin: paste the blueprint link here.)" },
          { title: "Lead Conversion - MCTB + Voice AI", type: "RESOURCE", description: "Access all the details about this blueprint. (Admin: paste the blueprint link here.)" },
          { title: "Lead Conversion - Email Auto-Responder", type: "RESOURCE", description: "Access all the details about this blueprint. (Admin: paste the blueprint link here.)" },
          { title: "Lead Conversion - Lead Nurture Sequences", type: "RESOURCE", description: "Access all the details about this blueprint. (Admin: paste the blueprint link here.)" },
          { title: "Lead Conversion - AI Appointment Reminders & No-Show Recovery", type: "RESOURCE", description: "Access all the details about this blueprint. (Admin: paste the blueprint link here.)" },
          { title: "Client Retention - Database Reactivation", type: "RESOURCE", description: "Access all the details about this blueprint. (Admin: paste the blueprint link here.)" },
          { title: "Client Retention - Digital Loyalty System", type: "RESOURCE", description: "Access all the details about this blueprint. (Admin: paste the blueprint link here.)" },
          { title: "Client Retention - Reputation Domination", type: "RESOURCE", description: "Access all the details about this blueprint. (Admin: paste the blueprint link here.)" },
        ],
      },
    ],
  },
  {
    title: "Cold Email Outreach Course",
    subs: [
      {
        title: "DIY Cold Email Outreach",
        lessons: [
          {
            title: "Email Acquisition Flow Overview",
            description:
              "A 30,000-ft overview of the entire 6-figure cold email acquisition flow — from finding your email leads to getting them on a sales call.",
          },
          {
            title: "Acquiring Your Email Domains pt. 1",
            description:
              "How to get the email domains you'll use to send your actual cold emails — these are the email addresses you'll send every cold email from.",
          },
          {
            title: "Acquiring Email Domains pt. 2",
            description:
              "The follow-up to part 1. The cheaper source to get your email domains if you're looking to send around 500+ cold emails per day.",
          },
          {
            title: "Setting Up Your Email Domain",
            description:
              "Setting up your email domains. This involves setting up custom records in your domain settings.",
          },
          {
            title: "Integrating The Email Domain System",
            description:
              "How to integrate your emails with Instantly — the core component of the entire cold email system.",
          },
          { title: "Finding Your Leads", description: "How to find the A-tier leads for whatever niche you're in." },
          {
            title: "Finding Your Leads Email",
            description:
              "How to find the email of the leads you scrape. Tools that help you find any business's website in seconds, then how to validate the emails so you're not sending cold emails to fake accounts.",
          },
          {
            title: "Verifying Your Leads",
            description:
              "Expanding on 'Finding Your Leads Email' — the in-depth way of verifying that the email you found is in fact a real email.",
          },
          {
            title: "Uploading Leads Into The System",
            description:
              "Uploading your leads into Instantly, the main email platform. Do this only after the previous steps so you have a clean, validated lead list.",
          },
          {
            title: "Email Personalization (Increase Replies)",
            description:
              "The two types of email personalization. Every cold email you send should be personalized to stand out, and this is the most efficient way to do personalization at scale.",
          },
          {
            title: "Text Personalization",
            description:
              "An A-Z walkthrough of doing text personalization in your emails. 'First line' writing, where you have a custom line for every lead to make your email stand out.",
          },
          {
            title: "Scripting The Perfect Email",
            description:
              "How to script your entire email body to stand out and create enough stimuli for the lead to book a call. The body structure, and Spintax — an Instantly feature that makes every single email just a little different.",
          },
          {
            title: "Automated Video Personalized Emails",
            description:
              "How to mass-personalize emails with videos using a tool called Pitch Lane. Stand out from everyone who ever pitched your lead and create thousands of mass personalized video emails in 20-30 minutes.",
          },
          {
            title: "The Winning Follow Up System",
            description:
              "How to properly write and time your follow-up sequence after the cold email is sent. The money is in the follow-up — people ghost you on the first email, but when you keep popping up in their inbox they'll get back to you.",
          },
          {
            title: "Handling Replies",
            description:
              "How to properly handle replies in your inbox, with objection-handling scripts. Handle all your replies the best way possible to increase your booking rate.",
          },
        ],
      },
    ],
  },
];

async function main() {
  const course = await prisma.course.findFirst({ where: { requiredTier: "TIER_2" } });
  if (!course) {
    console.error("No Tier 2 course found. Run scripts/create-tier2-course.ts first.");
    process.exit(1);
  }

  // Update course metadata
  await prisma.course.update({
    where: { id: course.id },
    data: {
      title: "AI Arbitrage Program",
      subtitle:
        "Hamza Automates' Arbitrage Program is the fastest way to start and scale an AI business — giving you done-for-you fulfillment and resources.",
      // Stays unpublished — admin adds Looms then publishes.
    },
  });

  // Wipe existing modules (cascades lessons) for a clean reseed
  const existingModules = await prisma.module.findMany({
    where: { courseId: course.id },
    select: { id: true },
  });
  if (existingModules.length > 0) {
    await prisma.module.deleteMany({ where: { courseId: course.id } });
    console.log(`Cleared ${existingModules.length} existing module(s).`);
  }

  // Course-wide unique slugs for routing
  const usedSlugs = new Set<string>();
  const uniqueSlug = (title: string): string => {
    const base = slugify(title) || "lesson";
    let slug = base;
    let n = 1;
    while (usedSlugs.has(slug)) slug = `${base}-${n++}`;
    usedSlugs.add(slug);
    return slug;
  };

  let phaseOrder = 0;
  let lessonCount = 0;
  let moduleCount = 0;

  const createLessons = async (moduleId: string, lessons: SeedLesson[]) => {
    let order = 0;
    for (const l of lessons) {
      await prisma.lesson.create({
        data: {
          moduleId,
          slug: uniqueSlug(l.title),
          title: l.title,
          description: l.description ?? null,
          type: l.type ?? "VIDEO",
          externalUrl: l.externalUrl ?? null,
          order: order++,
          isPublished: true,
        },
      });
      lessonCount++;
    }
  };

  for (const phase of PHASES) {
    const phaseModule = await prisma.module.create({
      data: { courseId: course.id, title: phase.title, order: phaseOrder++ },
    });
    moduleCount++;

    // Direct lessons on the phase (e.g. Phase III intro lesson)
    if (phase.lessons?.length) {
      await createLessons(phaseModule.id, phase.lessons);
    }

    // Sub-modules
    let subOrder = 0;
    for (const sub of phase.subs ?? []) {
      const subModule = await prisma.module.create({
        data: {
          courseId: course.id,
          parentId: phaseModule.id,
          title: sub.title,
          order: subOrder++,
        },
      });
      moduleCount++;
      await createLessons(subModule.id, sub.lessons);
    }
  }

  console.log(`Seeded "AI Arbitrage Program" (Tier 2):`);
  console.log(`  ${PHASES.length} top-level modules`);
  console.log(`  ${moduleCount} total modules (incl. sub-modules)`);
  console.log(`  ${lessonCount} lessons`);
  console.log(`Course is UNPUBLISHED — add Looms, then publish at /admin/advisory/courses.`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
