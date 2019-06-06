import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import sagaFetcher from "./sagas/sagaFetcher";

//import { syncHistoryWithStore } from "react-router-redux";
//import { browserHistory } from "react-router";

// import the root reducer
import todoReducer from "./reducers/todo";

const rootReducer = combineReducers(
  sagaFetcher.wrapRootReducer({ todos: todoReducer })
);

// create an object for the default data
const defaultState = {
  todos: []
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  defaultState,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(sagaFetcher.createRootSaga());

//export const history = syncHistoryWithStore(browserHistory, store);

export default store;
