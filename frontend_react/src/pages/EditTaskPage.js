import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Section } from "../components/Layout";
import TaskForm from "../components/TaskForm";
import { fetchTasks, updateTask } from "../services/api";

// PUBLIC_INTERFACE
export default function EditTaskPage() {
  /** Page for editing an existing task by id. */
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchTasks();
        const found = (data || []).find((t) => String(t.id) === String(id));
        if (mounted) setTask(found || null);
      } catch (e) {
        // If backend had a single-get route, we'd call it.
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  async function handleSubmit(payload) {
    setSubmitting(true);
    try {
      await updateTask(id, payload);
      navigate("/");
    } catch (e) {
      alert(e.message || "Failed to update task");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Container>
      <Section title="Edit Task">
        {loading ? (
          <div className="card">
            <div />
            <div>Loading...</div>
            <div />
          </div>
        ) : task ? (
          <TaskForm initial={task} onSubmit={handleSubmit} submitting={submitting} />
        ) : (
          <div className="card" role="alert" style={{ borderColor: "#d97706" }}>
            <div />
            <div>Task not found.</div>
            <div />
          </div>
        )}
      </Section>
    </Container>
  );
}
