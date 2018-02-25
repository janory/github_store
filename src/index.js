import React from "react";
import ReactDOM from "react-dom";
import routes from "./routes";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import App from "./App";

const app = document.getElementById("root");

ReactDOM.render(
  <MuiThemeProvider>
    <Router path="/">
      <App>{routes}</App>
    </Router>
  </MuiThemeProvider>,
  app
);
