import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { conversationId } = await req.json();
  if (!conversationId) {
    return NextResponse.json({ error: "Missing conversationId" }, { status: 400 });
  }

  // Fetch the onboarding conversation messages
  const conversation = await prisma.conversation.findFirst({
    where: { id: conversationId, userId: session.user.id, gptSlug: "agency-onboarding" },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });

  if (!conversation || conversation.messages.length === 0) {
    return NextResponse.json({ error: "No messages found" }, { status: 404 });
  }

  const transcript = conversation.messages
    .map((m) => `${m.role}: ${m.content}`)
    .join("\n");

  // Use Claude Haiku to extract structured profile data from the conversation
  const Anthropic = (await import("@anthropic-ai/sdk")).default;
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const response = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 500,
    messages: [
      {
        role: "user",
        content: `Extract agency profile data from this onboarding conversation. Return ONLY valid JSON with these fields (use empty string if not mentioned, use array for services):

{
  "niche": "their target industry/niche",
  "services": ["service1", "service2"],
  "location": "their location",
  "monthlyRevenue": "current monthly revenue",
  "revenueGoal": "revenue goal",
  "experienceLevel": "beginner/intermediate/experienced",
  "background": "brief background",
  "biggestChallenge": "their main challenge"
}

Conversation:
${transcript}`,
      },
    ],
  });

  const text = (response.content[0] as { text: string }).text?.trim();
  if (!text) {
    return NextResponse.json({ error: "Extraction failed" }, { status: 500 });
  }

  // Parse the JSON from the response
  let profileData;
  try {
    // Handle potential markdown code fences
    const jsonStr = text.replace(/```json?\n?/g, "").replace(/```/g, "").trim();
    profileData = JSON.parse(jsonStr);
  } catch {
    return NextResponse.json({ error: "Failed to parse extracted data" }, { status: 500 });
  }

  // Save to AgencyProfile
  const profile = await prisma.agencyProfile.upsert({
    where: { userId: session.user.id },
    update: {
      niche: profileData.niche || undefined,
      services: profileData.services || [],
      location: profileData.location || undefined,
      monthlyRevenue: profileData.monthlyRevenue || undefined,
      revenueGoal: profileData.revenueGoal || undefined,
      experienceLevel: profileData.experienceLevel || undefined,
      background: profileData.background || undefined,
      biggestChallenge: profileData.biggestChallenge || undefined,
      completedAt: new Date(),
    },
    create: {
      userId: session.user.id,
      niche: profileData.niche || "",
      services: profileData.services || [],
      location: profileData.location || "",
      monthlyRevenue: profileData.monthlyRevenue || "",
      revenueGoal: profileData.revenueGoal || "",
      experienceLevel: profileData.experienceLevel || "",
      background: profileData.background || "",
      biggestChallenge: profileData.biggestChallenge || "",
      completedAt: new Date(),
    },
  });

  // Also save conversation summary for cross-GPT memory
  const summaryResponse = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 250,
    messages: [
      {
        role: "user",
        content: `Summarize this onboarding conversation in 2-3 sentences. Focus on the agency's niche, services, goals, and challenges.\n\n${transcript}`,
      },
    ],
  });

  const summary = (summaryResponse.content[0] as { text: string }).text?.trim();
  if (summary) {
    await Promise.all([
      prisma.gptMemory.upsert({
        where: { userId_gptSlug: { userId: session.user.id, gptSlug: "agency-onboarding" } },
        create: { userId: session.user.id, gptSlug: "agency-onboarding", memoryBlob: summary },
        update: { memoryBlob: summary },
      }),
      prisma.conversation.update({
        where: { id: conversationId },
        data: { summary },
      }),
    ]);
  }

  return NextResponse.json({ profile, extracted: profileData });
}
