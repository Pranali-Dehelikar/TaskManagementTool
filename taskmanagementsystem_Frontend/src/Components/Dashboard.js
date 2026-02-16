import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import TaskStatusChart from "./TaskStatusChart";
import TaskCalendar from "./TaskCalendar";
import { getAllTasks } from "../Api/taskApi";

import { FaTachometerAlt } from "react-icons/fa";


import "../Styles/Dashboard.css";

const Dashboard = ({ token, darkMode }) => {
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [taskError, setTaskError] = useState("");

  const fetchTasks = async () => {
    if (!token) return;

    try {
      setLoadingTasks(true);
      const res = await getAllTasks(token);
      setTasks(res.data || []);
      setTaskError("");
    } catch (error) {
      setTaskError("Failed to load tasks");
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className={`dashboard-container ${darkMode ? "dark" : ""}`}>
     <h1 className="dashboard-title">
  <FaTachometerAlt className="dashboard-icon" />
  Dashboard
</h1>




      <div className="dashboard-grid">

        <div className="dashboard-calendar">
          <TaskCalendar
            setTasks={setTasks}
            token={token}
            darkMode={darkMode}
          />
        </div>

        <div className="dashboard-chart">
          <TaskStatusChart tasks={tasks} darkMode={darkMode} />
        </div>

        <div className="dashboard-tasklist">
          <TaskList
            tasks={tasks}
            loading={loadingTasks}
            error={taskError}
            darkMode={darkMode}
          />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
