import { useState } from "react";
import { createTask } from "../Api/taskApi";
import "../Styles/TaskForm.css";

function TaskForm({ onTaskAdded }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "TODO",
    dueDate: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task.title || !task.description || !task.dueDate) {
      setError("All fields are required");
      return;
    }

    try {
      setError("");

      await createTask(task);

      setTask({
        title: "",
        description: "",
        status: "TODO",
        dueDate: "",
      });

      if (onTaskAdded) {
        onTaskAdded();
      }

    } catch (err) {
      console.error("Create Task Error:", err.response?.data);
      setError("Failed to create task");
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
          onChange={(e) =>
            setTask({ ...task, title: e.target.value })
          }
        />

        <input
          className="form-input"
          placeholder="Description"
          value={task.description}
          onChange={(e) =>
            setTask({ ...task, description: e.target.value })
          }
        />

        <select
          className="form-select"
          value={task.status}
          onChange={(e) =>
            setTask({ ...task, status: e.target.value })
          }
        >
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>

        <input
          className="form-input"
          type="date"
          value={task.dueDate}
          onChange={(e) =>
            setTask({ ...task, dueDate: e.target.value })
          }
        />

        <button type="submit" className="form-button">
          Add Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
