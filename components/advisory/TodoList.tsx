"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, CheckCircle2, Circle, Loader2 } from "lucide-react";

interface Todo {
  id: string;
  content: string;
  isCompleted: boolean;
  order: number;
  completedAt: string | null;
  createdAt: string;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/advisory/todos")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setTodos(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    const content = input.trim();
    if (!content || submitting) return;
    setSubmitting(true);
    const res = await fetch("/api/advisory/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    if (res.ok) {
      const created: Todo = await res.json();
      setTodos((prev) => [...prev, created]);
      setInput("");
    }
    setSubmitting(false);
  }

  async function toggle(todo: Todo) {
    const optimistic = !todo.isCompleted;
    setTodos((prev) =>
      prev.map((t) => (t.id === todo.id ? { ...t, isCompleted: optimistic } : t))
    );
    const res = await fetch(`/api/advisory/todos/${todo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isCompleted: optimistic }),
    });
    if (!res.ok) {
      setTodos((prev) =>
        prev.map((t) => (t.id === todo.id ? { ...t, isCompleted: !optimistic } : t))
      );
    }
  }

  async function remove(todo: Todo) {
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));
    const res = await fetch(`/api/advisory/todos/${todo.id}`, { method: "DELETE" });
    if (!res.ok) {
      // restore on failure
      setTodos((prev) => [...prev, todo].sort((a, b) => a.order - b.order));
    }
  }

  const active = todos.filter((t) => !t.isCompleted);
  const completed = todos.filter((t) => t.isCompleted);

  return (
    <div className="space-y-6">
      <form onSubmit={add} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What do you want to get done?"
          className="flex-1 bg-hex-dark-700 border border-[var(--hex-dark-500)] rounded-lg px-4 py-2.5 text-sm text-[var(--hex-text-primary)] placeholder:text-[var(--hex-text-muted)] focus:outline-none focus:border-hex-teal/40"
        />
        <button
          type="submit"
          disabled={submitting || !input.trim()}
          className="inline-flex items-center gap-2 bg-gradient-to-br from-hex-teal to-[#0095A8] text-hex-dark-900 font-semibold px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {submitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
          Add
        </button>
      </form>

      {loading ? (
        <div className="flex items-center justify-center py-12 text-[var(--hex-text-muted)] text-sm gap-2">
          <Loader2 size={14} className="animate-spin" /> Loading…
        </div>
      ) : todos.length === 0 ? (
        <div className="text-center py-12 text-[var(--hex-text-muted)] text-sm">
          No to-dos yet. Add one above to get started.
        </div>
      ) : (
        <>
          {active.length > 0 && (
            <div className="space-y-2">
              {active.map((todo) => (
                <TodoRow key={todo.id} todo={todo} onToggle={toggle} onRemove={remove} />
              ))}
            </div>
          )}

          {completed.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--hex-text-muted)] mb-2">
                Completed ({completed.length})
              </p>
              <div className="space-y-2 opacity-60">
                {completed.map((todo) => (
                  <TodoRow key={todo.id} todo={todo} onToggle={toggle} onRemove={remove} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function TodoRow({
  todo,
  onToggle,
  onRemove,
}: {
  todo: Todo;
  onToggle: (t: Todo) => void;
  onRemove: (t: Todo) => void;
}) {
  return (
    <div className="group flex items-center gap-3 p-3 bg-hex-dark-700/50 border border-[var(--hex-dark-500)] rounded-lg">
      <button
        onClick={() => onToggle(todo)}
        className="shrink-0 transition-colors"
        aria-label={todo.isCompleted ? "Mark incomplete" : "Mark complete"}
      >
        {todo.isCompleted ? (
          <CheckCircle2 size={18} className="text-hex-success" />
        ) : (
          <Circle size={18} className="text-[var(--hex-text-muted)] hover:text-hex-teal" />
        )}
      </button>
      <p
        className={`flex-1 text-sm ${
          todo.isCompleted
            ? "line-through text-[var(--hex-text-muted)]"
            : "text-[var(--hex-text-primary)]"
        }`}
      >
        {todo.content}
      </p>
      <button
        onClick={() => onRemove(todo)}
        className="shrink-0 p-1 rounded text-red-400/60 hover:text-red-400 hover:bg-red-400/10 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Delete"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
