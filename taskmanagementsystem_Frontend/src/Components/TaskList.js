import React from "react";
import "../Styles/TaskList.css";

function TaskList({ tasks, loading, error }) {
  if (loading) {
    return <p className="task-message">Loading tasks...</p>;
  }

  if (error) {
    return <p className="task-message error">{error}</p>;
  }

  return (
    <div className="task-list-container">
      <h2>Tasks List</h2>

      {tasks.length === 0 ? (
        <p className="task-message">No tasks found</p>
      ) : (
        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
<tbody>
  {tasks.map((task) => {
    // Treat missing status or "PENDING" as TODO
    const displayStatus =
      !task.status || task.status === "PENDING" ? "TODO" : task.status;

    return (
      <tr key={task.id}>
        <td className="task-title">{task.title}</td>
        <td>{task.description}</td>
        <td>
          <span className={`status ${displayStatus}`}>
            {displayStatus}
          </span>
        </td>
      </tr>
    );
  })}
</tbody>

        </table>
      )}
    </div>
  );
}

export default TaskList;
