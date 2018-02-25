import React from "react";
import ReactDOM from "react-dom";
import routes from "./routes";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

const app = document.getElementById("root");

ReactDOM.render(
    <Router path="/">
      <App>{routes}</App>
    </Router>,
  app
);
