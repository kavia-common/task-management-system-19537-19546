//
// Simple REST API client for tasks
//

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  (typeof window !== "undefined" &&
    (window.__APP_CONFIG__?.API_BASE_URL || "")) ||
  ""; // Allow override via injected window config

// Helper to build URL with path
const url = (path) => `${API_BASE_URL}${path}`;

// Shared headers for JSON requests
const jsonHeaders = {
  "Content-Type": "application/json",
};

// PUBLIC_INTERFACE
export async function fetchTasks(signal) {
  /** Fetch all tasks.
   * Returns: Promise<Array<Task>>
   */
  const res = await fetch(url("/api/tasks"), { signal });
  if (!res.ok) throw new Error(`Failed to fetch tasks: ${res.status}`);
  return res.json();
}

// PUBLIC_INTERFACE
export async function createTask(payload) {
  /** Create a task.
   * payload: { title: string, description?: string, dueDate?: string (ISO), completed?: boolean }
   * Returns: Promise<Task>
   */
  const res = await fetch(url("/api/tasks"), {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to create task: ${res.status}`);
  return res.json();
}

// PUBLIC_INTERFACE
export async function updateTask(id, payload) {
  /** Update a task by id.
   * payload: Partial<Task>
   * Returns: Promise<Task>
   */
  const res = await fetch(url(`/api/tasks/${id}`), {
    method: "PUT",
    headers: jsonHeaders,
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to update task: ${res.status}`);
  return res.json();
}

// PUBLIC_INTERFACE
export async function deleteTask(id) {
  /** Delete a task by id.
   * Returns: Promise<void>
   */
  const res = await fetch(url(`/api/tasks/${id}`), {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Failed to delete task: ${res.status}`);
}

// PUBLIC_INTERFACE
export async function toggleComplete(id, completed) {
  /** Toggle completion state of a task by id.
   * Returns: Promise<Task>
   */
  return updateTask(id, { completed });
}

// PUBLIC_INTERFACE
export function getApiBaseUrl() {
  /** Returns the configured API base URL used by the app. */
  return API_BASE_URL || "/";
}
