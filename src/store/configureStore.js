import logger from "redux-logger";
import thunk from "redux-thunk";
import { applyMiddleware, createStore, combineReducers } from "redux";
import { routerMiddleware, routerReducer } from "react-router-redux";
import reducers from "../reducers";

export default function configureStore(history) {
  return createStore(
    combineReducers({
      ...reducers,
      router: routerReducer
    }),
    applyMiddleware(routerMiddleware(history), thunk)
  );
}
