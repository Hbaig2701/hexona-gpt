"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

interface AnalyticsData {
  dailyData: { date: string; messages: number; cost: number }[];
  gptPopularity: { gptSlug: string; count: number }[];
  modelBreakdown: { provider: string; model: string; count: number; tokensInput: number; tokensOutput: number; cost: number }[];
  topUsers: { userId: string; name: string; email: string; messageCount: number; cost: number }[];
}

const COLORS = ["#00C4CC", "#0095A8", "#10B981", "#F59E0B", "#EF4444", "#7C3AED", "#EC4899"];

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [period, setPeriod] = useState("30d");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/analytics?period=${period}`)
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [period]);

  if (loading) return <div className="max-w-5xl mx-auto animate-pulse h-64 bg-hex-dark-700 rounded-lg" />;
  if (!data) return null;

  const totalMessages = data.dailyData.reduce((s, d) => s + d.messages, 0);
  const totalCost = data.dailyData.reduce((s, d) => s + d.cost, 0);
  const mostUsedGpt = data.gptPopularity[0]?.gptSlug || "N/A";

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-hex-text-primary">Analytics</h1>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-3 py-2 bg-hex-dark-600 border border-hex-dark-500 rounded text-hex-text-primary text-sm focus:outline-none focus:border-hex-teal"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card hoverable={false}>
          <p className="text-xs text-hex-text-muted">Messages</p>
          <p className="text-2xl font-bold text-hex-text-primary">{totalMessages.toLocaleString()}</p>
        </Card>
        <Card hoverable={false}>
          <p className="text-xs text-hex-text-muted">API Cost</p>
          <p className="text-2xl font-bold text-hex-text-primary">${totalCost.toFixed(2)}</p>
        </Card>
        <Card hoverable={false}>
          <p className="text-xs text-hex-text-muted">Top Users</p>
          <p className="text-2xl font-bold text-hex-text-primary">{data.topUsers.length}</p>
        </Card>
        <Card hoverable={false}>
          <p className="text-xs text-hex-text-muted">Most Used</p>
          <p className="text-2xl font-bold text-hex-teal">{mostUsedGpt}</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Messages Over Time */}
        <Card hoverable={false}>
          <h3 className="font-display text-sm font-semibold text-hex-text-primary mb-4">Messages Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data.dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2E3847" />
              <XAxis dataKey="date" tick={{ fill: "#8B9BB4", fontSize: 11 }} tickFormatter={(d) => d.slice(5)} />
              <YAxis tick={{ fill: "#8B9BB4", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "#1E2530", border: "1px solid #2E3847", borderRadius: 8 }} />
              <Line type="monotone" dataKey="messages" stroke="#00C4CC" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Cost Over Time */}
        <Card hoverable={false}>
          <h3 className="font-display text-sm font-semibold text-hex-text-primary mb-4">Cost Over Time ($)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data.dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2E3847" />
              <XAxis dataKey="date" tick={{ fill: "#8B9BB4", fontSize: 11 }} tickFormatter={(d) => d.slice(5)} />
              <YAxis tick={{ fill: "#8B9BB4", fontSize: 11 }} tickFormatter={(v) => `$${v.toFixed(2)}`} />
              <Tooltip contentStyle={{ background: "#1E2530", border: "1px solid #2E3847", borderRadius: 8 }} />
              <Line type="monotone" dataKey="cost" stroke="#F59E0B" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* GPT Popularity */}
        <Card hoverable={false}>
          <h3 className="font-display text-sm font-semibold text-hex-text-primary mb-4">GPT Popularity</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.gptPopularity} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#2E3847" />
              <XAxis type="number" tick={{ fill: "#8B9BB4", fontSize: 11 }} />
              <YAxis dataKey="gptSlug" type="category" tick={{ fill: "#8B9BB4", fontSize: 10 }} width={100} />
              <Tooltip contentStyle={{ background: "#1E2530", border: "1px solid #2E3847", borderRadius: 8 }} />
              <Bar dataKey="count" fill="#00C4CC" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Model Cost Breakdown */}
        <Card hoverable={false}>
          <h3 className="font-display text-sm font-semibold text-hex-text-primary mb-4">Model Cost Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data.modelBreakdown}
                dataKey="cost"
                nameKey="model"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, value }: { name?: string; value?: number }) => `${name || ""}: $${(value || 0).toFixed(2)}`}
              >
                {data.modelBreakdown.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "#1E2530", border: "1px solid #2E3847", borderRadius: 8 }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top Users Table */}
      <Card hoverable={false}>
        <h3 className="font-display text-sm font-semibold text-hex-text-primary mb-4">Top 10 Most Active Users</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-hex-dark-500">
                <th className="text-left py-2 text-hex-text-muted font-medium">Name</th>
                <th className="text-left py-2 text-hex-text-muted font-medium">Email</th>
                <th className="text-right py-2 text-hex-text-muted font-medium">Messages</th>
                <th className="text-right py-2 text-hex-text-muted font-medium">Est. Cost</th>
              </tr>
            </thead>
            <tbody>
              {data.topUsers.map((u) => (
                <tr key={u.userId} className="border-b border-hex-dark-500/50">
                  <td className="py-2 text-hex-text-primary">{u.name}</td>
                  <td className="py-2 text-hex-text-secondary">{u.email}</td>
                  <td className="py-2 text-hex-text-primary text-right">{u.messageCount}</td>
                  <td className="py-2 text-hex-text-primary text-right">${u.cost.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Model Breakdown Table */}
      <Card hoverable={false}>
        <h3 className="font-display text-sm font-semibold text-hex-text-primary mb-4">Cost Breakdown by Model</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-hex-dark-500">
                <th className="text-left py-2 text-hex-text-muted font-medium">Provider</th>
                <th className="text-left py-2 text-hex-text-muted font-medium">Model</th>
                <th className="text-right py-2 text-hex-text-muted font-medium">Input Tokens</th>
                <th className="text-right py-2 text-hex-text-muted font-medium">Output Tokens</th>
                <th className="text-right py-2 text-hex-text-muted font-medium">Est. Cost</th>
              </tr>
            </thead>
            <tbody>
              {data.modelBreakdown.map((m, i) => (
                <tr key={i} className="border-b border-hex-dark-500/50">
                  <td className="py-2 text-hex-text-primary">{m.provider}</td>
                  <td className="py-2 text-hex-text-secondary">{m.model}</td>
                  <td className="py-2 text-hex-text-primary text-right">{m.tokensInput.toLocaleString()}</td>
                  <td className="py-2 text-hex-text-primary text-right">{m.tokensOutput.toLocaleString()}</td>
                  <td className="py-2 text-hex-text-primary text-right">${m.cost.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="font-semibold">
                <td colSpan={4} className="py-2 text-hex-text-primary">Total</td>
                <td className="py-2 text-hex-teal text-right">${totalCost.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
