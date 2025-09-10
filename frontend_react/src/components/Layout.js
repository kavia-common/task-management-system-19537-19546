import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./layout.css";

// PUBLIC_INTERFACE
export function Navbar() {
  /** Top navigation bar with app title and links. */
  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
          ✅ To-Do Manager
        </Link>
        <div className="navbar__links">
          <NavLink to="/" end className="navbar__link">
            Tasks
          </NavLink>
          <NavLink to="/new" className="navbar__link">
            New Task
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

// PUBLIC_INTERFACE
export function Container({ children }) {
  /** Page container with max width and padding. */
  return <div className="container">{children}</div>;
}

// PUBLIC_INTERFACE
export function Section({ title, actions, children }) {
  /** A titled section with optional actions to the right. */
  return (
    <section className="section">
      <div className="section__header">
        <h2 className="section__title">{title}</h2>
        <div className="section__actions">{actions}</div>
      </div>
      <div className="section__body">{children}</div>
    </section>
  );
}
