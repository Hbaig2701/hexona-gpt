"use client";

import { useParams } from "next/navigation";
import { Suspense } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import ChatInterface from "@/components/chat/ChatInterface";
import ContactPickerInterstitial from "@/components/advisors/ContactPickerInterstitial";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import {
  GPT_CATEGORIES,
  getGptBySlug,
  getGptsByCategory,
  userCanAccessGpt,
  type GPTCategory,
} from "@/lib/gpt-catalog";
import type { UserTier } from "@prisma/client";

function CategoryView({ category, userTier }: { category: GPTCategory; userTier: UserTier }) {
  const categoryInfo = GPT_CATEGORIES[category];
  const gpts = getGptsByCategory(category).filter((g) => userCanAccessGpt(userTier, g));

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-hex-text-primary">
          {categoryInfo.label}
        </h1>
        <p className="text-hex-text-secondary text-sm mt-1">
          {gpts.length} tool{gpts.length !== 1 ? "s" : ""} available
        </p>
      </div>
      <div className="space-y-3">
        {gpts.map((gpt) => {
          const Icon = (LucideIcons as unknown as Record<string, React.ElementType>)[gpt.icon] || LucideIcons.Zap;
          return (
            <Link key={gpt.slug} href={`/advisors/${gpt.slug}`}>
              <Card className="cursor-pointer flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${categoryInfo.color}20` }}
                >
                  <Icon size={22} style={{ color: categoryInfo.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-hex-text-primary font-medium">{gpt.name}</p>
                    {gpt.badge && (
                      <Badge variant={gpt.badge === "popular" ? "teal" : gpt.badge === "pro" ? "warning" : "success"}>
                        {gpt.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-hex-text-muted text-sm mt-0.5">{gpt.description}</p>
                  <p className="text-xs text-hex-text-muted mt-1 capitalize">
                    {gpt.scope === "client" ? "Contact-scoped" : gpt.scope === "both" ? "Global + Contact" : "Global"}
                  </p>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function GptPage() {
  const params = useParams();
  const slug = params.advisorSlug as string;
  const { data: session } = useSession();
  const userTier = (session?.user as { tier?: UserTier } | undefined)?.tier ?? "TIER_0";

  // Check if it's a valid GPT first (takes priority over category if slug matches both)
  const gpt = getGptBySlug(slug);

  // If not a GPT, check if this is a category
  if (!gpt && slug in GPT_CATEGORIES) {
    return <CategoryView category={slug as GPTCategory} userTier={userTier} />;
  }

  // Tier-gated advisors look like "not found" to users below the required tier
  if (!gpt || !userCanAccessGpt(userTier, gpt)) {
    return <p className="text-hex-text-muted text-center py-12">Advisor not found</p>;
  }

  // Contact-scoped GPTs need a contact selected first
  if (gpt.scope === "client") {
    return <ContactPickerInterstitial gpt={gpt} />;
  }

  return (
    <div className="h-[calc(100vh-8rem)]">
      <Suspense fallback={<div className="text-hex-text-muted text-center py-8">Loading...</div>}>
        <ChatInterface gptSlug={slug} />
      </Suspense>
    </div>
  );
}
