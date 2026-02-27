export type GPTCategory = "research" | "sales" | "fulfillment" | "strategy" | "onboarding";

export type GPT = {
  slug: string;
  name: string;
  description: string;
  category: GPTCategory;
  scope: "global" | "client" | "both";
  icon: string;
  suggestedPrompts: string[];
  defaultModel: string;
  provider: "anthropic" | "perplexity" | "openai";
  badge?: "popular" | "new" | "pro";
  relatedGpts?: string[];
  guide?: string[];
};

export const GPT_CATALOG: GPT[] = [
  // Research & Discovery
  {
    slug: "niche-research",
    name: "Niche & Research GPT",
    description: "Find the perfect niche and research prospects before your sales calls.",
    category: "research",
    scope: "both",
    icon: "Search",
    suggestedPrompts: [
      "Help me pick a niche based on my background and location",
      "Research this business before my discovery call",
      "Compare these 3 niches for me: roofing, dental, HVAC",
      "Find competitors for this client's business",
    ],
    defaultModel: "perplexity/sonar",
    provider: "perplexity",
    badge: "popular",
    relatedGpts: ["sales", "pricing"],
    guide: [
      "Use it in two ways: niche selection (share your strengths, background, and location) or prospect research (share a business name/website)",
      "Always include the prospect's city or region — location matters for competitor analysis",
      "If you have a client contact loaded, it skips the intake questions and goes straight to research",
      "Great before discovery calls — gives you company overview, pain points, competitors, and conversation starters",
    ],
  },

  // Sales & Revenue
  {
    slug: "pricing",
    name: "Pricing GPT",
    description: "Get a confident, justified price for your proposal based on discovery call context.",
    category: "sales",
    scope: "client",
    icon: "DollarSign",
    suggestedPrompts: [
      "Help me price this client based on my discovery call notes",
      "What should I charge for a full AI voice agent setup?",
      "How do I justify my price when they say it's too expensive?",
    ],
    defaultModel: "claude-sonnet-4-6",
    provider: "anthropic",
    badge: "popular",
    relatedGpts: ["proposal", "sales"],
    guide: [
      "Tell it what services you're offering and what came up on the discovery call",
      "It considers the client's business size and industry to recommend a price range with justification",
      "Ask for talking points to confidently defend your price and handle objections",
      "It can suggest a payment structure — upfront, retainer, or milestone-based",
    ],
  },
  {
    slug: "proposal",
    name: "Proposal Writing GPT",
    description: "Generate a professional, tailored proposal document for your client.",
    category: "sales",
    scope: "client",
    icon: "FileText",
    suggestedPrompts: [
      "Write a proposal for this client based on our pricing discussion",
      "Create a proposal for a CRM automation project",
      "Help me write a follow-up proposal after our call",
    ],
    defaultModel: "claude-sonnet-4-6",
    provider: "anthropic",
    relatedGpts: ["contract", "client-onboarding"],
    guide: [
      "Generates a full proposal: executive summary, solution, deliverables, timeline, pricing, and next steps",
      "Share the problem being solved and your agreed pricing for the most tailored output",
      "Output is formatted in clean markdown — copy it into Google Docs for final formatting",
      "Best used after Pricing GPT so you already have a confident price to include",
    ],
  },
  {
    slug: "sales",
    name: "Sales GPT",
    description: "Generate outreach scripts, handle objections, and close deals with confidence.",
    category: "sales",
    scope: "both",
    icon: "MessageSquare",
    suggestedPrompts: [
      "Write a cold email sequence for roofing companies",
      "Give me a cold call script for selling AI voice agents",
      "They said 'it's too expensive' — how do I respond?",
      "Create a LinkedIn DM sequence for my niche",
    ],
    defaultModel: "claude-sonnet-4-6",
    provider: "anthropic",
    badge: "popular",
    relatedGpts: ["pricing", "proposal", "niche-research"],
    guide: [
      "Covers outreach (cold emails, cold calls, LinkedIn DMs), objection handling, and closing strategies",
      "Specify your niche so outreach scripts are relevant to your target audience",
      "Paste an exact objection from a prospect to get a tailored response",
      "Works with or without a client loaded — use it for generic scripts or client-specific outreach",
    ],
  },

  // Fulfillment & Delivery
  {
    slug: "workflow",
    name: "Workflow Builder GPT",
    description: "Describe an automation use case and get step-by-step build instructions.",
    category: "fulfillment",
    scope: "global",
    icon: "GitBranch",
    suggestedPrompts: [
      "Can I build this automation natively in GHL?",
      "Design a lead follow-up workflow using Make + GHL",
      "How do I set up an appointment booking automation?",
    ],
    defaultModel: "claude-sonnet-4-6",
    provider: "anthropic",
    badge: "popular",
    relatedGpts: ["prompt-engineer"],
    guide: [
      "Describe your automation use case — it will tell you if it's buildable natively in GHL or needs Make/Zapier/n8n",
      "Gets specific: names exact triggers, actions, and configuration steps you need",
      "Knows GHL workflows, custom fields, tags, pipelines, email/SMS sequences, and webhooks",
      "Ask for a build time estimate so you can scope the project for your client",
    ],
  },
  {
    slug: "prompt-engineer",
    name: "Prompt Engineering GPT",
    description: "Write effective prompts for voice agents, DM agents, and AI workflow steps.",
    category: "fulfillment",
    scope: "global",
    icon: "Wand2",
    suggestedPrompts: [
      "Write a system prompt for an AI voice agent for a dental clinic",
      "Help me write a prompt for an Instagram DM agent",
      "Improve this prompt I wrote for a customer service bot",
    ],
    defaultModel: "claude-haiku-4-5-20251001",
    provider: "anthropic",
    relatedGpts: ["workflow"],
    guide: [
      "Tell it which agent type you need: voice agent, chatbot, Instagram DM agent, email agent, or GHL workflow AI step",
      "Share the business niche and desired personality/tone for the agent",
      "It writes a complete system prompt with test cases and edge case handling",
      "Paste an existing prompt to get improvement suggestions and catch gaps",
    ],
  },
  {
    slug: "contract",
    name: "Contract Writing GPT",
    description: "Generate a professional service agreement for your client engagement.",
    category: "fulfillment",
    scope: "client",
    icon: "ScrollText",
    suggestedPrompts: [
      "Generate a service contract for this client",
      "Write a retainer agreement for ongoing AI maintenance",
      "Create a project-based contract with milestone payments",
    ],
    defaultModel: "claude-haiku-4-5-20251001",
    provider: "anthropic",
    relatedGpts: ["client-onboarding"],
    guide: [
      "Generates a full service agreement: scope, timeline, pricing, revisions, termination, confidentiality, and liability",
      "Provide the agreed deliverables and payment terms for an accurate contract",
      "Works best when you've already used Pricing GPT and Proposal GPT to lock in the details",
      "Important: output is a template — always have a licensed attorney review before sending",
    ],
  },

  // Strategy & Growth
  {
    slug: "hamza-ai",
    name: "Hamza AI",
    description: "Get strategic business advice from an AI trained on Hamza's frameworks and methodology.",
    category: "strategy",
    scope: "global",
    icon: "Brain",
    suggestedPrompts: [
      "How should I structure my agency for scale?",
      "What should my first hire be?",
      "How do I go from $5K to $20K/month?",
    ],
    defaultModel: "claude-sonnet-4-6",
    provider: "anthropic",
    badge: "pro",
    relatedGpts: ["weekly-review", "niche-research"],
    guide: [
      "Like talking to an experienced agency owner — direct, no-BS, and focused on what moves the needle",
      "Share your current situation first so the advice is specific, not generic",
      "All advice ties back to revenue impact — great for scaling decisions, hiring, and strategy",
      "Best for big-picture questions: structuring your agency, pricing strategy, growth roadmap",
    ],
  },
  {
    slug: "weekly-review",
    name: "Weekly Review GPT",
    description: "End-of-week reflection tool. Share what happened and get a structured debrief.",
    category: "strategy",
    scope: "global",
    icon: "CalendarCheck",
    suggestedPrompts: [
      "Here's what happened this week — help me debrief",
      "I closed 2 deals but lost 1. Help me analyze.",
      "What should I focus on next week?",
    ],
    defaultModel: "claude-haiku-4-5-20251001",
    provider: "anthropic",
    relatedGpts: ["hamza-ai"],
    guide: [
      "Share your week — deals closed, calls made, challenges faced, wins — and it gives you a structured debrief",
      "Output is organized into: Wins, Learnings, Blockers, and Top 3 Priorities for next week",
      "Be honest about setbacks so the analysis is constructive and useful",
      "Use it weekly to build a reflection habit and spot patterns over time",
    ],
  },

  // Onboarding
  {
    slug: "agency-onboarding",
    name: "Agency Onboarding",
    description: "Set up your agency profile through a friendly conversational interview.",
    category: "onboarding",
    scope: "global",
    icon: "Rocket",
    suggestedPrompts: [
      "Let's get started!",
      "I'm ready to set up my profile",
    ],
    defaultModel: "claude-haiku-4-5-20251001",
    provider: "anthropic",
    relatedGpts: ["niche-research", "hamza-ai"],
    guide: [
      "A quick 4-6 question interview to set up your agency profile and personalize all your tools",
      "Covers: services you offer, target niche, location, revenue, goals, and biggest challenge",
      "Answer one question at a time — it's short and conversational",
      "You can exit anytime — even partial info helps personalize your experience",
    ],
  },
  {
    slug: "client-onboarding",
    name: "Client Onboarding GPT",
    description: "Generate a welcome sequence, onboarding checklist, and kickoff agenda for your client.",
    category: "onboarding",
    scope: "client",
    icon: "UserPlus",
    suggestedPrompts: [
      "Help me onboard this new client",
      "Create a welcome email and onboarding checklist",
      "Generate a kickoff call agenda for this client",
    ],
    defaultModel: "claude-haiku-4-5-20251001",
    provider: "anthropic",
    relatedGpts: ["workflow", "prompt-engineer"],
    guide: [
      "Generates three things: a welcome email, an onboarding checklist, and a kickoff call agenda",
      "Share the client's name, business, services purchased, and start date",
      "Mention the client's tech comfort level so materials match their experience",
      "Makes you look organized and professional from day one with a new client",
    ],
  },
];

