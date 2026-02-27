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
      "Provide your background, strengths, and location for personalized niche recommendations",
      "Share the prospect's website URL for the most accurate pre-call research",
      "Ask for competitor analysis in a specific city or region",
      "Load a client contact first for instant research without re-entering details",
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
      "Share your discovery call notes for the most accurate pricing recommendation",
      "Mention the client's business size and industry for better context",
      "Ask for objection responses to prepare for price pushback",
      "Request a payment structure suggestion (upfront, retainer, milestones)",
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
      "Provide discovery call context and agreed-upon pricing for a tailored proposal",
      "Mention specific deliverables and timeline expectations",
      "Ask it to include social proof or case study references",
      "Copy the output directly into Google Docs for final formatting",
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
      "Specify your niche and target audience for more relevant outreach scripts",
      "Paste the exact objection a prospect gave you for a tailored response",
      "Ask for multi-step sequences (email, DM, cold call) not just single messages",
      "Load a client contact for personalized outreach based on their business",
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
      "Describe the full use case — what triggers the automation and what should happen",
      "Mention whether you need it built natively in GHL or with Make/Zapier/n8n",
      "Ask for estimated build time so you can scope your project",
      "Follow up with Prompt Engineering GPT to write prompts for any AI steps",
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
      "Specify the agent type: voice agent, chatbot, DM agent, or email agent",
      "Include the business niche and desired tone/personality",
      "Ask for test cases to validate the prompt before deploying",
      "Paste an existing prompt to get improvement suggestions",
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
      "Provide the agreed scope of work and pricing for accurate contract terms",
      "Specify the payment structure you want (upfront, retainer, milestone)",
      "Ask for specific clauses like revision limits or termination terms",
      "Always have a licensed attorney review before sending to clients",
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
      "Share your current revenue, team size, and biggest challenge for tailored advice",
      "Ask about specific growth stages: first client, scaling to $10K+, hiring, etc.",
      "Be specific about your situation — vague questions get generic answers",
      "Follow up with Weekly Review GPT to track your progress on advice given",
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
      "Share everything that happened this week — deals, calls, wins, and setbacks",
      "Be honest about challenges so the debrief is actually useful",
      "Use it every Friday to build a consistent reflection habit",
      "Review your priorities from last week to track follow-through",
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
      "Answer one question at a time — the interview is short (4-6 questions)",
      "Be honest about your revenue and experience level for better recommendations",
      "You can exit anytime — partial info still helps personalize your tools",
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
      "Provide the client's name, business, and services they purchased",
      "Mention the start date and any specific expectations from the client",
      "Ask for all three outputs: welcome email, checklist, and kickoff agenda",
      "Customize the tone to match your agency's brand voice",
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
