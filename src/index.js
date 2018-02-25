import React from "react";
import ReactDOM from "react-dom";
import routes from "./routes";
import "./index.css";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

const app = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <Router path="/">
      <App>{routes}</App>
    </Router>
  </Provider>,
  app
);
