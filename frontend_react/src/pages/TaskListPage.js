import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Section } from "../components/Layout";
import { TaskList } from "../components/TaskList";
import { fetchTasks, toggleComplete, deleteTask } from "../services/api";

// PUBLIC_INTERFACE
export default function TaskListPage() {
  /** Page showing all tasks, search and filters, and actions. */
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const controller = new AbortController();
      const data = await fetchTasks(controller.signal);
      setTasks(data || []);
    } catch (e) {
      setError(e.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    let list = [...tasks];
    if (q.trim()) {
      const needle = q.toLowerCase();
      list = list.filter(
        (t) =>
          t.title?.toLowerCase().includes(needle) ||
          t.description?.toLowerCase().includes(needle)
      );
    }
    if (status !== "all") {
      const wantCompleted = status === "completed";
      list = list.filter((t) => !!t.completed === wantCompleted);
    }
    return list;
  }, [tasks, q, status]);

  async function handleToggle(task) {
    try {
      const updated = await toggleComplete(task.id, !task.completed);
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    } catch (e) {
      alert(e.message || "Failed to update");
    }
  }

  async function handleDelete(task) {
    if (!window.confirm("Delete this task?")) return;
    try {
      await deleteTask(task.id);
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
    } catch (e) {
      alert(e.message || "Failed to delete");
    }
  }

  return (
    <Container>
      <Section
        title="Your Tasks"
        actions={
          <Link to="/new" className="btn btn-primary">
            + New Task
          </Link>
        }
      >
        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          <input
            className="input"
            placeholder="Search..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{ flex: 1, minWidth: 220 }}
            aria-label="Search tasks"
          />
          <select
            className="select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            aria-label="Filter status"
            style={{ width: 180 }}
          >
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="completed">Completed</option>
          </select>
          <button className="btn" onClick={load} aria-label="Refresh">
            Refresh
          </button>
        </div>

        {error && (
          <div className="card" role="alert" style={{ borderColor: "#dc2626" }}>
            <div />
            <div style={{ color: "#dc2626" }}>{error}</div>
            <div />
          </div>
        )}
        {loading ? (
          <div className="card">
            <div />
            <div>Loading...</div>
            <div />
          </div>
        ) : (
          <TaskList tasks={filtered} onToggle={handleToggle} onDelete={handleDelete} />
        )}
      </Section>
    </Container>
  );
}
