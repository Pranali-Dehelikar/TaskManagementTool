import React, { useEffect, useState } from "react";
import { NOTIFICATION_TYPES, NOTIFICATION_CHANNELS } from "../Constants/notifications";
import { getUserNotifications, saveUserNotifications } from "../Api/notificationApi";
import "../Styles/NotificationGrid.css"; // Make sure this exists

const NotificationGrid = ({ userId, darkMode }) => {
  const initialSettings = NOTIFICATION_TYPES.reduce((acc, type) => {
    acc[type] = NOTIFICATION_CHANNELS.reduce((chAcc, channel) => {
      chAcc[channel] = false;
      return chAcc;
    }, {});
    return acc;
  }, {});

  const [settings, setSettings] = useState(initialSettings);

  useEffect(() => {
    getUserNotifications(userId)
      .then(({ data }) => {
        const formatted = { ...initialSettings };
        data.forEach(n => {
          if (formatted[n.notificationType]) {
            formatted[n.notificationType] = {
              "Email": n.emailEnabled,
              "Push Notification": n.pushEnabled,
              "In-App Alert": n.inAppEnabled
            };
          }
        });
        setSettings(formatted);
      })
      .catch(err => console.error("Failed to load notifications:", err));
  }, [userId]);

  const handleToggle = (type, channel) => {
    setSettings(prev => ({
      ...prev,
      [type]: { ...prev[type], [channel]: !prev[type][channel] }
    }));
  };

  const handleSave = () => {
    const payload = NOTIFICATION_TYPES.map(type => ({
      notificationType: type,
      emailEnabled: settings[type]["Email"],
      pushEnabled: settings[type]["Push Notification"],
      inAppEnabled: settings[type]["In-App Alert"]
    }));
    saveUserNotifications(userId, payload)
      .then(() => alert("Settings saved successfully"))
      .catch(err => console.error("Failed to save notifications:", err));
  };

  return (
    <div className={`notification-grid-container ${darkMode ? "dark" : ""}`}>
      <table className="notification-grid-table">
        <thead>
          <tr>
            <th>Notification Type</th>
            {NOTIFICATION_CHANNELS.map(channel => <th key={channel}>{channel}</th>)}
          </tr>
        </thead>
        <tbody>
          {NOTIFICATION_TYPES.map(type => (
            <tr key={type}>
              <td>{type}</td>
              {NOTIFICATION_CHANNELS.map(channel => (
                <td key={channel}>
                  <input
                    type="checkbox"
                    className="notification-grid-checkbox"
                    checked={settings[type][channel]}
                    onChange={() => handleToggle(type, channel)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="notification-grid-save-btn" onClick={handleSave}>
        Save Settings
      </button>
    </div>
  );
};

export default NotificationGrid;
