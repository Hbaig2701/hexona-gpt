# GoHighLevel AI Tools — Capabilities & Prompting Best Practices

**Purpose:** training/reference document for a prompt-writing AI agent whose job is to generate high-quality prompts for GoHighLevel's built-in AI tools: **Ask AI**, the **Workflow AI Builder**, and **AI Studio** (the prompt-to-build website/funnel builder, often called "vibe" building in the community).
Researched July 22, 2026 against HighLevel's official help docs and current third-party documentation. GHL ships AI updates monthly — re-verify capability claims quarterly against help.gohighlevel.com.

**Naming note (important, the community confuses these):**
- **Ask AI** — the assistant/workspace inside GHL (chat box that answers, creates, and executes actions).
- **Workflow AI Builder** — prompt-to-automation inside Automation → Workflows.
- **AI Studio** — prompt-to-website/funnel builder (lives in Labs; ChatGPT-style prompt → full site). This is the one people call "vibe studio" / vibe coding.
- **Agent Studio** — a *different* product: node-based visual builder for AI agents (chat/voice/flow). Covered in the appendix because prompt-writing for its Global Prompt is a common need and guides conflate it with AI Studio.

---

## 1. Ask AI

### What it is
A built-in AI workspace available from the top nav or sidebar (quick pop-up or full-screen). It's GHL's "do things without leaving the platform" layer: it generates content, answers questions about your account data, and **executes real CRM actions** via MCP-powered commands. Available to agency and sub-account roles; sub-accounts need the $97 plan with the AI Employee add-on/plan.

### Capabilities
- **Content generation:** social posts, emails, ad copy, campaign material, blog ideas, CTAs — using the account's configured **Brand Voice** settings.
- **Builds via conversation:** funnels (with business details + templates), Voice AI agents with call routing, communities, image generation and editing.
- **Data retrieval:** pulls and summarizes contact records — communications, payments, appointments, tasks.
- **Action execution:** creates contacts, updates opportunities, lists/reschedules appointments, applies tags, and performs supported **bulk updates**.
- **Interface:** voice input, persistent chat history, collapsible response cards, conversations addressable by URL.

### Limits
- Content quality is gated on Brand Voice being configured — generic voice in, generic copy out.
- Only *supported* actions execute; it is not a general agent that can do anything in the UI.
- List-based page elements (FAQs, pricing tables, testimonials) are edited item-by-item, not wholesale.

