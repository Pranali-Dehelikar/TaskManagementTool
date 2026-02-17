import React, { useEffect, useState } from "react";
import { getAllTasks, checkTaskScore } from "../Api/taskApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks } from "@fortawesome/free-solid-svg-icons"; // same as navbar "Tasks" icon
import "../Styles/TaskGrid.css";


const TaskGrid = ({ token, darkMode }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await getAllTasks();
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCheck = async (id) => {
    try {
      await checkTaskScore(id, token);
      fetchTasks();
    } catch (error) {
      console.error("Error checking score:", error);
    }
  };

  return (
    <div className={`grid ${darkMode ? "dark" : ""}`}>
      <h1>
        <FontAwesomeIcon icon={faTasks} className="task-icon" /> List Of Tasks
      </h1>

      <div className="grid-container">
        {tasks.map((task) => (
          <div key={task.id} className="card">
            <a href={task.googleFormUrl} target="_blank" rel="noopener noreferrer">
              <img
                src={task.imageUrl}
                alt={`Task: ${task.title}`}
                className="task-image"
              />
            </a>
            <h4>{task.title}</h4>
            <p>Status: <strong>{task.status}</strong></p>
            <p>Score: <strong>{task.score ?? "-"}</strong></p>
            <button className="check-btn" onClick={() => handleCheck(task.id)}>
              Check Result
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskGrid;
