import React, { useState, useEffect, useCallback } from "react";

import Navbar from "./Components/Navbar";
import TopNavbar from "./Components/TopNavbar";
import Report from "./Components/Report";
import UserList from "./Components/UserList";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import NotificationGrid from "./Components/NotificationGrid"; // updated import
import Settings from "./Components/Settings";
import TaskStatusChart from "./Components/TaskStatusChart";
import AuthPage from "./Components/AuthPage";

import Profile from "./Components/SettingsPages/Profile";
import ChangePassword from "./Components/SettingsPages/ChangePassword";

import { getAllTasks, searchTasks } from "./Api/taskApi";

import "./Styles/Global.css";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [activeComponent, setActiveComponent] = useState(
    localStorage.getItem("activeComponent") || "Auth"
  );

  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [taskError, setTaskError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const isAuthenticated = !!token;

  /* ================= DARK MODE ================= */
  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  /* ================= SAVE ACTIVE PAGE ================= */
  useEffect(() => {
    localStorage.setItem("activeComponent", activeComponent);
  }, [activeComponent]);

  /* ================= FETCH TASKS ================= */
  const fetchTasks = useCallback(
    async (keyword = "") => {
      if (!token) return;

      try {
        setLoadingTasks(true);
        const res =
          keyword.trim() === ""
            ? await getAllTasks(token)
            : await searchTasks(keyword, token);

        setTasks(Array.isArray(res.data) ? res.data : []);
        setTaskError("");
      } catch (error) {
        setTaskError("Failed to load tasks");
      } finally {
        setLoadingTasks(false);
      }
    },
    [token]
  );

  useEffect(() => {
    if (isAuthenticated && activeComponent === "Dashboard") {
      fetchTasks(searchTerm);
    }
  }, [activeComponent, searchTerm, fetchTasks, isAuthenticated]);

  /* ================= LOGIN ================= */
  const handleLoginSuccess = (jwtToken) => {
    setToken(jwtToken);
    localStorage.setItem("token", jwtToken);
    setActiveComponent("Dashboard");
  };

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setActiveComponent("Auth");
  };

  /* ================= PROTECTED ROUTES ================= */
  const protectedComponents = [
    "Dashboard",
    "Reports",
    "UserList",
    "TaskForm",
    "Notification",
    "Settings",
    "Profile",
    "ChangePassword",
  ];

  useEffect(() => {
    if (!isAuthenticated && protectedComponents.includes(activeComponent)) {
      setActiveComponent("Auth");
    }
  }, [activeComponent, isAuthenticated]);

  /* ================= RENDER ================= */
  const renderComponent = () => {
    switch (activeComponent) {
      case "Auth":
        return <AuthPage onLoginSuccess={handleLoginSuccess} />;

      case "Dashboard":
        return (
          <div className="dashboard-layout">
            <div className="dashboard-left">
              <TaskList
                tasks={tasks}
                loading={loadingTasks}
                error={taskError}
                darkMode={darkMode}
              />
            </div>
            <div className="dashboard-right">
              <TaskStatusChart tasks={tasks} darkMode={darkMode} />
            </div>
          </div>
        );

      case "Reports":
        return <Report tasks={tasks} darkMode={darkMode} />;

      case "UserList":
        return <UserList darkMode={darkMode} />;

      case "TaskForm":
        return <TaskForm onTaskAdded={() => fetchTasks(searchTerm)} darkMode={darkMode} />;

     case "Notification":
  return <NotificationGrid userId={1} darkMode={darkMode} />; // pass logged-in userId dynamically

      case "Settings":
        return (
          <Settings
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onLogout={handleLogout}
            setActiveComponent={setActiveComponent}
          />
        );

      case "Profile":
        return <Profile setActiveComponent={setActiveComponent} darkMode={darkMode} />;

      case "ChangePassword":
        return <ChangePassword setActiveComponent={setActiveComponent} darkMode={darkMode} />;

      default:
        return <AuthPage onLoginSuccess={handleLoginSuccess} />;
    }
  };

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <Navbar
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
        darkMode={darkMode}
      />

      {isAuthenticated && (
        <TopNavbar
          setActiveComponent={setActiveComponent}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}

      <div className="main-content">{renderComponent()}</div>
    </div>
  );
}

export default App;
