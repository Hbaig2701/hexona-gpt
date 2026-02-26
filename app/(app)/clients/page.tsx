"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

interface Client {
  id: string;
  businessName: string;
  industry?: string;
  status: string;
  contactName?: string;
  contactEmail?: string;
  updatedAt: string;
}

const statusVariant: Record<string, "success" | "warning" | "error" | "default" | "teal"> = {
  ACTIVE: "success",
  PROSPECT: "teal",
  PAUSED: "warning",
  CHURNED: "error",
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/clients")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setClients(data); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-[var(--hex-text-primary)]">Contacts</h1>
        <Link href="/clients/new">
          <Button>
            <Plus size={16} /> New Contact
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card-base p-5 animate-pulse">
              <div className="h-5 bg-hex-dark-600 rounded w-1/3 mb-2" />
              <div className="h-4 bg-hex-dark-600 rounded w-1/4" />
            </div>
          ))}
        </div>
      ) : clients.length === 0 ? (
        <Card hoverable={false} className="text-center py-12">
          <p className="text-[var(--hex-text-secondary)] mb-4">No contacts yet</p>
          <Link href="/clients/new">
            <Button>
              <Plus size={16} /> Add your first contact
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-3">
          {clients.map((client) => (
            <Link key={client.id} href={`/clients/${client.id}`}>
              <Card className="cursor-pointer flex items-center justify-between">
                <div>
                  <p className="text-[var(--hex-text-primary)] font-medium">{client.businessName}</p>
                  <p className="text-[var(--hex-text-muted)] text-sm">
                    {[client.industry, client.contactName].filter(Boolean).join(" • ") || "No details"}
                  </p>
                </div>
                <Badge variant={statusVariant[client.status] || "default"}>
                  {client.status}
                </Badge>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
