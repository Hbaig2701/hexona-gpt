import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { requireAdmin } from "@/lib/admin-guard";
import { getGptBySlug } from "@/lib/gpt-catalog";

export const dynamic = "force-dynamic";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

interface Edit {
  oldText: string;
  newText: string;
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return NextResponse.json({ error: auth.error }, { status: 403 });

  const { slug } = await params;
  const { currentPrompt, instruction, history } = await req.json();

  if (!currentPrompt || !instruction) {
    return NextResponse.json({ error: "Missing currentPrompt or instruction" }, { status: 400 });
  }

  const gpt = getGptBySlug(slug);
  const gptName = gpt?.name || slug;

  const systemPrompt = `You are an expert prompt engineer helping an admin edit AI system prompts for Hexona Systems.

You are editing the system prompt for the "${gptName}" GPT.

RULES:
1. Make ONLY the changes the admin requests. Do not rewrite sections that don't need changing.
2. Return your changes as specific find-and-replace edits using XML tags.
3. Before the edits, briefly explain what you're changing (2-3 sentences).
4. If the instruction is unclear, ask a clarifying question and do NOT include any edits.
5. Maintain any [IF CLIENT CONTEXT] / [IF NO CLIENT CONTEXT] conditional blocks unless told otherwise.
6. The <old> text must be an EXACT substring of the current prompt (including whitespace and newlines).
7. Keep edits minimal — change only what's needed.

FORMAT — return edits like this:

Your explanation of what changed.

<edit>
<old>exact text from the current prompt to replace</old>
<new>the replacement text</new>
</edit>

<edit>
<old>another exact substring to replace</old>
<new>its replacement</new>
</edit>

You can return multiple <edit> blocks if multiple sections need changing.

CURRENT PROMPT:
---
${currentPrompt}
---`;

  const messages: { role: "user" | "assistant"; content: string }[] = [
    ...(history || []),
    { role: "user" as const, content: instruction },
  ];

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 4096,
      system: systemPrompt,
      messages,
    });

    const fullText = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("");

    // Parse edits from <edit><old>...</old><new>...</new></edit> tags
    const editRegex = /<edit>\s*<old>([\s\S]*?)<\/old>\s*<new>([\s\S]*?)<\/new>\s*<\/edit>/g;
    const edits: Edit[] = [];
    let match;
    while ((match = editRegex.exec(fullText)) !== null) {
      edits.push({ oldText: match[1], newText: match[2] });
    }

    // Explanation is everything before the first <edit> tag
    const explanation = fullText.replace(/<edit>[\s\S]*$/m, "").trim();

    // Apply edits to produce the updated prompt
    let updatedPrompt = currentPrompt;
    const appliedEdits: Edit[] = [];
    for (const edit of edits) {
      if (updatedPrompt.includes(edit.oldText)) {
        updatedPrompt = updatedPrompt.replace(edit.oldText, edit.newText);
        appliedEdits.push(edit);
      }
    }

    return NextResponse.json({
      explanation,
      edits: appliedEdits,
      updatedPrompt: appliedEdits.length > 0 ? updatedPrompt : null,
    });
  } catch (error) {
    console.error("Prompt editor error:", error);
    return NextResponse.json(
      { error: "Failed to process prompt edit" },
      { status: 500 }
    );
  }
}
