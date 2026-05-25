/**
 * Adversarial test harness for the Workflow Advisor system prompt.
 *
 * Runs a small set of scenarios known to have failed in past sessions
 * (Jordan Solomon's "Customizing Forms for Educational Purposes" chat
 * is the main reference) and reports pass/fail against pattern checks.
 *
 * Run:  npx tsx scripts/test-workflow-advisor.ts
 *
 * No DB writes. Calls Anthropic API directly with the live prompt.
 */
import "dotenv/config";
import Anthropic from "@anthropic-ai/sdk";
import { getDefaultSystemPrompt } from "@/lib/ai/system-prompts";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const MODEL = "claude-sonnet-4-6";

const SYSTEM = getDefaultSystemPrompt("workflow");

type Turn = { role: "user" | "assistant"; content: string };

type Check =
  | { kind: "must_not_contain"; needles: string[]; label: string }
  | { kind: "must_contain"; needles: string[]; label: string }
  | { kind: "must_not_start_with"; prefixes: string[]; label: string }
  | { kind: "max_lines"; n: number; label: string }
  | { kind: "must_match"; regex: RegExp; label: string }
  | { kind: "must_not_match"; regex: RegExp; label: string };

interface Scenario {
  name: string;
  description: string;
  turns: Turn[];
  checks: Check[];
}

