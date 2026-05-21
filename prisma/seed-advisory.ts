import { PrismaClient } from "@prisma/client";

type LessonSeed = {
  slug: string;
  title: string;
  description?: string;
  type: "VIDEO" | "CHECKPOINT" | "RESOURCE" | "TOOL_LINK" | "TABLE";
  loomUrl?: string;
  externalUrl?: string;
  advisorSlug?: string;
};

type ModuleSeed = {
  title: string;
  color?: string;
  lessons?: LessonSeed[];
  children?: ModuleSeed[];
};

type CourseSeed = {
  slug: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  requiredTier: "TIER_1" | "TIER_2" | "TIER_3";
  order: number;
  instructor: { name: string; bio?: string };
  modules: ModuleSeed[];
};

type ResourceSeed = {
  slug: string;
  title: string;
  description?: string;
  url: string;
  category?: string;
  requiredTier: "TIER_1" | "TIER_2" | "TIER_3";
  order: number;
};

const TIER1_COURSE: CourseSeed = {
  slug: "ai-automation-accelerator",
  title: "Hamza's AI Automation Accelerator",
  subtitle:
    "Everything You Need to Build and Run a Profitable AI Growth Firm. All Lessons Taught By 4-time Award Winning Entrepreneur Hamza Automates.",
  ctaLabel: "Start Accelerating",
  requiredTier: "TIER_1",
  order: 0,
  instructor: { name: "Hamza Automates", bio: "Award-Winning AI Entrepreneur" },
  modules: [
    {
      title: "Introduction",
      color: "#A855F7",
      lessons: [
        {
          slug: "welcome-to-the-accelerator",
          title: "Welcome to the Accelerator!",
          description:
            "Welcome to the AI automation accelerator. I wholeheartedly believe that this is the best decision you can make because this program is going to be the most extensive and in-depth, giving you insider details and strategies about exactly what is working today in the AI space.",
          type: "VIDEO",
        },
        {
          slug: "new-model-vs-old-way",
          title: 'The New Model vs. The "Old Way"',
          description:
            "Lesson Objective: Understand why MOST people are selling AI and starting businesses the WRONG way.",
          type: "VIDEO",
        },
        {
          slug: "ai-agency-vs-ai-growth-firm",
          title: "AI Agency vs AI Growth Firm",
          description:
            "Lesson Objective: Understand EXACTLY what is different when comparing Agencies vs Growth Firms. You should have clarity on exactly what we're building together here.",
          type: "VIDEO",
        },
        {
          slug: "building-ai-automations-with-no-coding",
          title: "Building AI Automations with No Coding",
          description:
            "Lesson Objective: Learn why you don't need to be technical or know how to code to succeed with this AI business.",
          type: "VIDEO",
        },
        {
          slug: "turning-you-into-a-trusted-authority",
          title: "Turning You into a Trusted Authority",
          description:
            "Lesson Objective: Show you the power of a personal brand and how we'll turn you into an authority.",
          type: "VIDEO",
        },
        {
          slug: "ai-growth-firm-roadmap",
          title: "The Entire AI Growth Firm Roadmap (Course Overview)",
          description:
            "Lesson Objective: See the EXACT roadmap we will follow to build your AI Growth Firm and Get Paying Customers.",
          type: "VIDEO",
        },
        {
          slug: "checkpoint-1",
          title: "Accelerator Checkpoint 1 (SUBMIT HERE)",
          description:
            "Congratulations for reaching this checkpoint! You're making progress. To Claim This Checkpoint, SUBMIT THIS FORM. We'll be able to then track your progress and ensure you're on pace for success.",
          type: "CHECKPOINT",
        },
      ],
    },
    {
      title: "Choosing Your Niche",
      color: "#84CC16",
      lessons: [
        {
          slug: "finding-potential-niches",
          title: "Finding Potential Niches",
          description:
            "Lesson Objective: Understand what makes a 'good' niche and how to find uncontested ones.",
          type: "VIDEO",
        },
        {
          slug: "research-golden-markets",
          title: "How to do Research for 'Golden Markets'",
          description:
            "Lesson Objective: How to Research and Find a Golden Market (Niche).",
          type: "VIDEO",
        },
        {
          slug: "golden-niches",
          title: "Golden Niches (Choose from Here)",
          description:
            "Access the Golden Niches Here. We will continue adding and expanding on this list as metrics change.",
          type: "RESOURCE",
          externalUrl: "",
        },
        {
          slug: "picking-the-right-niche",
          title: "Picking The Right Niche",
          description:
            "Lesson Objective: How to Score Potential Niches to Find the Best Ones.",
          type: "VIDEO",
        },
        {
          slug: "disqualifying-certain-businesses",
          title: "Disqualifying Certain Businesses",
          description:
            "Lesson Objective: Learn how to say NO to certain businesses and only work with the best.",
          type: "VIDEO",
        },
        {
          slug: "checkpoint-2",
          title: "Checkpoint 2 (SUBMIT HERE)",
          description:
            "Congratulations for reaching this checkpoint! Submit the form to claim this checkpoint.",
          type: "CHECKPOINT",
        },
        {
          slug: "finding-your-niche-becoming-expert",
          title: "Finding Your Niche and Becoming An Expert",
          description: "Lesson Objective: Become an EXPERT in your chosen niche.",
          type: "VIDEO",
        },
        {
          slug: "expert-niche-gpt",
          title: "Access My Expert Niche GPT",
          description:
            "Use this Advisor to make you an expert in your niche. Continuously ask it questions, understanding the world of your leads and customers, and being able to speak their language.",
          type: "TOOL_LINK",
          advisorSlug: "niche-research",
        },
      ],
    },
    {
      title: "Forming Your Business and Growth Firm",
      color: "#F97316",
      lessons: [
        {
          slug: "naming-your-ai-growth-firm",
          title: "Naming Your AI Growth Firm",
          description: "Lesson Objective: Choosing a Name for Your AI Growth Firm.",
          type: "VIDEO",
        },
        {
          slug: "setting-up-brand-identity",
          title: "Setting Up Your Brand Identity",
          description:
            'Lesson Objective: Build The "Minimum Viable Brand". Enough to Get Started. Don\'t overthink.',
          type: "VIDEO",
        },
        {
          slug: "name-logo-audit",
          title: "Complimentary Name & Logo Audit",
          description:
            "Fill out this form to give us your Name & Logo and we'll respond to you with direct feedback.",
          type: "CHECKPOINT",
        },
        {
          slug: "setting-up-stripe",
          title: "Setting Up Your Stripe Account",
          description:
            "Lesson Objective: Get Your Payment Processor Set Up so you can get PAID.",
          type: "VIDEO",
        },
        {
          slug: "making-you-a-trusted-authority",
          title: "Making You a Trusted Authority",
          description:
            'Lesson Objective: Building Your Trust Identity. Visual Assets. Making you look like a founder and AI entrepreneur.',
          type: "VIDEO",
        },
        {
          slug: "ai-photoshoot-bundle",
          title: "AI Photoshoot Bundle (Prompts Included)",
          description: "Access our AI Photoshoot prompts here.",
          type: "RESOURCE",
          externalUrl: "",
        },
        {
          slug: "creating-linkedin-profile",
          title: "Creating Your Linkedin Profile",
          description: "Lesson Objective: Creating Your Professional Linkedin Profile.",
          type: "VIDEO",
        },
        {
          slug: "checkpoint-3",
          title: "Checkpoint 3 (SUBMIT HERE)",
          description:
            "Congratulations for reaching this checkpoint! Submit the form to claim this checkpoint.",
          type: "CHECKPOINT",
        },
        {
          slug: "custom-professional-website",
          title: "Create a Full Custom Professional Website",
          description:
            "Lesson Objective: Build a World-class professional website using Vibe Coding. In this tutorial we're using Google AI Studio and Netlify.",
          type: "VIDEO",
        },
      ],
    },
    {
      title: "Building Your Portfolio & Tech Tutorials",
      color: "#EAB308",
      lessons: [
        {
          slug: "building-ai-portfolio",
          title: "Building Your AI Portfolio",
          description:
            "Lesson Objective: Understand Why We're Building a Portfolio and How We Will Do It.",
          type: "VIDEO",
        },
        {
          slug: "portfolio-mapping",
          title: "Portfolio Mapping",
          description:
            "Lesson Objective: Understand what we're creating in our portfolio and why it's important there.",
          type: "VIDEO",
        },
        {
          slug: "getting-hexona-systems",
          title: "Getting Hexona Systems",
          description:
            "To get your FREE Hexona Software License for 6 Months, go to licensing.hexonasystems.com. Use the discount code ACCELERATE at checkout for 100% off! You'll get instant software access and you can start following the tutorials to build your AI portfolio.",
          type: "RESOURCE",
          externalUrl: "https://licensing.hexonasystems.com",
        },
        {
          slug: "hexona-systems-walkthrough",
          title: "Hexona Systems Walkthrough",
          description:
            "Lesson Objective: Learn How Powerful Hexona Systems Software is and everything you can do.",
          type: "VIDEO",
        },
        {
          slug: "core-automations-to-build",
          title: "CORE Automations to Build",
          description:
            "In this video, you will be introduced to the set of CORE automation blueprints inside Hexona. These are the productised systems that solve the most common business problems across lead handling, conversions, and retention.",
          type: "VIDEO",
        },
        {
          slug: "why-building-all-of-this",
          title: "Why Are We Building All of This?",
          description:
            "Lesson Objective: Understand why we're building these AI Automations and putting together our portfolio.",
          type: "VIDEO",
        },
        {
          slug: "building-instagram-dm-agent",
          title: "Building Instagram DM Agent",
          description:
            "Access Hexona's Blueprint Library Here. This video covers the Instagram AI DM Agent, a blueprint designed to turn social engagement into booked appointments.",
          type: "VIDEO",
        },
        {
          slug: "checkpoint-4",
          title: "Checkpoint 4 (SUBMIT HERE)",
          description:
            "Congratulations for reaching this checkpoint! You've made your Instagram DM Agent! Submit the form to claim this checkpoint.",
          type: "CHECKPOINT",
        },
        {
          slug: "building-voice-ai-receptionist",
          title: "Building a Voice AI Receptionist",
          description:
            "Access Hexona's Blueprint Library Here. This video covers the Voice Agent, a blueprint that ensures no call is ever wasted.",
          type: "VIDEO",
        },
        {
          slug: "checkpoint-4-1",
          title: "Checkpoint 4.1 (SUBMIT HERE)",
          description:
            "Congratulations for reaching this checkpoint! You've made your Voice AI Receptionist! Submit the form to claim this checkpoint.",
          type: "CHECKPOINT",
        },
        {
          slug: "missed-call-text-back",
          title: "Building a Missed Call Text Back System",
          description:
            "This tutorial goes through two ways that you can set up a missed call text back system with an AI agent with static SMSs. Both are effective, and it depends upon your goals.",
          type: "VIDEO",
        },
        {
          slug: "website-chat-widget",
          title: "Building a Website Chat Widget",
          description:
            "Access Hexona's Blueprint Library Here. This video introduces the Website Chat Widget, a blueprint built to capture leads directly from a business's website.",
          type: "VIDEO",
        },
        {
          slug: "speed-to-lead-sms",
          title: "Building a Speed-to-Lead SMS Agent",
          description:
            "Access Hexona's Blueprint Library Here. This video covers the Speed-to-Lead SMS Agent, a system designed to convert new inquiries into booked appointments before competitors even respond.",
          type: "VIDEO",
        },
        {
          slug: "database-reactivation",
          title: "Performing a Database Reactivation",
          description:
            "Here is an in-depth tutorial on how you can build a database reactivation for a business to wake up all of their old leads by offering a promotion, discount, or time-sensitive offer.",
          type: "VIDEO",
        },
        {
          slug: "lead-nurture-sequences",
          title: "Building Lead Nurture Sequences",
          description:
            "Access Hexona's Blueprint Library Here. This video explains the Lead Nurture Sequence, a blueprint designed to turn unresponsive leads into booked appointments.",
          type: "VIDEO",
        },
        {
          slug: "demo-your-portfolio",
          title: "Demo Your Portfolio",
          description:
            "Lesson Objective: Showcase your portfolio to leads and prospects, and let them actually try it out themselves.",
          type: "VIDEO",
        },
        {
          slug: "create-booking-calendar",
          title: "Create Your Booking Calendar",
          description:
            "Lesson Objective: Create your booking calendar so prospects can find a time to meet with you. This is a substitute for tools like CALENDLY. They work the same way.",
          type: "VIDEO",
        },
      ],
    },
    {
      title: "Building Your Offer",
      color: "#8B5CF6",
      lessons: [
        {
          slug: "building-your-offer",
          title: "Building Your Offer",
          description:
            "Lesson Objective: Learning the Different Types of Offers and Building Your Offer.",
          type: "VIDEO",
        },
        {
          slug: "how-trojan-horse-offers-work",
          title: "How Trojan Horse Offers Work",
          description: "Lesson Objective: Learning How Trojan Horse Offers Work in Practice.",
          type: "VIDEO",
        },
        {
          slug: "trojan-horse-website-tracking",
          title: "Trojan Horse Offer - Website Tracking",
          description: "Learn Everything About This Trojan Horse Offer and What You Need to Offer it Here.",
          type: "VIDEO",
        },
        {
          slug: "trojan-horse-aeo",
          title: "Trojan Horse Offer - AEO (AI SEO)",
          description: "Learn about this Trojan Horse Offer here.",
          type: "VIDEO",
        },
        {
          slug: "trojan-horse-ai-employee-saas",
          title: "Trojan Horse Offer - AI Employee Building SaaS",
          description: "Learn about this Trojan Horse Offer here.",
          type: "VIDEO",
        },
        {
          slug: "trojan-horse-ai-ads",
          title: "Trojan Horse Offer - AI Generated Ads",
          description: "Learn about this Trojan Horse Offer here.",
          type: "VIDEO",
        },
        {
          slug: "checkpoint-5",
          title: "Checkpoint 5 (SUBMIT HERE)",
          description:
            "Congratulations for reaching this checkpoint! Submit the form to claim this checkpoint.",
          type: "CHECKPOINT",
        },
        {
          slug: "how-inbound-system-works",
          title: "How an Inbound System Works",
          description: "Lesson Objective: Learn how to get high-intent inbound leads coming to YOU.",
          type: "VIDEO",
        },
        {
          slug: "high-intent-inbound-system",
          title: "High-Intent Inbound System",
          description: "Lesson Objective: Build a high-intent inbound system.",
          type: "VIDEO",
        },
        {
          slug: "linkedin-profile-1",
          title: "LinkedIn Optimized Profile #1 Walkthrough",
          description: "LinkedIn Profile to view.",
          type: "VIDEO",
        },
        {
          slug: "linkedin-profile-2",
          title: "LinkedIn Optimized Profile #2 Walkthrough",
          description: "LinkedIn Profile to View.",
          type: "VIDEO",
        },
        {
          slug: "linkedin-profile-3",
          title: "LinkedIn Optimized Profile #3 Walkthrough",
          description: "View this LinkedIn Profile Here.",
          type: "VIDEO",
        },
        {
          slug: "linkedin-profile-4",
          title: "LinkedIn Optimized Profile #4 Walkthrough",
          description: "View this LinkedIn Profile Here.",
          type: "VIDEO",
        },
      ],
    },
    {
      title: "Sales & Outreach",
      color: "#65A30D",
      children: [
        {
          title: "LinkedIn",
          color: "#65A30D",
          lessons: [
            {
              slug: "content-engine",
              title: "The Content Engine",
              description:
                "Lesson Objective: Learn how to create high-converting content and what to post.",
              type: "VIDEO",
            },
            {
              slug: "lead-magnets-framework",
              title: "How Lead Magnets Work + Framework",
              description:
                "Lesson Objective: How to Attract Your ICP and Leads to Your Business.",
              type: "VIDEO",
            },
            {
              slug: "lead-magnet-workflow",
              title: "Creating a Lead Magnet Workflow and Funnel",
              description: "Lesson Objective: Create a Lead Magnet and Set Up your funnel (use Hexona).",
              type: "VIDEO",
            },
            {
              slug: "repurpose-lead-magnets",
              title: "How to Repurpose My Lead Magnets",
              description: "Lesson Objective: Repurpose My Lead Magnets and Viral Posts.",
              type: "VIDEO",
            },
            {
              slug: "loom-outreach-masterclass",
              title: "Cold Loom Outreach MASTERCLASS",
              description:
                "Loom video outreach is super effective because it's going to be hyper-personalized. They're going to see you as a human communicating directly to them.",
              type: "VIDEO",
            },
          ],
        },
        {
          title: "Partnerships",
          color: "#65A30D",
          lessons: [
            {
              slug: "partner-value-stack",
              title: "Partner Value Stack",
              description:
                "Lesson Objective: Learn how to get inbound sales and clients through PARTNERSHIPS.",
              type: "VIDEO",
            },
            {
              slug: "win-partner-trust",
              title: "How to Win Partner Trust",
              description: "Lesson Objective: Win Partner TRUST.",
              type: "VIDEO",
            },
            {
              slug: "structure-partnerships",
              title: "How to Structure Partnerships",
              description: "Lesson Objective: Learn How To Structure Partnerships.",
              type: "VIDEO",
            },
            {
              slug: "influencer-partner-call",
              title: "Influencer Partner Sales Call & Incentive",
              description:
                "Lesson Objective: Learn How to Incentive Influencer Partners to Send You Deals.",
              type: "VIDEO",
            },
            {
              slug: "agency-partner-call",
              title: "Agency Partner Sales Call & Incentive",
              description: "Lesson Objective: Learn How to Incentive Agency Partners to Send You Deals.",
              type: "VIDEO",
            },
            {
              slug: "competitor-partner-call",
              title: "Competitor Partner Sales Call & Incentive",
              description:
                "Lesson Objective: Learn How to Incentive Competitor Partners to Send You Deals.",
              type: "VIDEO",
            },
          ],
        },
        {
          title: "Pricing & Closing",
          color: "#65A30D",
          lessons: [
            {
              slug: "acv-based-pricing",
              title: "ACV-Based Pricing",
              description: "Lesson Objective: Learn How to Price Your Automations using ACV.",
              type: "VIDEO",
            },
            {
              slug: "closing-strategies",
              title: "Closing Strategies",
              description:
                "Lesson Objective: Learn the full process for moving from discovery into a confident close.",
              type: "VIDEO",
            },
          ],
        },
      ],
    },
    {
      title: "Onboarding & Management",
      color: "#6366F1",
      lessons: [
        {
          slug: "creating-sending-contracts",
          title: "Creating & Sending Contracts",
          description:
            "Lesson Objective: How to Send Contracts & Agreements. ACCESS MY SAMPLE CONTRACTS HERE.",
          type: "VIDEO",
        },
        {
          slug: "onboarding-checklist",
          title: "Onboarding Checklist",
          description: "ACCESS MY ONBOARDING CHECKLIST HERE.",
          type: "RESOURCE",
          externalUrl: "",
        },
        {
          slug: "how-to-conduct-training",
          title: "How to Conduct a Training",
          description: "Video being updated and reuploaded shortly.",
          type: "VIDEO",
        },
      ],
    },
  ],
};

