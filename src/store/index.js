import logger from "redux-logger";
import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";

import reducer from "../reducers";

export default createStore(reducer, applyMiddleware(logger, thunk));
