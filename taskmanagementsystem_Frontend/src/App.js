import React, { useState, useEffect } from "react";

import Navbar from "./Components/Navbar";
import TopNavbar from "./Components/TopNavbar";
import Report from "./Components/Report";
import UserList from "./Components/UserList";
import Settings from "./Components/Settings";
import AuthPage from "./Components/AuthPage";
import Dashboard from "./Components/Dashboard";
import TaskGrid from "./Components/TaskGrid";

import Profile from "./Components/SettingsPages/Profile";
import ChangePassword from "./Components/SettingsPages/ChangePassword";

import PreferencesPage from "./pages/PreferencesPage";

import "./Styles/Global.css";
import "./App.css";

/* ✅ DO NOT ADD PREFERENCES HERE */
const PROTECTED_COMPONENTS = [
  "Dashboard",
  "Reports",
  "UserList",
  "TaskForm",
  "TaskList",
  "Settings",
  "Profile",
  "ChangePassword"
];

function App() {

  const [token, setToken] = useState(localStorage.getItem("token"));
  const isAuthenticated = !!token;

  const [activeComponent, setActiveComponent] = useState(
    localStorage.getItem("activeComponent") || "Auth"
  );

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("activeComponent", activeComponent);
  }, [activeComponent]);

  /* 🚨 THIS WILL NO LONGER REDIRECT WHEN CLICKING PREFERENCES */
  useEffect(() => {
    if (!isAuthenticated && PROTECTED_COMPONENTS.includes(activeComponent)) {
      setActiveComponent("Auth");
    }
  }, [activeComponent, isAuthenticated]);

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

      case "TaskList":
        return <TaskGrid darkMode={darkMode} token={token} />;

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

      /* ✅ PREFERENCES WILL OPEN DIRECTLY NOW */
      case "Preferences":
        return (
          <PreferencesPage
            userId={1}
            darkMode={darkMode}
          />
        );

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
