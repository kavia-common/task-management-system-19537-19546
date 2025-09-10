import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./layout.css";

// Shape reference:
// Task { id, title, description?, dueDate?: ISO string, completed: boolean }

// PUBLIC_INTERFACE
export default function TaskForm({ initial, onSubmit, submitting }) {
  /** Controlled form for creating or editing a task. */
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [dueDate, setDueDate] = useState(
    initial?.dueDate ? initial.dueDate.slice(0, 10) : ""
  );
  const [completed, setCompleted] = useState(!!initial?.completed);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTitle(initial?.title || "");
    setDescription(initial?.description || "");
    setDueDate(initial?.dueDate ? initial.dueDate.slice(0, 10) : "");
    setCompleted(!!initial?.completed);
  }, [initial]);

  function validate() {
    const next = {};
    if (!title.trim()) next.title = "Title is required.";
    if (title.length > 160) next.title = "Title must be <= 160 characters.";
    if (description.length > 2000) next.description = "Too long (max 2000).";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
      title: title.trim(),
      description: description.trim() || undefined,
      dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
      completed,
    };
    onSubmit?.(payload);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="field__label" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          className="input"
          placeholder="e.g., Buy groceries"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={160}
          required
        />
        {errors.title && (
          <span className="field__error" style={{ color: "#dc2626" }}>
            {errors.title}
          </span>
        )}
      </div>

      <div className="field">
        <label className="field__label" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          className="textarea"
          placeholder="Optional details..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={2000}
        />
        {errors.description && (
          <span className="field__error" style={{ color: "#dc2626" }}>
            {errors.description}
          </span>
        )}
      </div>

      <div className="field">
        <label className="field__label" htmlFor="dueDate">
          Due Date
        </label>
        <input
          id="dueDate"
          className="input"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      {initial && (
        <div className="field">
          <label className="field__label" htmlFor="completed">
            Status
          </label>
          <div>
            <label>
              <input
                id="completed"
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
              />{" "}
              Mark as completed
            </label>
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: 8 }}>
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? "Saving..." : initial ? "Save Changes" : "Create Task"}
        </button>
        <Link to="/" className="btn btn-ghost">
          Cancel
        </Link>
      </div>
    </form>
  );
}
