import React, { useState } from "react";
import { registerUser, loginUser } from "../Api/authApi";

import "../Styles/AuthPage.css";

const Register = ({ switchToLogin, onLoginSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await registerUser(name, email, password, smsEnabled);
      // Auto-login after successful registration
      onLoginSuccess((await loginUser(email, password)).data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={smsEnabled}
            onChange={(e) => setSmsEnabled(e.target.checked)}
          />
          Enable SMS notifications
        </label>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{" "}
        <span className="link" onClick={switchToLogin}>
          Login
        </span>
      </p>
    </div>
  );
};

export default Register;