const TIER1_RESOURCES: ResourceSeed[] = [
  {
    slug: "funnel-inventory",
    title: "Funnel Inventory",
    description: "Access our funnel inventory of high-converting templates.",
    url: "https://docs.google.com/spreadsheets/d/1VodxdHNTiC7FZPYdkzgwiDPmN5q_iRuWDqZYRZIYi/edit",
    category: "Templates",
    requiredTier: "TIER_1",
    order: 0,
  },
  {
    slug: "hamzas-flowcharts",
    title: "Hamza's Flowcharts",
    description: "Call Centre, Restaurant Automation, and other flowchart templates.",
    url: "https://www.tldraw.com/f/r8BBgDfnmweE4SvUgm_TK",
    category: "Flowcharts",
    requiredTier: "TIER_1",
    order: 1,
  },
  {
    slug: "best-linkedin-posts",
    title: "Hamza's Best Performing LinkedIn Posts",
    description: "Reference library of high-engagement LinkedIn content from Hamza.",
    url: "https://docs.google.com/document/d/11z-7xT3UufoAvEIDYHVbn4PVQyolPrkUQ5WMhnLfk/edit",
    category: "Samples",
    requiredTier: "TIER_1",
    order: 2,
  },
  {
    slug: "100-automation-templates",
    title: "100+ Automation Templates",
    description:
      "100+ Automation Templates that can be loaded into Hexona or GHL, sorted by industry.",
    url: "https://docs.google.com/spreadsheets/d/1U8eJKwSxH_x6mhv-r2nsO6yeqzgxY4lUOj8vfDsAe-Q/edit",
    category: "Templates",
    requiredTier: "TIER_1",
    order: 3,
  },
  {
    slug: "sample-proposals",
    title: "Sample Proposals",
    description: "Reference proposals you can use as inspiration.",
    url: "",
    category: "Samples",
    requiredTier: "TIER_1",
    order: 4,
  },
  {
    slug: "funnel-templates",
    title: "10+ Funnel Templates (Lead Magnet Funnels)",
    description:
      "10+ Funnel Templates that you can import directly into your High Level Account for Free. More to be constantly added.",
    url: "",
    category: "Templates",
    requiredTier: "TIER_1",
    order: 5,
  },
  {
    slug: "sample-ai-prompts",
    title: "Sample AI Prompts",
    description:
      "Voice Africo Pizza Order Taking Bot, Voice AirBnB Bot, Text AirBnB Bot, and more.",
    url: "",
    category: "Samples",
    requiredTier: "TIER_1",
    order: 6,
  },
  {
    slug: "hiring-guide",
    title: "Hiring Guide",
    description: "Find our Hiring Guide & Revenue Model Training PDF attached.",
    url: "",
    category: "Guides",
    requiredTier: "TIER_1",
    order: 7,
  },
  {
    slug: "lead-magnet-builder-prompt",
    title: "Lead Magnet Builder Prompt",
    description: "Our lead magnet builder prompt.",
    url: "https://docs.google.com/document/d/1U0sSKVzrGOmUPFeieSZ8NRgxp65VniLzbcxCDYusUBQ/edit",
    category: "Guides",
    requiredTier: "TIER_1",
    order: 8,
  },
  {
    slug: "proposal-directory",
    title: "Proposal Directory",
    description:
      "If you're interested in seeing some of the proposals that we do for our agency, then you can browse this library and use it for inspiration.",
    url: "https://docs.google.com/spreadsheets/d/1NVaRk9HKZYocgvdOi490lNGqbJ_W6r3YsV1YwXODo/edit",
    category: "Samples",
    requiredTier: "TIER_1",
    order: 9,
  },
];

