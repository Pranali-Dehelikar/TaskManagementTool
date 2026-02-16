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

import Profile from "./Components/SettingsPages/Profile";
import ChangePassword from "./Components/SettingsPages/ChangePassword";

import "./Styles/Global.css";
import "./App.css";

function App() {
  /* ================= AUTH STATE ================= */
  const [token, setToken] = useState(localStorage.getItem("token"));
  const isAuthenticated = !!token;

  /* ================= PAGE STATE ================= */
  const [activeComponent, setActiveComponent] = useState(
    localStorage.getItem("activeComponent") || "Auth"
  );

  /* ================= THEME ================= */
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  /* ================= SAVE THEME ================= */
  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  /* ================= SAVE ACTIVE PAGE ================= */
  useEffect(() => {
    localStorage.setItem("activeComponent", activeComponent);
  }, [activeComponent]);

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

  /* ================= RENDER COMPONENT ================= */
  const renderComponent = () => {
    switch (activeComponent) {
      case "Auth":
        return <AuthPage onLoginSuccess={handleLoginSuccess} />;

      case "Dashboard":
        return (
          <Dashboard
            token={token}
            darkMode={darkMode}
          />
        );

      case "Reports":
        return <Report darkMode={darkMode} />;

      case "UserList":
        return <UserList darkMode={darkMode} />;

      case "TaskForm":
        return <TaskForm darkMode={darkMode} />;

      case "Notification":
        return (
          <NotificationGrid
            userId={1}  // Replace with dynamic logged-in user ID later
            darkMode={darkMode}
          />
        );

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
            setActiveComponent={setActiveComponent}
            darkMode={darkMode}
          />
        );

      case "ChangePassword":
        return (
          <ChangePassword
            setActiveComponent={setActiveComponent}
            darkMode={darkMode}
          />
        );

      default:
        return <AuthPage onLoginSuccess={handleLoginSuccess} />;
    }
  };

  /* ================= MAIN RETURN ================= */
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
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}

      <div className="main-content">
        {renderComponent()}
      </div>

    </div>
  );
}

export default App;
