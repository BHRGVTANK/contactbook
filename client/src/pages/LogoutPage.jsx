import React from "react";
import "./LogoutPage.css";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = async () => {
    try {
      const userEmail = localStorage.getItem("email");
      if (userEmail) {
        await axios.post("/api/auth/logout", { email: userEmail });
        localStorage.removeItem("email");
      }
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="logout-container">
      <div className="logout-card">
        <h2>You have been logged out</h2>
        <p>Thank you for visiting. Come back soon!</p>
        <button className="login-btn" onClick={handleLoginRedirect}>
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default LogoutPage;
