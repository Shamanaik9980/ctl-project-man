import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login"; // Adjust the path according to your project structure
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redirect from the root URL to /login */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
