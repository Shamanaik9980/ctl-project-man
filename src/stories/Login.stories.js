import React from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import Login from "../components/Login"; // Adjust the path accordingly

export default {
  title: "Login",
  component: Login,
};

const Template = (args) => (
  <Router>
    {" "}
    {/* Wrap the Login component with Router */}
    <Login {...args} />
  </Router>
);

export const Default = Template.bind({});
Default.args = {
  // Any props you want to pass to the Login component
};
