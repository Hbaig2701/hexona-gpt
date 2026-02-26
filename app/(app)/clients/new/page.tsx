"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserSearch, UserCheck, ArrowLeft } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

type ContactType = "PROSPECT" | "ACTIVE";

export default function NewClientPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<"type-selection" | "details">("type-selection");
  const [contactType, setContactType] = useState<ContactType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    businessName: "",
    website: "",
    industry: "",
    contactName: "",
    contactEmail: "",
    notes: "",
  });

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function selectType(type: ContactType) {
    setContactType(type);
    setStep("details");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.businessName.trim()) {
      setError("Business name is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, status: contactType }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create contact");
        return;
      }

      const client = await res.json();
      const redirectTo = searchParams.get("redirectTo");
      if (redirectTo) {
        router.push(redirectTo.replace("{clientId}", client.id));
      } else {
        router.push(`/clients/${client.id}`);
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="font-display text-2xl font-bold text-[var(--hex-text-primary)] mb-6">
        New Contact
      </h1>

      {step === "type-selection" && (
        <div className="space-y-4">
          <p className="text-[var(--hex-text-secondary)] text-sm">
            Are you adding a prospect or an active client?
          </p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => selectType("PROSPECT")}
              className="card-base p-5 text-left hover:border-hex-teal transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-[rgba(0,196,204,0.1)] flex items-center justify-center mb-3">
                <UserSearch size={20} className="text-hex-teal" />
              </div>
              <p className="text-[var(--hex-text-primary)] font-medium mb-1">Prospect</p>
              <p className="text-[var(--hex-text-muted)] text-xs">
                Someone you&apos;re pursuing or researching
              </p>
            </button>
            <button
              onClick={() => selectType("ACTIVE")}
              className="card-base p-5 text-left hover:border-hex-teal transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-[rgba(16,185,129,0.1)] flex items-center justify-center mb-3">
                <UserCheck size={20} className="text-[#10B981]" />
              </div>
              <p className="text-[var(--hex-text-primary)] font-medium mb-1">Active Client</p>
              <p className="text-[var(--hex-text-muted)] text-xs">
                Someone you&apos;re currently working with
              </p>
            </button>
          </div>
        </div>
      )}

      {step === "details" && (
        <>
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setStep("type-selection")}
              className="text-[var(--hex-text-muted)] hover:text-[var(--hex-text-primary)] transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <Badge variant={contactType === "ACTIVE" ? "success" : "teal"}>
              {contactType === "ACTIVE" ? "Active Client" : "Prospect"}
            </Badge>
          </div>

          <form onSubmit={handleSubmit} className="card-base p-6 space-y-4">
            <Input
              label="Business Name *"
              value={form.businessName}
              onChange={(e) => update("businessName", e.target.value)}
              placeholder="e.g., Apex Roofing"
              required
            />
            <Input
              label="Website"
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
              placeholder="https://..."
            />
            <Input
              label="Industry"
              value={form.industry}
              onChange={(e) => update("industry", e.target.value)}
              placeholder="e.g., Roofing, Dental, HVAC"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Contact Name"
                value={form.contactName}
                onChange={(e) => update("contactName", e.target.value)}
                placeholder="John Smith"
              />
              <Input
                label="Contact Email"
                type="email"
                value={form.contactEmail}
                onChange={(e) => update("contactEmail", e.target.value)}
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--hex-text-secondary)] mb-1.5">Notes</label>
              <textarea
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="Any notes about this contact..."
                rows={3}
                className="w-full px-3 py-2 bg-[var(--hex-dark-600)] border border-[var(--hex-dark-500)] rounded text-[var(--hex-text-primary)] placeholder:text-[var(--hex-text-muted)] focus:outline-none focus:border-[var(--hex-teal)] transition-colors resize-none"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-[var(--hex-error)]/10 border border-[var(--hex-error)]/20 text-[var(--hex-error)] text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" loading={loading} className="flex-1">
                Create Contact
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
