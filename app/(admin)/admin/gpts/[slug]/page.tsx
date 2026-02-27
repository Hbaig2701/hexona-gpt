"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { Save, Upload, Trash2, Clock } from "lucide-react";
import PromptEditorChat from "@/components/admin/PromptEditorChat";

interface GptConfigData {
  gptSlug: string;
  systemPrompt: string;
  isActive: boolean;
  modelOverride?: string;
  temperature?: number;
  badge?: string;
  suggestedPrompts: string[];
  promptVersions: { id: string; prompt: string; savedAt: string }[];
  knowledgeDocs: { id: string; name: string; uploadedAt: string; _count: { chunks: number } }[];
}

export default function AdminGptConfigPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [config, setConfig] = useState<GptConfigData | null>(null);
  const [activeTab, setActiveTab] = useState<"prompt" | "knowledge" | "settings">("prompt");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/gpts/${slug}`)
      .then((r) => r.json())
      .then(setConfig)
      .finally(() => setLoading(false));
  }, [slug]);

  async function handleSavePrompt() {
    if (!config) return;
    setSaving(true);
    await fetch(`/api/admin/gpts/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ systemPrompt: config.systemPrompt }),
    });
    setSaving(false);
  }

  async function handleSaveSettings() {
    if (!config) return;
    setSaving(true);
    await fetch(`/api/admin/gpts/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isActive: config.isActive,
        modelOverride: config.modelOverride || null,
        temperature: config.temperature,
        badge: config.badge || null,
        suggestedPrompts: config.suggestedPrompts,
      }),
    });
    setSaving(false);
  }

  async function handleUploadDoc(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`/api/admin/gpts/${slug}/knowledge`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    if (config) {
      setConfig({
        ...config,
        knowledgeDocs: [
          ...config.knowledgeDocs,
          { id: data.id, name: data.name, uploadedAt: new Date().toISOString(), _count: { chunks: data.chunkCount || 0 } },
        ],
      });
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleDeleteDoc(docId: string) {
    if (!confirm("Delete this document?")) return;
    await fetch(`/api/admin/gpts/${slug}/knowledge?docId=${docId}`, { method: "DELETE" });
    if (config) {
      setConfig({
        ...config,
        knowledgeDocs: config.knowledgeDocs.filter((d) => d.id !== docId),
      });
    }
  }

  function restoreVersion(prompt: string) {
    if (!config) return;
    setConfig({ ...config, systemPrompt: prompt });
  }

  if (loading) return <div className="max-w-4xl mx-auto animate-pulse h-64 bg-hex-dark-700 rounded-lg" />;
  if (!config) return <p className="text-hex-text-muted text-center">Not found</p>;

  const tabs = [
    { key: "prompt" as const, label: "System Prompt" },
    { key: "knowledge" as const, label: "Knowledge Base" },
    { key: "settings" as const, label: "Settings" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="font-display text-2xl font-bold text-hex-text-primary">{slug}</h1>
        <Badge variant={config.isActive ? "success" : "error"}>
          {config.isActive ? "Active" : "Inactive"}
        </Badge>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-hex-dark-500">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? "border-hex-teal text-hex-teal"
                : "border-transparent text-hex-text-muted hover:text-hex-text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* System Prompt Tab */}
      {activeTab === "prompt" && (
        <div className="space-y-4">
          <textarea
            value={config.systemPrompt}
            onChange={(e) => setConfig({ ...config, systemPrompt: e.target.value })}
            className="w-full h-96 px-4 py-3 bg-hex-dark-900 border border-hex-dark-500 rounded-lg text-hex-text-primary font-mono text-sm focus:outline-none focus:border-hex-teal resize-y"
            placeholder="Enter system prompt..."
          />
          <div className="flex gap-3">
            <Button onClick={handleSavePrompt} loading={saving}>
              <Save size={14} /> Save Prompt
            </Button>
          </div>

          {/* Prompt Editor Chat */}
          <PromptEditorChat
            currentPrompt={config.systemPrompt}
            gptSlug={slug}
            onApplyPrompt={(newPrompt) => setConfig({ ...config, systemPrompt: newPrompt })}
          />

          {/* Version History */}
          {config.promptVersions.length > 0 && (
            <Card hoverable={false}>
              <h3 className="font-display text-sm font-semibold text-hex-text-primary mb-3 flex items-center gap-2">
                <Clock size={14} /> Version History
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {config.promptVersions.map((v) => (
                  <div key={v.id} className="flex items-center justify-between text-sm">
                    <span className="text-hex-text-muted">
                      {new Date(v.savedAt).toLocaleString()}
                    </span>
                    <button
                      onClick={() => restoreVersion(v.prompt)}
                      className="text-hex-teal text-xs hover:underline"
                    >
                      Restore
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Knowledge Base Tab */}
      {activeTab === "knowledge" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Button onClick={() => fileInputRef.current?.click()} loading={uploading}>
              <Upload size={14} /> Upload Document
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleUploadDoc}
              accept=".pdf,.txt,.md,.docx"
              className="hidden"
            />
            <span className="text-xs text-hex-text-muted">PDF, TXT, MD, DOCX</span>
          </div>

          {config.knowledgeDocs.length === 0 ? (
            <Card hoverable={false} className="text-center py-8">
              <p className="text-hex-text-muted">No knowledge documents yet</p>
              <p className="text-xs text-hex-text-muted mt-1">Upload documents to enable RAG for this GPT</p>
            </Card>
          ) : (
            <div className="space-y-2">
              {config.knowledgeDocs.map((doc) => (
                <Card key={doc.id} hoverable={false} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm text-hex-text-primary">{doc.name}</p>
                    <p className="text-xs text-hex-text-muted">
                      {doc._count.chunks} chunks • {new Date(doc.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteDoc(doc.id)}
                    className="text-hex-error hover:opacity-70"
                  >
                    <Trash2 size={16} />
                  </button>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="space-y-4">
          <Card hoverable={false} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-hex-text-secondary mb-1.5">Model Override</label>
              <select
                value={config.modelOverride || ""}
                onChange={(e) => setConfig({ ...config, modelOverride: e.target.value || undefined })}
                className="w-full px-3 py-2 bg-hex-dark-600 border border-hex-dark-500 rounded text-hex-text-primary text-sm focus:outline-none focus:border-hex-teal"
              >
                <option value="">Default (from catalog)</option>
                <option value="claude-haiku-4-5-20251001">Claude Haiku</option>
                <option value="claude-sonnet-4-6">Claude Sonnet</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-hex-text-secondary mb-1.5">
                Temperature: {config.temperature ?? 0.7}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={config.temperature ?? 0.7}
                onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm text-hex-text-secondary">Active</label>
              <button
                onClick={() => setConfig({ ...config, isActive: !config.isActive })}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  config.isActive ? "bg-hex-success" : "bg-hex-dark-500"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    config.isActive ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-hex-text-secondary mb-1.5">Badge</label>
              <select
                value={config.badge || ""}
                onChange={(e) => setConfig({ ...config, badge: e.target.value || undefined })}
                className="w-full px-3 py-2 bg-hex-dark-600 border border-hex-dark-500 rounded text-hex-text-primary text-sm focus:outline-none focus:border-hex-teal"
              >
                <option value="">None</option>
                <option value="popular">Popular</option>
                <option value="new">New</option>
                <option value="pro">Pro</option>
              </select>
            </div>
          </Card>

          <Button onClick={handleSaveSettings} loading={saving}>
            <Save size={14} /> Save Settings
          </Button>
        </div>
      )}
    </div>
  );
}
