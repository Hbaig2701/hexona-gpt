"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, ToggleLeft, ToggleRight, RefreshCw } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";

interface UserItem {
  id: string;
  name?: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  lastActiveAt?: string;
  _count: { conversations: number };
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (filter !== "all") params.set("filter", filter);

    fetch(`/api/admin/users?${params}`)
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setUsers(data); })
      .finally(() => setLoading(false));
  }, [search, filter, refreshKey]);

  async function toggleActive(userId: string, currentState: boolean) {
    await fetch(`/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !currentState }),
    });
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, isActive: !currentState } : u))
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-hex-text-primary">
          User Management
        </h1>
        <button
          onClick={() => setRefreshKey((k) => k + 1)}
          className="p-2 text-hex-text-muted hover:text-hex-teal transition-colors rounded-lg hover:bg-hex-dark-600"
          title="Refresh data"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      <div className="flex gap-3 mb-4">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-hex-text-muted" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="pl-9"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 bg-hex-dark-600 border border-hex-dark-500 rounded text-hex-text-primary text-sm focus:outline-none focus:border-hex-teal"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-hex-dark-700 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {users.map((user) => (
            <Card key={user.id} hoverable={false} className="flex items-center justify-between py-3">
              <Link href={`/admin/users/${user.id}`} className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-hex-teal to-[#0095A8] flex items-center justify-center text-hex-dark-900 font-semibold text-xs shrink-0">
                    {user.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-hex-text-primary font-medium truncate">
                        {user.name || "Unnamed"}
                      </p>
                      {user.role === "ADMIN" && <Badge variant="warning">Admin</Badge>}
                    </div>
                    <p className="text-xs text-hex-text-muted truncate">{user.email}</p>
                  </div>
                </div>
              </Link>

              <div className="flex items-center gap-4 shrink-0 ml-4">
                <span className="text-xs text-hex-text-muted">
                  {user._count.conversations} convs
                </span>
                <span className="text-xs text-hex-text-muted">
                  {user.lastActiveAt
                    ? new Date(user.lastActiveAt).toLocaleDateString()
                    : "Never"}
                </span>
                <button
                  onClick={() => toggleActive(user.id, user.isActive)}
                  className="text-hex-text-muted hover:text-hex-text-primary transition-colors"
                  title={user.isActive ? "Deactivate" : "Activate"}
                >
                  {user.isActive ? (
                    <ToggleRight size={24} className="text-hex-success" />
                  ) : (
                    <ToggleLeft size={24} className="text-hex-error" />
                  )}
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
