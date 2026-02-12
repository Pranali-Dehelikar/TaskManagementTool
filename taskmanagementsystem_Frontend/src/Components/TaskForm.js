import { useState } from "react";
import { createTask } from "../Api/taskApi";
import "../Styles/TaskForm.css";

function TaskForm({ onTaskAdded }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "TODO", // default enum
    dueDate: "",       // must match backend LocalDate format
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ----- SIMPLE VALIDATION -----
    if (!task.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!task.description.trim()) {
      setError("Description is required");
      return;
    }
    if (!task.status) {
      setError("Status is required");
      return;
    }
    if (!task.dueDate) {
      setError("Due date is required");
      return;
    }

    try {
      setError(""); // clear previous errors

      // Send payload exactly as backend expects
      await createTask({
        title: task.title.trim(),
        description: task.description.trim(),
        status: task.status,         // must match enum exactly
        dueDate: task.dueDate,       // format YYYY-MM-DD
      });

      // Reset form
      setTask({ title: "", description: "", status: "PENDING", dueDate: "" });

      // Notify parent
      onTaskAdded();
    } catch (err) {
      console.error("Task creation failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to create task");
    }
  };

  return (
    <div className="form-container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Create Task</h2>

        {error && <div className="form-error">{error}</div>}

        <input
          className="form-input"
          placeholder="Title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          required
        />

        <input
          className="form-input"
          placeholder="Description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          required
        />

      <select
            className="form-select"
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
            required
      >
        <option value="TODO">To Do</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
</select>


        <input
          className="form-input"
          type="date"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          required
        />

        <button type="submit" className="form-button">
          Add Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;