export const GPT_CATEGORIES: Record<GPTCategory, { label: string; icon: string; color: string }> = {
  research: { label: "Research & Discovery", icon: "Search", color: "#7C3AED" },
  sales: { label: "Sales & Revenue", icon: "TrendingUp", color: "#00C4CC" },
  fulfillment: { label: "Fulfillment & Delivery", icon: "Settings", color: "#10B981" },
  strategy: { label: "Strategy & Growth", icon: "Brain", color: "#F59E0B" },
  onboarding: { label: "Onboarding", icon: "Rocket", color: "#EF4444" },
};

export const MODEL_ROUTING: Record<string, { provider: string; model: string }> = {
  "niche-research": { provider: "perplexity", model: "perplexity/sonar" },
  "pricing": { provider: "anthropic", model: "claude-sonnet-4-6" },
  "proposal": { provider: "anthropic", model: "claude-sonnet-4-6" },
  "sales": { provider: "anthropic", model: "claude-sonnet-4-6" },
  "workflow": { provider: "anthropic", model: "claude-sonnet-4-6" },
  "prompt-engineer": { provider: "anthropic", model: "claude-haiku-4-5-20251001" },
  "contract": { provider: "anthropic", model: "claude-haiku-4-5-20251001" },
  "hamza-ai": { provider: "anthropic", model: "claude-sonnet-4-6" },
  "weekly-review": { provider: "anthropic", model: "claude-haiku-4-5-20251001" },
  "agency-onboarding": { provider: "anthropic", model: "claude-haiku-4-5-20251001" },
  "client-onboarding": { provider: "anthropic", model: "claude-haiku-4-5-20251001" },
};

export function getGptBySlug(slug: string): GPT | undefined {
  return GPT_CATALOG.find((g) => g.slug === slug);
}

export function getGptsByCategory(category: GPTCategory): GPT[] {
  return GPT_CATALOG.filter((g) => g.category === category);
}

export function getClientScopedGpts(): GPT[] {
  return GPT_CATALOG.filter((g) => g.scope === "client" || g.scope === "both");
}

export function getGlobalGpts(): GPT[] {
  return GPT_CATALOG.filter((g) => g.scope === "global" || g.scope === "both");
}

export function getRelatedGpts(slug: string): GPT[] {
  const gpt = getGptBySlug(slug);
  if (!gpt?.relatedGpts) return [];
  return gpt.relatedGpts
    .map((s) => getGptBySlug(s))
    .filter((g): g is GPT => g !== undefined);
}
