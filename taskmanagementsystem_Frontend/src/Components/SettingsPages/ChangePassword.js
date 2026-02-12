import React, { useState } from "react";
import axios from "axios";
import "../../Styles/ChangePassword.css";

const ChangePassword = ({ setActiveComponent }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = async () => {
    setMessage("");
    setError("");

    if (!oldPassword || !newPassword) {
      setError("Both fields are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User not authenticated");
        return;
      }

      const res = await axios.post(
        "http://localhost:8080/api/auth/change-password",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Backend returns plain string
      setMessage(res.data);

      setOldPassword("");
      setNewPassword("");

    } catch (err) {
      setError(
        err.response?.data || "Password change failed"
      );
    }
  };

  return (
    <div className="change-password-container">
      <div className="change-password-card">
        <h2 className="change-password-title">Change Password</h2>

        <div className="form-group">
          <label>Old Password</label>
          <input
            type="password"
            placeholder="Enter old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <button
          className="update-password-button"
          onClick={handleChangePassword}
        >
          Update Password
        </button>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <button
          className="back-button"
          onClick={() => setActiveComponent("Settings")}
        >
          ← Back to Settings
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
