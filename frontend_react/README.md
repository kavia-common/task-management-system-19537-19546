# To-Do Task Management Frontend (React)

This is a lightweight React frontend for creating, managing, and tracking to-do tasks. It integrates with a backend via RESTful APIs.

## Features
- Create, list, edit, complete/restore, and delete tasks
- Grouped display: Open and Completed sections
- Search and status filter
- Due date with overdue highlighting
- Responsive, minimal CSS (no heavy UI frameworks)
- Environment-configurable API base URL

## Getting Started

Install dependencies:
- npm install

Run locally:
- npm start
- Open http://localhost:3000

Build for production:
- npm run build

## Environment Configuration
Copy `.env.example` to `.env` and set:
- REACT_APP_API_BASE_URL=http://localhost:8000

Alternatively, an ops system can inject window.__APP_CONFIG__ = { API_BASE_URL: "..." } in index.html.

## API Contract (expected)
- GET /api/tasks -> 200 OK, JSON: Task[]
- POST /api/tasks -> 201/200, JSON: Task
- PUT /api/tasks/:id -> 200 OK, JSON: Task
- DELETE /api/tasks/:id -> 204/200

Task shape:
```
{
  id: string|number,
  title: string,
  description?: string,
  dueDate?: string (ISO),
  completed: boolean
}
```

## Source Structure
- src/services/api.js: REST client
- src/components/Layout.js, layout.css: UI primitives
- src/components/TaskForm.js: form for create/edit
- src/components/TaskList.js: list and item cards
- src/pages/TaskListPage.js: main list with search/filter
- src/pages/NewTaskPage.js: create page
- src/pages/EditTaskPage.js: edit page
- src/App.js: routes and theme toggle

## Testing
Default CRA tests remain; extend with RTL tests as needed.

## Notes
- Ensure CORS is enabled on the backend for your frontend origin.
- Do not include trailing slash in REACT_APP_API_BASE_URL.

