import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { summarizeConversation } from "@/lib/ai/memory";

export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { conversationId, gptSlug } = await req.json();

  if (!conversationId || !gptSlug) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    await summarizeConversation(session.user.id, gptSlug, conversationId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Summarization error:", error);
    return NextResponse.json({ error: "Summarization failed" }, { status: 500 });
  }
}
