import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBell,
  faPalette,
  faTasks,
  faShieldAlt,
  faPlug,
  faCogs,
  faInfoCircle,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

import "../Styles/Settings.css";

const SettingsMenu = ({
  darkMode,
  setDarkMode,
  onLogout,
  setActiveComponent
}) => {

  const settingsCards = [
    { title: "Account", icon: faUser },
    { title: "Notifications", icon: faBell },
    { title: "Appearance", icon: faPalette },
    { title: "Task Preferences", icon: faTasks },
    { title: "Privacy & Security", icon: faShieldAlt },
    { title: "Integrations", icon: faPlug },
    { title: "System", icon: faCogs },
    { title: "Help & About", icon: faInfoCircle }
  ];

  const handleCardClick = (title) => {
    switch (title) {
      case "Account":
        setActiveComponent("Profile");
        break;

      case "Appearance":
        setDarkMode(!darkMode);
        break;

      case "Privacy & Security":
        setActiveComponent("DataExport");
        break;

      default:
        console.log(title + " clicked");
    }
  };

  return (
  <div className="settings-window">
    <h2>
      <FontAwesomeIcon icon={faCogs} /> Settings
    </h2>

    <div className="settings-grid">
      {settingsCards.map((card, index) => (
        <div
          key={index}
          className="settings-card"
          onClick={() => handleCardClick(card.title)}
        >
          <FontAwesomeIcon icon={card.icon} />
          <span>{card.title}</span>
        </div>
      ))}
    </div>

    {/* Logout Button at Bottom Center */}
    <div className="logout-container">
      <button className="logout-button" onClick={onLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
      </button>
    </div>
  </div>
);

};

export default SettingsMenu;