async function seedLessons(
  prisma: PrismaClient,
  moduleId: string,
  lessons: LessonSeed[]
) {
  for (let i = 0; i < lessons.length; i++) {
    const l = lessons[i];
    await prisma.lesson.upsert({
      where: { moduleId_slug: { moduleId, slug: l.slug } },
      create: {
        moduleId,
        slug: l.slug,
        title: l.title,
        description: l.description,
        type: l.type,
        loomUrl: l.loomUrl,
        externalUrl: l.externalUrl,
        advisorSlug: l.advisorSlug,
        order: i,
      },
      update: {
        title: l.title,
        description: l.description,
        type: l.type,
        externalUrl: l.externalUrl,
        advisorSlug: l.advisorSlug,
        order: i,
      },
    });
  }
}

async function seedModules(
  prisma: PrismaClient,
  courseId: string,
  modules: ModuleSeed[],
  parentId: string | null = null
) {
  for (let i = 0; i < modules.length; i++) {
    const m = modules[i];
    const existing = await prisma.module.findFirst({
      where: { courseId, parentId, title: m.title },
    });
    const row = existing
      ? await prisma.module.update({
          where: { id: existing.id },
          data: { color: m.color, order: i },
        })
      : await prisma.module.create({
          data: { courseId, parentId, title: m.title, color: m.color, order: i },
        });

    if (m.lessons?.length) {
      await seedLessons(prisma, row.id, m.lessons);
    }
    if (m.children?.length) {
      await seedModules(prisma, courseId, m.children, row.id);
    }
  }
}

