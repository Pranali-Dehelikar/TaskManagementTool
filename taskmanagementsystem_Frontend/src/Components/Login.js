import React, { useState } from "react";
import { loginUser } from "../Api/authApi";
import "../Styles/AuthPage.css";

// FontAwesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Login = ({ onLoginSuccess, switchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await loginUser(email, password);
      const token = res.data.token;

      // Save JWT and notify parent
      localStorage.setItem("token", token);
      onLoginSuccess(token);

      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  // Google login
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/api/auth/google";
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>

      {/* Google login button */}
      <div className="google-login" onClick={handleGoogleLogin}>
        <FontAwesomeIcon icon={faGoogle} className="google-icon" />
        <span style={{ marginLeft: "6px" }}>Continue with Google</span>
      </div>

      <p>
        Don't have an account?{" "}
        <span className="link" onClick={switchToRegister}>
          Register
        </span>
      </p>
    </div>
  );
};

export default Login;