const SCENARIOS: Scenario[] = [
  {
    name: "S1 — opening request with attached transcript should not be a wall + must acknowledge transcript",
    description:
      "Mirrors the Jordan chat. User uploads transcript + asks for step by step. Advisor must NOT dump the whole build and MUST reference the transcript.",
    turns: [
      {
        role: "user",
        content:
          "I want to build a speed-to-lead agent for a commercial roofing business. AI Agents is now enabled on my test sub-account. Please walk me through it step by step. Attached is a transcript of Hamza's video on the topic.\n\n[TRANSCRIPT: In this tutorial Hamza walks through building a speed-to-lead agent. Step 1: Create a basic form. Step 2: Create a Conversation AI bot in autopilot mode. Step 3: Build a workflow with Form Submitted trigger that activates the bot and sends an instant SMS. Step 4: Test end-to-end with a real form submission.]",
      },
    ],
    checks: [
      { kind: "max_lines", n: 60, label: "Response should NOT be a 200-line wall (must chunk)" },
      {
        kind: "must_match",
        regex: /(transcript|hamza|read|video)/i,
        label: "Must acknowledge the uploaded transcript",
      },
      {
        kind: "must_not_start_with",
        prefixes: ["Perfect", "Got it", "Great", "Good catch", "Absolutely", "Sure", "Awesome"],
        label: "Must not start with a filler affirmation",
      },
      {
        kind: "must_not_contain",
        needles: ["🟡", "🟢", "🔴", "✅", "⚠️"],
        label: "No emoji decorations",
      },
      {
        kind: "must_match",
        regex: /(tell me|let me know|confirm|once you|when you'?ve done|when ready)/i,
        label: "Should end with a confirmation prompt (interactive chunking)",
      },
    ],
  },
  {
    name: "S2 — user resists making the form (the Jordan moment)",
    description:
      "The exact pushback that previously made the advisor cave. New prompt must hold the line.",
    turns: [
      {
        role: "user",
        content:
          "I want to build a speed-to-lead agent for commercial roofing. Walk me through it step by step.",
      },
      {
        role: "assistant",
        content:
          "Intermediate build. We'll create a basic form, then build the AI bot, then wire them together with a workflow trigger.\n\nPart 1 — Create the form\n\n1. Left sidebar → Sites → Forms\n2. Click Add Form\n3. Pick a basic Contact template\n4. Confirm fields: Full Name, Phone, Email\n5. Save and name it \"Speed to Lead Demo - Roofing\"\n\nTell me what you see once it's saved and we'll move to the bot.",
      },
      {
        role: "user",
        content:
          "I rather not spend time customizing a form that I'm not really going to use anyway. Remember, this is really for education -- my knowing how the process works. The way I see it, I'm an automation specialist, not a form designer!",
      },
    ],
    checks: [
      {
        kind: "must_not_match",
        regex: /(skip the form|skip it|you're right.*not.*form|don't.*build.*form)/i,
        label: "Must NOT agree to skip the form",
      },
      {
        kind: "must_match",
        regex: /(need|required|necessary|trigger|fire|demo|tutorial)/i,
        label: "Must explain why the form is needed for this build",
      },
      {
        kind: "must_not_start_with",
        prefixes: ["Perfect", "Got it", "Great", "Totally fair", "You're right", "Absolutely"],
        label: "Must not open with a filler affirmation that signals capitulation",
      },
      {
        kind: "max_lines",
        n: 25,
        label: "Hold-the-line response should be tight (not a long apology)",
      },
    ],
  },
  {
    name: "S3 — user resists Autopilot, suggests Suggestive instead",
    description: "Another hold-the-line scenario. Autopilot is non-negotiable for speed-to-lead.",
    turns: [
      {
        role: "user",
        content:
          "We're configuring the speed-to-lead bot. Do I really need to set the bot to Autopilot? Can't I just use Suggestive — I want to see the replies before they go out.",
      },
    ],
    checks: [
      {
        kind: "must_match",
        regex: /autopilot/i,
        label: "Must mention Autopilot as the correct answer",
      },
      {
        kind: "must_not_match",
        regex: /(use suggestive|suggestive is fine|suggestive works for|suggestive (mode )?(is )?ok|whichever you prefer|either (one )?works|go with suggestive)/i,
        label: "Must NOT cave to Suggestive",
      },
      {
        kind: "must_not_start_with",
        prefixes: ["Sure", "Of course", "Absolutely", "Got it", "Perfect"],
        label: "Must not open with capitulation language",
      },
    ],
  },
  {
    name: "S4 — user replies with one word ('okay, saved')",
    description: "Continuing a build. User confirms the previous step in one word. Should not waste tokens on 'Perfect.'",
    turns: [
      {
        role: "user",
        content: "Build me a speed-to-lead agent.",
      },
      {
        role: "assistant",
        content:
          "Intermediate. We'll build a form, then a bot, then a workflow that ties them together.\n\nPart 1 — Create the form. Left sidebar → Sites → Forms → Add Form → pick Generic Contact Us → Save → rename to \"Speed to Lead Demo\". Tell me when that's done.",
      },
      { role: "user", content: "Okay, saved." },
    ],
    checks: [
      {
        kind: "must_not_start_with",
        prefixes: ["Perfect", "Got it", "Great", "Awesome", "Excellent", "Nice"],
        label: "Must not waste tokens on filler — start with substance",
      },
      {
        kind: "must_match",
        regex: /(part 2|next|bot|conversation ai|ai agents|let me know|tell me|confirm|check|verify|see on screen)/i,
        label: "Should move forward — next part OR a verification prompt is acceptable",
      },
    ],
  },
  {
    name: "S5 — bot prompt request mid-build (don't delegate)",
    description:
      "User asks for the bot prompt. Advisor should give a starter, not punt to the Prompting Advisor mid-flow.",
    turns: [
      {
        role: "user",
        content:
          "We're at the bot prompt section of our speed-to-lead build for commercial roofing. Give me the bot prompt.",
      },
    ],
    checks: [
      {
        kind: "must_not_match",
        regex: /(use the prompting advisor|go to the prompting advisor|switch to.*prompting advisor)/i,
        label: "Must NOT punt to Prompting Advisor mid-build",
      },
      {
        kind: "must_match",
        regex: /(personality|goal|qualification|roofing|booking)/i,
        label: "Must actually deliver a starter bot prompt (not just a referral)",
      },
    ],
  },
  {
    name: "S6 — user asks 'why does this step matter' (curiosity, not pushback)",
    description: "User is asking a legitimate clarifying question. Advisor should answer, then continue. Not treat it as pushback.",
    turns: [
      {
        role: "user",
        content:
          "Building speed-to-lead. Walk me through configuring the workflow trigger to activate the bot. Quick question first — why does the bot need to be activated by a workflow action? Why isn't it just always on?",
      },
    ],
    checks: [
      {
        kind: "must_match",
        regex: /(per.contact|per contact|activation|active|trigger|because)/i,
        label: "Should explain the reasoning",
      },
      {
        kind: "max_lines",
        n: 35,
        label: "Should be focused — not a giant essay",
      },
    ],
  },
];

function checkLine(content: string, c: Check): { pass: boolean; detail?: string } {
  switch (c.kind) {
    case "must_not_contain": {
      const hit = c.needles.find((n) => content.includes(n));
      return hit ? { pass: false, detail: `contains "${hit}"` } : { pass: true };
    }
    case "must_contain": {
      const missing = c.needles.find((n) => !content.includes(n));
      return missing ? { pass: false, detail: `missing "${missing}"` } : { pass: true };
    }
    case "must_not_start_with": {
      const trimmed = content.trimStart();
      const hit = c.prefixes.find((p) => trimmed.toLowerCase().startsWith(p.toLowerCase()));
      return hit
        ? { pass: false, detail: `starts with "${hit}"` }
        : { pass: true };
    }
    case "max_lines": {
      const n = content.split("\n").length;
      return n <= c.n
        ? { pass: true }
        : { pass: false, detail: `${n} lines (>${c.n})` };
    }
    case "must_match": {
      return c.regex.test(content)
        ? { pass: true }
        : { pass: false, detail: `did not match ${c.regex}` };
    }
    case "must_not_match": {
      return c.regex.test(content)
        ? { pass: false, detail: `matched ${c.regex} (forbidden)` }
        : { pass: true };
    }
  }
}

async function runScenario(s: Scenario) {
  console.log("\n" + "=".repeat(80));
  console.log(`${s.name}`);
  console.log(s.description);
  console.log("=".repeat(80));

  const res = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 2000,
    system: SYSTEM,
    messages: s.turns.map((t) => ({ role: t.role, content: t.content })),
  });

  const text = res.content
    .filter((b) => b.type === "text")
    .map((b) => (b as { type: "text"; text: string }).text)
    .join("\n");

  console.log("\n--- Advisor response ---\n");
  console.log(text);
  console.log("\n--- Checks ---");

  let allPass = true;
  for (const c of s.checks) {
    const { pass, detail } = checkLine(text, c);
    if (!pass) allPass = false;
    console.log(`  ${pass ? "PASS" : "FAIL"}  ${c.label}${detail ? `  →  ${detail}` : ""}`);
  }
  return { name: s.name, pass: allPass };
}

async function main() {
  console.log(`Testing Workflow Advisor prompt against ${SCENARIOS.length} scenarios\n`);
  console.log(`Model: ${MODEL}`);
  console.log(`Prompt length: ${SYSTEM.length} chars\n`);

  const results: { name: string; pass: boolean }[] = [];
  for (const s of SCENARIOS) {
    const r = await runScenario(s);
    results.push(r);
  }

  console.log("\n" + "=".repeat(80));
  console.log("SUMMARY");
  console.log("=".repeat(80));
  for (const r of results) {
    console.log(`  ${r.pass ? "PASS" : "FAIL"}  ${r.name}`);
  }
  const passCount = results.filter((r) => r.pass).length;
  console.log(`\n${passCount}/${results.length} scenarios passed`);
  process.exit(passCount === results.length ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
