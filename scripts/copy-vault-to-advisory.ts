import "dotenv/config";
import { VAULT_CATEGORIES } from "@/lib/resource-vault/industries";
import {
  COACHING_GROUPS,
  COLD_CALL_GROUPS,
  COLD_CALL_INTRO,
  LICENSEE_AUTOMATIONS,
  LIVE_CALLS,
} from "@/lib/resource-vault/sections";

/**
 * Copies the public /resource-vault content that Agency Advisory does not
 * already have into the Resource table. Prompt libraries (Ask AI Prompts,
 * Prompting Guides, Voice AI, Conversational AI) are deliberately excluded.
 *
 * Skipped as already present in Advisory:
 *   Funnel Template Snapshots  -> "Funnel Inventory"
 *   Process Mapping Flowcharts -> "Hamza's Flowcharts"
 *
 * Industry Templates are copied as SNAPSHOT LINKS ONLY. The per-industry
 * website prompt text stays in the public vault, since that is prompt content.
 *
 * Tier convention, matching the existing rows: TIER_1 takes the bare slug and
 * TIER_2 the same slug with a "-t2" suffix. Run with:
 *   npx tsx --env-file=.env scripts/copy-vault-to-advisory.ts          (dry run)
 *   npx tsx --env-file=.env scripts/copy-vault-to-advisory.ts --write  (insert)
 */

const WRITE = process.argv.includes("--write");
const SUPABASE_URL = process.env.SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!;
const TIERS = ["TIER_1", "TIER_2"] as const;

type ListItem = {
  title: string;
  body?: string;
  links: Array<{ label: string; url: string }>;
};

function cuid() {
  const rand = () => Math.random().toString(36).slice(2);
  return ("c" + Date.now().toString(36) + rand() + rand()).slice(0, 25);
}

const coldCallItems: ListItem[] = COLD_CALL_GROUPS.flatMap((g) =>
  g.links.map((l) => ({
    title: l.title,
    links: [{ label: "Listen", url: l.url! }],
  }))
);

const coachingGroups = [
  {
    heading: "Live Calls",
    items: LIVE_CALLS.map((c) => ({
      title: c.title,
      body: c.note ? `${c.cadence}. ${c.note}` : c.cadence,
      links: [
        { label: "Join call", url: c.joinUrl },
        { label: c.rsvpLabel, url: c.rsvpUrl },
      ],
    })),
  },
  {
    heading: "Recordings",
    items: COACHING_GROUPS[0].links.map((l) => ({
      title: l.title,
      links: [{ label: "Watch recording", url: l.url! }],
    })),
  },
];

const industryGroups = VAULT_CATEGORIES.map((cat) => ({
  heading: cat.heading,
  items: cat.items.map((ind) => ({
    title: `${ind.emoji} ${ind.name}`,
    links: [{ label: "Open snapshot", url: ind.snapshotUrl }],
  })),
}));

const NEW_RESOURCES = [
  {
    slug: "licensee-automations",
    title: "Licensee Automations",
    description:
      "Spreadsheet of pre-built automations with setup guides and one-click import links.",
    category: "Templates",
    url: LICENSEE_AUTOMATIONS.url!,
    listData: null,
    order: 24,
  },
  {
    slug: "cold-calling-examples",
    title: "Cold Calling Examples",
    description: COLD_CALL_INTRO,
    category: "Sales Assets",
    url: "https://drive.google.com/drive/folders/14JGqtllghtWIUc355W2sNJ-Y6tWcDsp1",
    listData: { items: coldCallItems },
    order: 25,
  },
  {
    slug: "coaching-calls",
    title: "Coaching Calls",
    description: "Live call schedule plus the full recording archive.",
    category: "Coaching Calls",
    url: "",
    listData: { groups: coachingGroups },
    order: 26,
  },
  {
    slug: "industry-snapshot-templates",
    title: "Industry Snapshot Templates",
    description:
      "87 industry snapshots you can import straight into GoHighLevel, sorted by industry.",
    category: "Templates",
    url: "",
    listData: { groups: industryGroups },
    order: 27,
  },
];

async function rest(path: string, init?: RequestInit) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
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
  const existing: Array<{ slug: string }> = await (
    await rest("Resource?select=slug")
  ).json();
  const have = new Set(existing.map((r) => r.slug));

  const rows: Record<string, unknown>[] = [];
  for (const r of NEW_RESOURCES) {
    for (const tier of TIERS) {
      const slug = tier === "TIER_1" ? r.slug : `${r.slug}-t2`;
      if (have.has(slug)) {
        console.log(`skip (exists): ${slug}`);
        continue;
      }
      const now = new Date().toISOString();
      rows.push({
        id: cuid(),
        slug,
        title: r.title,
        description: r.description,
        url: r.url,
        listData: r.listData,
        tableData: null,
        documentMd: null,
        category: r.category,
        thumbnailUrl: null,
        requiredTier: tier,
        order: r.order,
        isPublished: true,
        createdAt: now,
        updatedAt: now,
      });
    }
  }

  console.log(`\n${rows.length} row(s) to insert:\n`);
  for (const row of rows) {
    const list = row.listData as { items?: unknown[]; groups?: Array<{ items: unknown[] }> } | null;
    const count = list?.items
      ? `${list.items.length} items`
      : list?.groups
        ? `${list.groups.length} groups, ${list.groups.reduce((n, g) => n + g.items.length, 0)} items`
        : row.url
          ? "direct link"
          : "no content";
    console.log(`  ${row.requiredTier}  ${row.slug}  [${row.category}]  ${count}`);
  }

  if (!WRITE) {
    console.log("\nDRY RUN. Re-run with --write to insert.");
    return;
  }

  if (rows.length) {
    await rest("Resource", {
      method: "POST",
      body: JSON.stringify(rows),
      headers: { Prefer: "return=minimal" },
    });
  }
  console.log(`\nInserted ${rows.length} row(s).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
