import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ userId: "", password: "" });
  const [errors, setErrors] = useState({ general: "" });
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ general: "" });
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://api.hotelqr.canaratechlabs.com/api/auth/login",
        {
          username: formData.userId,
          password: formData.password,
        }
      );

      // Assuming the API returns a JSON response
      const data = response.data;
      if (data?.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setErrors({ general: "Login failed. Please check your credentials." });
      }
    } catch (error) {
      // Error handling
      if (error.response) {
        setErrors({
          general:
            error.response?.data?.message || "An error occurred during login.",
        });
      } else {
        setErrors({ general: "An unknown error occurred." });
      }
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>
      {errors.general && <div className="login-error">{errors.general}</div>}
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>User ID</label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            placeholder="Enter your user ID"
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <div className="signup-link">
        <p>
          Don't have an account?{" "}
          <a href="/register" className="login-link">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
