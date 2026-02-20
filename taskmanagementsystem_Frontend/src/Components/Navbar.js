import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTasks,
  faTachometerAlt,
  faBell,
  faCog,
  faSignInAlt,
  faChartBar,
  faList
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

const Navbar = ({ activeComponent, setActiveComponent, darkMode }) => {

  const menuItems = [
    { name: "TaskList", label: "List of Tasks", icon: faList }, // ✅ This now works
    { name: "Reports", label: "Reports", icon: faChartBar },
    { name: "Dashboard", label: "Dashboard", icon: faTachometerAlt },
    { name: "Notification", label: "Notification", icon: faBell },
  ];

  const bottomItems = [
    { name: "Settings", label: "Settings", icon: faCog },
    { name: "Auth", label: "Login / Register", icon: faSignInAlt },
  ];

  return (
    <div className={`sidebar ${darkMode ? "dark" : "light"}`}>
      <div className="sidebar-top">
        <div className="sidebar-title">
          <img
            src="https://is3-ssl.mzstatic.com/image/thumb/Purple126/v4/19/ed/c5/19edc5d4-dffe-7790-1c31-373c4da9eac0/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg"
            alt="TaskManager"
            className="sidebar-logo"
          />
          <span>TaskManager</span>
        </div>

        <ul className="nav-items">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={activeComponent === item.name ? "active" : ""}
              onClick={() => setActiveComponent(item.name)}
            >
              <FontAwesomeIcon icon={item.icon} />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-bottom">
        <ul className="nav-items">
          {bottomItems.map((item) => (
            <li
              key={item.name}
              className={activeComponent === item.name ? "active" : ""}
              onClick={() => setActiveComponent(item.name)}
            >
              <FontAwesomeIcon icon={item.icon} />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
