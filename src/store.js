import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import rootSaga from "./sagas";

//import { syncHistoryWithStore } from "react-router-redux";
//import { browserHistory } from "react-router";

// import the root reducer
import todoReducer from "./reducers/todo";
const rootReducer = todoReducer;

// create an object for the default data
const defaultState = {
  todos: []
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  defaultState,
  composeWithDevTools(applyMiddleware(sagaMiddleware), applyMiddleware(logger))
);

sagaMiddleware.run(rootSaga);

//export const history = syncHistoryWithStore(browserHistory, store);

export default store;