export async function seedAdvisory(prisma: PrismaClient) {
  console.log("Seeding Advisory content...");

  const instructor = await prisma.instructor.upsert({
    where: { id: "instructor-hamza" },
    create: {
      id: "instructor-hamza",
      name: TIER1_COURSE.instructor.name,
      bio: TIER1_COURSE.instructor.bio,
    },
    update: { name: TIER1_COURSE.instructor.name, bio: TIER1_COURSE.instructor.bio },
  });

  const course = await prisma.course.upsert({
    where: { slug: TIER1_COURSE.slug },
    create: {
      slug: TIER1_COURSE.slug,
      title: TIER1_COURSE.title,
      subtitle: TIER1_COURSE.subtitle,
      ctaLabel: TIER1_COURSE.ctaLabel ?? "Start Course",
      requiredTier: TIER1_COURSE.requiredTier,
      order: TIER1_COURSE.order,
      isPublished: true,
      instructorId: instructor.id,
    },
    update: {
      title: TIER1_COURSE.title,
      subtitle: TIER1_COURSE.subtitle,
      ctaLabel: TIER1_COURSE.ctaLabel ?? "Start Course",
      requiredTier: TIER1_COURSE.requiredTier,
      isPublished: true,
      instructorId: instructor.id,
      order: TIER1_COURSE.order,
    },
  });
  console.log(`  ✓ Course: ${course.title}`);

  await seedModules(prisma, course.id, TIER1_COURSE.modules);
  console.log(`  ✓ Modules + lessons`);

  for (const r of TIER1_RESOURCES) {
    await prisma.resource.upsert({
      where: { slug: r.slug },
      create: r,
      update: r,
    });
  }
  console.log(`  ✓ ${TIER1_RESOURCES.length} resources`);

  console.log("Advisory seed complete.");
}
