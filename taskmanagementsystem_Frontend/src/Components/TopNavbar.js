import React from "react";
import "../Styles/TopNavbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function TopNavbar({ setActiveComponent, searchTerm, setSearchTerm, darkMode, setDarkMode }) {
  return (
    <div className={`top-navbar ${darkMode ? "dark" : ""}`}>
      {/* Left side */}
      <div className="top-navbar-left">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm ?? ""}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
      </div>

      {/* Right side */}
      <div className="top-navbar-right">
        <button className="nav-btn primary" onClick={() => setActiveComponent("UserList")}>
          Users List
        </button>

        <button className="nav-btn" onClick={() => setActiveComponent("Dashboard")}>
          Tasks List
        </button>

        {/* Toggle Switch */}
        <div className="toggle-switch">
          <input
            type="checkbox"
            id="darkModeToggle"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <label htmlFor="darkModeToggle">
            <span className="toggle-switch-circle">{darkMode ? "ON" : "OFF"}</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default TopNavbar;
