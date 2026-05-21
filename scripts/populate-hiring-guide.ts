import "dotenv/config";
import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const documentMd = `# Business Roadmap & Hiring Guide

*A complete framework for going from solo operator to scaled agency.*
*— Hamza Baig (@hamza_automates) · Hexona Systems*

---

## Part 1: Operator vs Agency Owner

### There Are Two Types of People

**Type 1: The Solo Operator**
- You do all the work
- You're the technician
- Clients hire YOU specifically
- If you stop, revenue stops

**Type 2: The Agency Owner**
- You build systems
- You hire people
- Clients hire your COMPANY
- Revenue continues without you

### The Operator (Solo Expert)

**What it looks like**
- 5–10 clients max
- You build everything yourself
- High quality, personal service
- $5k–15k/month revenue
- 40–60 hours/week

**Pros**
- Keep all the profit
- Full creative control
- Simple, no management headaches
- Flexibility

**Cons**
- Revenue capped by your time
- Can't take vacation
- Burnout risk
- Hard to sell the business

### The Agency Owner

**What it looks like**
- 15–50+ clients
- Team handles delivery
- Systemized processes
- $20k–100k+/month revenue
- You work ON the business, not IN it

**Pros**
- Scalable revenue
- Can take time off
- Build a valuable asset
- Multiple income streams

**Cons**
- Lower margins (payroll)
- Management complexity
- Hiring/firing stress
- Quality control challenges

### Which Path Should You Choose?

**Be an Operator if:**
- You love the technical work
- You want simplicity
- You're okay with a $10–20k/month ceiling
- You value freedom over scale

**Build an Agency if:**
- You want to scale past $20k/month
- You're willing to manage people
- You want to build something sellable
- You enjoy systems more than execution

> There's no wrong answer. But you need to CHOOSE.

### The Transition Point

Most people hit a wall at **5–7 clients**:
- Quality starts slipping
- You're turning away clients
- You're exhausted

At that point, you decide:
- **Option A:** Stay at 5–7 clients, raise prices, stay an operator
- **Option B:** Hire help, build systems, become an agency

---

## Part 2: The 6-Figure Math

### Start With the End in Mind

**Goal:** $100,000 ARR = $8,333/month.

So how do you get there?

### Three Revenue Models

**Model 1 — High-Ticket, Low Volume**
- 4 clients × $2,000/month = $8,000/month
- *Pros:* fewer clients to manage
- *Cons:* harder to close, losing one client = big hit

**Model 2 — Mid-Ticket, Medium Volume**
- 8 clients × $1,000/month = $8,000/month
- *Pros:* balanced, sustainable
- *Cons:* still doing custom work for each

**Model 3 — Lower-Mid Ticket, High Volume**
- 16 clients × $500/month = $8,000/month
- *Pros:* predictable, productized
- *Cons:* need systems to manage volume

### The Client Acquisition Math

To hit $8,000 MRR, work backwards:
- Month 6 goal: **$8,000 MRR**
- Average client: **$1,000/month**
- Active clients needed: **8**

Assuming 1 client leaves every 2–3 months, you need to **close 10–12 clients total** in 6 months to maintain 8 active. That's about **2 clients per month**.

To close 2 clients/month, you need:
- **10 discovery calls** per month (20% close rate)
- **30 qualified leads** per month (33% show rate)
- **600 outreach touches** per month (5% response rate)

600 touches/month = 150/week = **30/day** (5 working days).
That's 30 cold emails, DMs, or LinkedIn messages per day.

---

## Exercise 1: Your Revenue Model

Do the math for **your** business:

1. **Target monthly revenue in 6 months:** $____________
2. **Average monthly ticket size per client:** $____________ ($500? $1,000? $2,000?)
3. **Active clients needed** = target revenue ÷ ticket size
4. **Total clients to close** = active clients ÷ 0.8 *(assume 20% churn)*
   *Example: 10 active ÷ 0.8 = 13 to close*
5. **Discovery calls needed per month** = clients to close ÷ 20% close rate
6. **Qualified leads needed per month** = calls ÷ 30% show rate
7. **Outreach messages needed per month** = leads ÷ 5% response rate

> This is your pipeline. Work backwards from revenue to activity.

---

## Part 3: The 4-Phase Roadmap

### Phase 1 — Proof (Months 1–2)

**Your only job:** get 2–3 paying clients and deliver results.

**Key metrics**
- 2–3 clients signed
- $2,000–3,000 MRR
- At least 1 strong testimonial

**What you're doing**
- Warm + cold outreach (100+ touches/month)
- Discovery calls (10–15/month)
- Building everything yourself
- Over-delivering on service

> Don't worry about systems yet. Just get PROOF.

### Phase 2 — Pipeline (Months 3–4)

**Your only job:** build a consistent client acquisition system.

**Key metrics**
- 5–7 clients total
- ~$6,000 MRR
- 1–2 new clients per month consistently

**What you're doing**
- Outreach system (templates, tracking, follow-ups)
- Content pipeline (3–5x/week)
- Partnership conversations (2–3 agencies)
- Refining your pitch based on what's working

**What you're learning**
- Which acquisition channel works best
- How to close faster
- How to qualify better
- Your ideal client profile

> Goal: predictable pipeline before you hire.

### Phase 3 — People (Months 5–6)

**Your job:** hire your first team member and delegate delivery.

**Key metrics**
- 8–10 clients total
- $7,000–8,500 MRR
- 50% of builds done by someone else

**What you're doing**
- Hiring first delivery person (VA or junior builder)
- Creating basic SOPs for builds
- Training them on your process
- Focusing on sales + quality control

**What you're learning**
- How to train someone
- What's hard to delegate
- Where you're the bottleneck
- How to manage people

> This is the HARDEST phase. Most people quit here.

### Phase 4 — Process (Months 7–12)

**Your job:** systematize operations and improve margins.

**Key metrics**
- 10–20 clients total
- $10,000–20,000+ MRR
- Team of 2–3 people
- You work 20–30 hours/week

**What you're doing**
- Documenting all processes
- Hiring an account manager or setter
- Building productized offers
- Optimizing margins

**What you're learning**
- How to run a real business
- How to scale profitably
- What to automate
- Where to invest

---

## Part 4: Hiring, Systems & Operations

### When Should You Hire?

When you're **consistently turning away clients** because you don't have capacity.

**Signs you're ready**
- Working 50+ hours/week
- Waitlist of 2–3+ clients
- Saying "no" to good opportunities
- Quality is starting to slip
- $8k+ MRR for at least 2 months

> Don't hire too early (burns cash). Don't hire too late (you burn out).

### Who Should Be Your First Hire?

NOT a salesperson. NOT a project manager. Your first hire should be a **Builder / VA**.

**Why**
- Frees up YOUR time (highest ROI)
- You're still better at sales than anyone else
- Building is the most time-consuming part
- Easier to train technical tasks than sales

**What they'll do**
- Build chatbots/workflows from your specs
- Handle basic client communication
- Do the repetitive technical work
- Free you up to sell and strategize

### Where to Find Your First Hire

**1. Upwork / Fiverr** *(start here)*
- Search: "GHL expert", "Make.com specialist", "chatbot builder"
- $8–15/hour for international VAs
- Test with a small project first

**2. Your bootcamp cohort**
- They know the tools already
- Can grow with you

**3. Cold recruit from LinkedIn**
- Find people posting about automation
- Offer them agency work

### Offer Structure: Standardized vs Custom

Most agencies fail because they do 100% custom work. You need **both** — a 2-tier model.

#### Tier 1: Standardized (80% of clients)

**What it is**
- Pre-built solutions
- Fixed scope
- Productized pricing
- Fast delivery (5–7 days)

**Examples**
- Instagram DM Agent
- Website Chat Widget
- Lead Qualification Bot

**Why it works**
- Easy to sell (clear deliverable)
- Easy to fulfill
- Easy to delegate (SOPs exist)
- High margins (efficient)

#### Tier 2: Custom (20% of clients)

**What it is**
- Bespoke solutions
- Complex requirements
- Higher pricing
- Longer delivery (2–4 weeks)

**Examples**
- Full CRM buildout + automations
- Multi-channel automation suite
- White-label partnership deals

**Why you need it**
- Higher revenue per client
- Attracts bigger clients
- Keeps work interesting
- Upsell opportunity from Tier 1

### 5 Major SOPs You Need

**1. Client Onboarding SOP**
- Agreement signing
- Payment collection
- Kickoff call agenda
- Account access checklist

**2. Discovery Call SOP**
- Pre-call research
- Question framework
- Objection responses
- Close process

**3. Build Process SOP** *(per product)*
- IG DM bot setup (step-by-step)
- Website chat widget setup
- Testing checklist
- Launch checklist

**4. Client Communication SOP**
- Response time standards (<24 hours)
- Weekly check-in template
- Monthly report template
- Escalation process

**5. Hiring / Training SOP**
- Job post template
- Test project instructions
- 4-week training plan
- Performance review criteria

### The Importance of Customer Service

Most agencies think the product IS the service. **Wrong.** The product is just the baseline. Customer service is your competitive advantage — it's how you retain clients and build long-term partnerships.

**What great customer service looks like**
- Under 2 hours for urgent issues
- Under 24 hours for everything else
- Weekly check-ins (first month), bi-weekly after that
- Add a feature or automation they didn't ask for
- Introduce them to a potential client
- Something breaks? Fix it same day
- They're unhappy? Get on a call ASAP

### Operations Checklist (Month 6)

By the end of 6–8 months, aim to have:

- ✅ ~10 active clients
- ✅ $8,000+ MRR
- ✅ At least 1 team member
- ✅ 5 core SOPs documented
- ✅ Productized core offer
- ✅ CRM / pipeline system
- ✅ Monthly reporting process
- ✅ Client onboarding flow

> If you have these 8 things, you're not a freelancer anymore. You're running a real agency.

---

## Exercise 2: Your Next 90 Days

**A) Set your targets**
- Revenue goal: $____________
- Clients goal: ____________
- Top priority: ____________

**B) The One Thing**
What's the ONE thing that would 2x your business in 90 days?

---

## Final Note: Biggest Revenue Leaks for Agencies

- ❌ Hiring too many people too fast
- ❌ Underpricing (not raising prices as you grow)
- ❌ Tool bloat (paying for subscriptions you don't use)
- ❌ Poor time tracking (scope creep eats profit)
- ❌ Bad clients (high maintenance, low pay)

---

## Recap: Building a Real Business

**Operator vs Owner**
- Operator = capped but simple
- Owner = scalable but complex

**The 6-Figure Math**
- Work backwards from revenue
- Know your pipeline numbers

**Hiring & Operations**
- Hire when capacity maxed
- First hire = Builder / VA
- Standardized + Custom offers
- 70–85% margins
- Customer service = competitive advantage
`;

async function main() {
  const r = await prisma.resource.update({
    where: { slug: "hiring-guide" },
    data: {
      title: "Hiring Guide & Business Roadmap",
      description:
        "A complete framework for going from solo operator to scaled agency — covering revenue math, the 4-phase growth roadmap, when and who to hire, offer structure, and the 5 SOPs every agency needs.",
      category: "Guides",
      url: "",
      tableData: Prisma.JsonNull,
      listData: Prisma.JsonNull,
      documentMd,
    },
  });
  console.log("Updated:", r.title);
  console.log("documentMd length:", r.documentMd?.length, "chars");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
