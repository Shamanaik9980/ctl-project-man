import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userId: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({ general: "" });
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ general: "" });
  };

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrors({ general: "Passwords do not match." });
      return;
    }

    try {
      const response = await axios.post(
        "https://api.hotelqr.canaratechlabs.com/api/auth/register",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          username: formData.userId,
          password: formData.password,
        }
      );

      // Assuming successful registration
      if (response.data?.success) {
        navigate("/login");
      } else {
        setErrors({ general: response.data.message || "Registration failed." });
      }
    } catch (error) {
      if (error.response) {
        setErrors({
          general:
            error.response?.data?.message ||
            "An error occurred during registration.",
        });
      } else {
        setErrors({ general: "An unknown error occurred." });
      }
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-header">Register</h2>
      {errors.general && <div className="register-error">{errors.general}</div>}
      <form onSubmit={handleRegister}>
        <div className="input-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />
        </div>
        <div className="input-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="input-group">
          <label>User ID</label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            placeholder="Enter a user ID"
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
            placeholder="Enter a password"
            required
          />
        </div>
        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
      <div className="login-link">
        <p>
          Already have an account?{" "}
          <a href="/login" className="register-link">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
