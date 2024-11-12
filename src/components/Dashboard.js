import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      // If no user info in localStorage, redirect to login page
      navigate("/login");
    } else {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user"); // Clear invalid data
        navigate("/login"); // Redirect to login page
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-header">Welcome to your Dashboard</h2>
      {user ? (
        <div className="user-info">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          {/* Add more user details here if needed */}
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
