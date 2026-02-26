"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import ChatInterface from "@/components/chat/ChatInterface";

export default function ClientGptChatPage() {
  const params = useParams();
  const clientId = params.clientId as string;
  const gptSlug = params.gptSlug as string;
  const [clientName, setClientName] = useState<string>("");

  useEffect(() => {
    fetch(`/api/clients/${clientId}`)
      .then((r) => r.json())
      .then((data) => setClientName(data.businessName || ""))
      .catch(() => {});
  }, [clientId]);

  return (
    <div className="h-[calc(100vh-8rem)]">
      <Suspense fallback={<div className="text-hex-text-muted text-center py-8">Loading...</div>}>
        <ChatInterface gptSlug={gptSlug} clientId={clientId} clientName={clientName} />
      </Suspense>
    </div>
  );
}