### Prompting best practices
1. **Name the object, the action, and the constraint in one line.** "Update the opportunity for Jane Doe in the 'Solar — Toronto' pipeline to stage 'Proposal Sent'" beats "can you update Jane's deal."
2. **For content: brief it like a copywriter.** Audience + offer + channel + length + CTA + tone reference ("in our Brand Voice"). Ask AI reads Brand Voice, but per-prompt specifics (the promo's actual price, deadline, link target) must be supplied or it will invent placeholders.
3. **One action per message for CRM operations.** Chained requests ("tag these, then update stages, then reschedule") raise the failure/ambiguity rate. Sequence them.
4. **Retrieve → verify → act for anything bulk or destructive.** First ask it to *list* the records it's about to touch ("show me all contacts tagged x-lead created before June"), confirm the list, then issue the action. Never one-shot a bulk update.
5. **Reference entities by their exact names** as they exist in the account (pipeline names, tag names, calendar names, form names). The prompt-writing agent should collect these from the user before emitting a prompt.
6. **Use follow-ups, not restarts.** Ask AI holds conversation context — iterate ("shorter, punchier, add the July deadline") instead of re-briefing from scratch.

---

## 2. Workflow AI Builder

### What it is
Plain-language → complete workflow. Three entry points: "Build using AI" on the workflow list page, the prompt box in a blank workflow (voice dictation supported), and an AI chat assistant inside the builder. Generates in ~30 seconds: trigger + configured action steps + a **Post-Generation To-Do List** of what it couldn't configure + a summary. A **Clarifying Agent asks up to 3 questions** when the prompt is missing key details. Supports conversational editing after generation ("add an SMS after the email", "change the wait to 2 days") and **Point-and-Edit** (click a step, then describe the change). Chat Mode lets you plan without building.

### Limits (these drive prompt design)
- **It cannot test workflows.** Human must validate with a test contact before publishing.
- **It cannot make account-specific choices:** credentials, phone numbers, which calendar/pipeline/form — these land on the To-Do list regardless, but naming them in the prompt reduces guesswork.
- Complex branching may need manual cleanup. Autosaves as a draft; review is mandatory before publish.

### The prompt formula
A high-quality Workflow AI Builder prompt specifies, in order:

```
TRIGGER (which event, on which named asset, with which filter)
→ STEPS in sequence, each with: action verb + channel + timing + content
→ CONDITIONS (if/else branches, stated explicitly)
→ EXIT/STOP rules (what ends the sequence)
→ HOUSEKEEPING (tags to add/remove, pipeline stage moves, internal notifications)
```

Official guidance distilled: **be specific about timing, channels, conditions, and content; use action verbs** (Send, Notify, Create, Update, Wait, Check if); use precise time references ("after 2 days", not "later").

### A model prompt
> "When a contact submits the form 'Dental Registration', immediately send an SMS: 'Hey {{contact.first_name}}, thanks for your interest in the free checkup — can I get you scheduled?' If no reply, wait 24 hours and send a second SMS nudging them again, then wait 2 days and send a follow-up email. Stop the sequence as soon as the contact replies. When they reply, add the tag 'engaged' and notify the account owner. If the contact books on the 'New Patient' calendar at any point, remove them from this workflow and move their opportunity in the 'Front Desk' pipeline to 'Booked'."

Every clause maps to something the builder can configure; the named assets (form, calendar, pipeline, tag) either resolve or land as explicit To-Do items instead of wrong guesses.

### Anti-patterns
- **Goal-only prompts:** "nurture my leads better" — forces the Clarifying Agent's 3 questions or worse, a generic guess.
- **Multiple workflows in one prompt:** "handle new leads and also review requests and also no-shows" — one workflow per prompt.
- **Unstated stop conditions** — the #1 source of embarrassing automations (contact books, keeps getting "please book" messages). Always specify stop-on-reply / stop-on-booking / removal rules.
- **Assuming account knowledge:** "send them our usual follow-up" — it has no idea what usual is.
- **Prompting message copy vaguely.** Either supply the exact message text or explicitly say "write placeholder copy for me to edit" so the human knows to review it.

### Post-generation protocol (include in every emitted prompt-package as reviewer notes)
1. Work the To-Do list (credentials, numbers, calendar/pipeline selections).
2. Read every message's copy — edit AI placeholder text.
3. Run a test contact through before publishing.

---

## 3. AI Studio (the "vibe" website/funnel builder)

### What it is
A ChatGPT-style prompt interface (enable in **Labs**) that generates complete web properties: websites and multi-page experiences, sales funnels, landing pages, booking pages with calendar integration, lead-capture forms and surveys. Flow: prompt → AI generates layout/copy/structure (with AI-generated images) → refine with plain-language instructions → preview across devices → publish. Includes version history and CRM integration (leads captured flow straight into GHL).

### Limits
- Generated copy is fluent but generic wherever the brief lacked facts — it will invent business details you didn't supply.
- Design control is conversational, not pixel-level; brand fidelity depends on what you specify (colors, fonts, tone).
- It's a Labs feature: behavior shifts release to release; re-verify before writing tutorials/prompts that reference exact UI.

### Prompting best practices — brief it like a creative brief
A strong AI Studio prompt contains seven ingredients:

1. **Business identity:** name, niche, city, what's actually sold. ("Riverside Dental, family dental clinic in Etobicoke")
2. **Page goal + single CTA:** "one goal per page — book a free checkup via the embedded calendar." Multi-goal pages produce diluted layouts.
3. **Structure:** the sections you want, in order ("hero with offer, 3-benefit row, testimonials, insurance logos, FAQ, booking section").
4. **Real facts to prevent invention:** the actual offer, price, hours, address, phone, guarantee. Anything not supplied gets fabricated placeholder copy that a human must catch.
5. **Brand:** colors (hex if known), tone ("warm, plain-English, no dental jargon"), image style.
6. **Integrations:** which calendar to embed, which form fields to capture, where leads should land.
7. **Audience + objection:** who this is for and the main hesitation to answer ("nervous patients — emphasize gentle, judgment-free").

### Iteration rules
- **One section per edit instruction.** "Rewrite the hero headline to lead with the $99 offer" — not "make it better."
- **Reference sections by name** ("in the FAQ section...") — mirrors how the builder targets elements.
- **Check mobile preview explicitly** before publish; prompt fixes the same way ("stack the benefit row on mobile").
- Use version history as the undo button — encourage bold iterations, roll back freely.

### A model prompt
> "Build a one-page landing page for Riverside Dental, a family dental clinic in Etobicoke. Goal: book the $99 new-patient checkup (normally $240) via the embedded 'New Patient' calendar. Sections in order: hero with the offer and one booking button; a 3-item benefit row (same-day appointments, direct insurance billing, gentle with nervous patients); a testimonial section; an FAQ with 4 questions about insurance, pain, timing, and parking; final booking section repeating the calendar. Tone: warm and plain-English, no dental jargon. Colors: deep teal (#0F766E) and warm white. Audience is families and nervous patients — reassure, don't hard-sell. Use these facts: open Sat, free parking, 15 years serving Etobicoke, 4.9★ on Google (400+ reviews)."

---

## 4. Cross-tool principles (the core of the prompt-writing agent's behavior)

1. **Specificity beats cleverness.** All three tools are execution engines, not mind readers. The quality ceiling of the output is set by the concreteness of the input: named assets, exact timings, real facts, single goals.
2. **Facts must be supplied, never assumed.** The #1 failure mode across all three tools is invented content (fake offers, guessed pipeline names, placeholder claims). The prompt-writing agent's main job is *extracting the facts from the user first*.
3. **One artifact per prompt.** One workflow, one page, one CRM action. Batching degrades all three tools.
4. **Always define completion/stop states.** Workflows need exit rules; pages need a single CTA; actions need scoped targets.
5. **Human review is part of the prompt.** Every emitted prompt should ship with a short "after it generates, check X, Y, Z" note — none of these tools can test their own output.
6. **Iterate in-context.** All three support conversational refinement; the agent should emit follow-up edit prompts that reference the specific element to change, not regenerate from scratch.

## 5. Spec for the prompt-writing agent

**Intake checklist — collect before emitting any prompt (ask only for what's missing; max 3 questions, mirroring GHL's own Clarifying Agent):**
- Which tool (Ask AI / Workflow AI Builder / AI Studio) — infer from the request, confirm only if ambiguous
- Business facts: niche, offer, price/terms, location
- Named account assets involved: forms, calendars, pipelines + stages, tags, phone/email senders
- Desired outcome in one sentence + stop/success condition
- Channel + timing preferences (workflows) or section list + brand (AI Studio) or exact copy constraints (Ask AI content)

**Output format — every response the agent gives:**
1. The prompt, in a copy-paste block, written to the target tool's formula above
2. *Assumptions made* (flagged for user confirmation)
3. *After generation, verify:* 2–4 tool-specific checks (To-Do list items, test contact, mobile preview, bulk-action scope)

**Hard rules:**
- Never emit a prompt containing facts the user didn't supply — use `[YOUR OFFER]`-style placeholders and tell the user to fill them
- Never combine multiple workflows/pages/actions in one prompt
- Every workflow prompt must contain an explicit stop condition — refuse to emit one without it (add stop-on-reply as the default and say so)
- For bulk CRM actions, always emit the retrieve-and-confirm prompt first, the action prompt second

---

## Sources
- [HighLevel Help: Introduction to Ask AI Assistant](https://help.gohighlevel.com/support/solutions/articles/155000005327-introduction-to-ask-ai-assistant)
- [HighLevel Help: Workflow AI Builder](https://help.gohighlevel.com/support/solutions/articles/155000006100-workflow-ai-builder)
- [HighLevel Help: Agent Studio Overview](https://help.gohighlevel.com/support/solutions/articles/155000007393-agent-studio-overview)
- [GHL Central: GoHighLevel AI Studio (website/funnel builder)](https://ghlcentral.com/gohighlevel-ai-studio/)
- [HighLevel changelog](https://ideas.gohighlevel.com/changelog) — re-verify quarterly

---

## Appendix — Agent Studio (adjacent, often conflated)

Agent Studio is the node-based visual builder for AI agents: trigger (chat message, form submission, tag added) → nodes for AI responses, knowledge-base/web search, API & MCP calls, content generation (text/image/audio), structured data collection (email, phone, choices), and routing decisions. Its prompt surface is the **Global Prompt** (overarching behavior instructions) plus per-node AI instructions.

Global Prompt structure that works (community-validated pattern, since official docs don't prescribe one):
```
ROLE: who the agent is ("appointment coordinator for Riverside Dental")
OBJECTIVE: the single success condition ("qualify and book onto the New Patient calendar")
KNOWLEDGE: what it knows / where to look; explicit "if unknown, say you'll check and get back — never invent"
CONVERSATION RULES: tone, message length, one question at a time, language
QUALIFICATION CRITERIA: the exact checks, in order
ESCALATION: when to hand to a human, and how
GUARDRAILS: topics to refuse, data never to reveal
```
Same cross-tool principles apply: single objective, explicit stop/handoff states, facts supplied not assumed, and a test conversation before going live.
