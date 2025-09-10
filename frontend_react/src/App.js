import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Layout";
import TaskListPage from "./pages/TaskListPage";
import NewTaskPage from "./pages/NewTaskPage";
import EditTaskPage from "./pages/EditTaskPage";
import { getApiBaseUrl } from "./services/api";

// PUBLIC_INTERFACE
function App() {
  /** Root app with routing and theme toggle. */
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const apiInfo = useMemo(() => {
    const base = getApiBaseUrl();
    return base ? `API: ${base}` : "API: / (default)";
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        <div style={{ paddingTop: 8, textAlign: "center", color: "var(--text-secondary)" }}>
          <small>{apiInfo}</small>
        </div>
        <Routes>
          <Route path="/" element={<TaskListPage />} />
          <Route path="/new" element={<NewTaskPage />} />
          <Route path="/edit/:id" element={<EditTaskPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
