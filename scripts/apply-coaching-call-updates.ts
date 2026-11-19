import "dotenv/config";
import fs from "fs";
import path from "path";

/**
 * Appends the coaching-call field notes to each Advisor's system prompt.
 *
 * Additive only. Before touching a prompt it snapshots the current version into
 * PromptVersion, so every change is revertible from the existing version history.
 * Re-running is safe: a prompt that already contains its addition is skipped.
 *
 *   npx tsx --env-file=.env scripts/apply-coaching-call-updates.ts          (dry run)
 *   npx tsx --env-file=.env scripts/apply-coaching-call-updates.ts --write  (apply)
 */

const WRITE = process.argv.includes("--write");
const SUPABASE_URL = process.env.SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!;
const ADD_DIR = "/tmp/gpts/add";

const TARGETS = [
  "sales",
  "pricing",
  "proposal",
  "contract",
  "prompting",
  "niche-research",
  "hamza-ai",
  "workflow",
];

function cuid() {
  const rand = () => Math.random().toString(36).slice(2);
  return ("c" + Date.now().toString(36) + rand() + rand()).slice(0, 25);
}

async function rest(p: string, init?: RequestInit) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${p}`, {
    ...init,
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res;
}

async function main() {
  const configs: { gptSlug: string; systemPrompt: string }[] = await (
    await rest("GptConfig?select=gptSlug,systemPrompt")
  ).json();
  const bySlug = new Map(configs.map((c) => [c.gptSlug, c]));

  for (const slug of TARGETS) {
    const cfg = bySlug.get(slug);
    if (!cfg) {
      console.log(`MISSING in DB: ${slug}`);
      continue;
    }

    const addition = fs.readFileSync(path.join(ADD_DIR, `${slug}.md`), "utf8");
    // Idempotency probe: a distinctive line from the addition body.
    const probe = addition
      .split("\n")
      .find((l) => l.trim().length > 40)!
      .trim();

    if (cfg.systemPrompt.includes(probe)) {
      console.log(`skip (already applied): ${slug}`);
      continue;
    }

    const before = cfg.systemPrompt.length;
    const next = cfg.systemPrompt.trimEnd() + "\n" + addition;
    console.log(
      `${slug.padEnd(16)} ${String(before).padStart(6)} -> ${String(next.length).padStart(6)} chars  (+${next.length - before})`
    );

    if (!WRITE) continue;

    // 1. Snapshot the CURRENT prompt before changing anything.
    await rest("PromptVersion", {
      method: "POST",
      body: JSON.stringify({
        id: cuid(),
        gptSlug: slug,
        prompt: cfg.systemPrompt,
        savedAt: new Date().toISOString(),
      }),
      headers: { Prefer: "return=minimal" },
    });

    // 2. Append the addition.
    await rest(`GptConfig?gptSlug=eq.${encodeURIComponent(slug)}`, {
      method: "PATCH",
      body: JSON.stringify({
        systemPrompt: next,
        updatedAt: new Date().toISOString(),
      }),
      headers: { Prefer: "return=minimal" },
    });

    console.log(`  applied, snapshot saved`);
  }

  if (!WRITE) console.log("\nDRY RUN. Re-run with --write to apply.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
