import React, { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import "../Styles/AuthPage.css";

const AuthPage = ({ onLoginSuccess, activeComponent }) => {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    setIsLogin(true);
  }, [activeComponent]);

  const switchToLogin = () => setIsLogin(true);
  const switchToRegister = () => setIsLogin(false);

  return (
    <div className="auth-page">
      {isLogin ? (
        <Login onLoginSuccess={onLoginSuccess} switchToRegister={switchToRegister} />
      ) : (
        <Register onLoginSuccess={onLoginSuccess} switchToLogin={switchToLogin} />
      )}
    </div>
  );
};

export default AuthPage;
