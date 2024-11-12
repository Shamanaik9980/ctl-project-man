import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login"; // Adjust the path according to your project structure
import Dashboard from "./components/Dashboard";
const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Define your routes here */}
        <Routes>
          <Route path="/" element={<Login />} /> {/* Login Page */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* Login Page */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
