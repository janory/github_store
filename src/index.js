import React from "react";
import ReactDOM from "react-dom";
import routes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

const app = document.getElementById("root");

ReactDOM.render(
  <Router path="/" component={App}>
    {routes}
  </Router>,
  app
);
