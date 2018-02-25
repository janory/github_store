import React from "react";
import ReactDOM from "react-dom";
import routes from "./routes";
import "./index.css";
import configureStore from "./store/configureStore";
import { ConnectedRouter } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import { Provider } from "react-redux";

import App from "./App";

const app = document.getElementById("root");
const history = createHistory();

const store = configureStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App>{routes}</App>
    </ConnectedRouter>
  </Provider>,
  app
);
