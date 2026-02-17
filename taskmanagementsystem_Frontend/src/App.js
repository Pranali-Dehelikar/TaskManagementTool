import React, { useState, useEffect } from "react";

import Navbar from "./Components/Navbar";
import TopNavbar from "./Components/TopNavbar";
import Report from "./Components/Report";
import UserList from "./Components/UserList";
import TaskForm from "./Components/TaskForm";
import NotificationGrid from "./Components/NotificationGrid";
import Settings from "./Components/Settings";
import AuthPage from "./Components/AuthPage";
import Dashboard from "./Components/Dashboard";
import TaskGrid from "./Components/TaskGrid";

import Profile from "./Components/SettingsPages/Profile";
import ChangePassword from "./Components/SettingsPages/ChangePassword";

import "./Styles/Global.css";
import "./App.css";

/* ✅ Protected pages (require login) */
const PROTECTED_COMPONENTS = [
  "Dashboard",
  "Reports",
  "UserList",
  "TaskForm",
  "TaskList",
  "Notification",
  "Settings",
  "Profile",
  "ChangePassword",
];

function App() {
  /* ===============================
     AUTH STATE
  =================================*/
  const [token, setToken] = useState(localStorage.getItem("token"));
  const isAuthenticated = !!token;

  /* ===============================
     ACTIVE PAGE STATE
  =================================*/
  const [activeComponent, setActiveComponent] = useState(
    localStorage.getItem("activeComponent") || "Auth"
  );

  /* ===============================
     THEME STATE
  =================================*/
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  /* ===============================
     APPLY THEME
  =================================*/
  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  /* ===============================
     SAVE ACTIVE PAGE
  =================================*/
  useEffect(() => {
    localStorage.setItem("activeComponent", activeComponent);
  }, [activeComponent]);

  /* ===============================
     PROTECT ROUTES
  =================================*/
  useEffect(() => {
    if (!isAuthenticated && PROTECTED_COMPONENTS.includes(activeComponent)) {
      setActiveComponent("Auth");
    }
  }, [activeComponent, isAuthenticated]);

  /* ===============================
     LOGIN / LOGOUT
  =================================*/
  const handleLoginSuccess = (jwtToken) => {
    setToken(jwtToken);
    localStorage.setItem("token", jwtToken);
    setActiveComponent("Dashboard");
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("activeComponent");
    setActiveComponent("Auth");
  };

  /* ===============================
     PAGE RENDER LOGIC
  =================================*/
  const renderComponent = () => {
    switch (activeComponent) {
      case "Auth":
        return <AuthPage onLoginSuccess={handleLoginSuccess} />;

      case "Dashboard":
        return <Dashboard token={token} darkMode={darkMode} />;

      case "Reports":
        return <Report darkMode={darkMode} />;

      case "UserList":
        return <UserList darkMode={darkMode} />;

      case "TaskForm":
        return <TaskForm darkMode={darkMode} token={token} />;

      case "TaskList":
        return <TaskGrid darkMode={darkMode} token={token} />;

      case "Notification":
        return <NotificationGrid userId={1} darkMode={darkMode} />;

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
        return (
          <Profile
            darkMode={darkMode}
            setActiveComponent={setActiveComponent}
          />
        );

      case "ChangePassword":
        return (
          <ChangePassword
            darkMode={darkMode}
            setActiveComponent={setActiveComponent}
          />
        );

      default:
        return <AuthPage onLoginSuccess={handleLoginSuccess} />;
    }
  };

  /* ===============================
     MAIN LAYOUT
  =================================*/
  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <Navbar
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
        darkMode={darkMode}
      />

      {/* Top Navbar (only when logged in) */}
      {isAuthenticated && (
        <TopNavbar
          setActiveComponent={setActiveComponent}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}

      {/* Main Content Area */}
      <div className="main-content">
        {renderComponent()}
      </div>
    </div>
  );
}

export default App;
