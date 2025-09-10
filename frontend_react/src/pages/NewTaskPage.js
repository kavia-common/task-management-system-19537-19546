import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Section } from "../components/Layout";
import TaskForm from "../components/TaskForm";
import { createTask } from "../services/api";

// PUBLIC_INTERFACE
export default function NewTaskPage() {
  /** Page for creating a new task. */
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(payload) {
    setSubmitting(true);
    try {
      await createTask({ ...payload, completed: false });
      navigate("/");
    } catch (e) {
      alert(e.message || "Failed to create task");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Container>
      <Section title="Create Task">
        <TaskForm onSubmit={handleSubmit} submitting={submitting} />
      </Section>
    </Container>
  );
}
