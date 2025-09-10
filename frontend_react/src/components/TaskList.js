import React from "react";
import { Link } from "react-router-dom";
import "./layout.css";

// PUBLIC_INTERFACE
export function TaskItem({ task, onToggle, onDelete }) {
  /** Single task row card with actions. */
  const due = task.dueDate ? new Date(task.dueDate) : null;
  const today = new Date();
  const isOverdue = due && !task.completed && due < new Date(today.toDateString());

  return (
    <div className="card" role="listitem" aria-label={task.title}>
      <div>
        <input
          type="checkbox"
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
          checked={!!task.completed}
          onChange={() => onToggle?.(task)}
        />
      </div>
      <div>
        <h4 className="card__title" style={{ textDecoration: task.completed ? "line-through" : "none" }}>
          {task.title}
        </h4>
        <div className="card__meta">
          {due && (
            <span className={`badge ${isOverdue ? "badge-warning" : ""}`}>
              Due: {due.toLocaleDateString()}
            </span>
          )}
          {" "}
          <span className={`badge ${task.completed ? "badge-success" : ""}`}>
            {task.completed ? "Completed" : "Open"}
          </span>
        </div>
      </div>
      <div className="card__actions">
        <Link to={`/edit/${task.id}`} className="btn">Edit</Link>
        <button className="btn btn-danger" onClick={() => onDelete?.(task)}>
          Delete
        </button>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export function TaskList({ tasks, onToggle, onDelete }) {
  /** List of tasks split by completion. */
  const open = tasks.filter((t) => !t.completed);
  const done = tasks.filter((t) => !!t.completed);

  return (
    <div className="list" role="list">
      {open.map((t) => (
        <TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
      {open.length === 0 && (
        <div className="card">
          <div />
          <div>No open tasks 🎉</div>
          <div />
        </div>
      )}

      {done.length > 0 && (
        <>
          <div style={{ height: 8 }} />
          <div className="section__header" style={{ border: "none" }}>
            <h3 className="section__title" style={{ margin: 0 }}>
              Completed ({done.length})
            </h3>
          </div>
          {done.map((t) => (
            <TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} />
          ))}
        </>
      )}
    </div>
  );
}
