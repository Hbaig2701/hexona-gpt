"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { GPT_CATEGORIES } from "@/lib/gpt-catalog";

interface GptItem {
  slug: string;
  name: string;
  category: string;
  config?: {
    isActive: boolean;
    updatedAt: string;
    _count: { knowledgeDocs: number; promptVersions: number };
  };
}

export default function AdminGptsPage() {
  const [gpts, setGpts] = useState<GptItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/gpts")
      .then((r) => r.json())
      .then(setGpts)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="max-w-4xl mx-auto animate-pulse h-64 bg-hex-dark-700 rounded-lg" />;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-display text-2xl font-bold text-hex-text-primary mb-6">GPT Configuration</h1>

      <div className="space-y-2">
        {gpts.map((gpt) => {
          const cat = GPT_CATEGORIES[gpt.category as keyof typeof GPT_CATEGORIES];
          return (
            <Link key={gpt.slug} href={`/admin/gpts/${gpt.slug}`}>
              <Card className="cursor-pointer flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: cat?.color || "#666" }}
                  />
                  <div>
                    <p className="text-sm text-hex-text-primary font-medium">{gpt.name}</p>
                    <p className="text-xs text-hex-text-muted">{cat?.label || gpt.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {gpt.config && (
                    <>
                      <span className="text-xs text-hex-text-muted">
                        {gpt.config._count.knowledgeDocs} docs
                      </span>
                      <span className="text-xs text-hex-text-muted">
                        v{gpt.config._count.promptVersions}
                      </span>
                    </>
                  )}
                  <Badge variant={gpt.config?.isActive !== false ? "success" : "error"}>
                    {gpt.config?.isActive !== false ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
