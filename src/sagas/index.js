import { call, put, takeLatest, takeEvery } from "redux-saga/effects";

import {
  DELETE_TODO_ITEM_REQUESTED,
  FETCH_TODO_LIST_REQUESTED,
  CREATE_TODO_ITEM_REQUESTED,
  UPDATE_TODO_ITEM_REQUESTED
} from "../constants";

import * as actions from "../actions/actionCreators";

const baseURL = "http://localhost:3000";
//const baseURL = "https://fast-depths-86514.herokuapp.com";

const Api = {
  fetchTodoList: () => fetch(`${baseURL}/todos`).then(res => res.json()),
  deleteTodoItem: id =>
    fetch(new Request(`${baseURL}/todos/${id}`, { method: "DELETE" })),
  createTodoItem: text => {
    console.log(text);
    const req = new Request(`${baseURL}/todos`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ text })
    });
    return fetch(req).then(res => res.json());
  },
  updateTodoItem: ({ id, text, completed }) => {
    const req = new Request(`${baseURL}/todos/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "PATCH",
      body: JSON.stringify({ text, completed })
    });
    return fetch(req).then(res => res.json());
  }
};

export function* fetchTodoList(action) {
  try {
    //const data = yield call(Api.fetchTodoList, action.payload.url);
    const data = yield call(Api.fetchTodoList);
    yield put(actions.fetchTodoListSucceeded(data));
  } catch (error) {
    yield put(actions.fetchTodoListFailed(error));
  }
}

export function* createTodoItem(action) {
  try {
    console.log(action);
    const data = yield call(Api.createTodoItem, action.payload.text);
    console.log(data);
    yield put(actions.createTodoItemSucceeded(data));
  } catch (error) {
    yield put(actions.createTodoItemFailed({ error, text: action.text }));
  }
}

export function* updateTodoItem(action) {
  try {
    console.log("%c updateTodoItem %o", "color: blue", action.payload);
    const data = yield call(Api.updateTodoItem, action.payload);
    console.log("%c returned %o", "color: blue", data);
    yield put(actions.updateTodoItemSucceeded(data));
  } catch (error) {
    yield put(actions.updateTodoItemFailed(action.payload));
  }
}

export function* deleteTodoItem(action) {
  try {
    yield call(Api.deleteTodoItem, action.payload.itemId);
    console.log("The action is %o", action);
    yield put(actions.deleteTodoItemSucceeded(action.payload.itemId));
  } catch (error) {
    yield put(actions.deleteTodoItemFailed(action.payload.itemId));
  }
}

export default function* watchWebRequests() {
  yield takeLatest(FETCH_TODO_LIST_REQUESTED, fetchTodoList);
  yield takeEvery(DELETE_TODO_ITEM_REQUESTED, deleteTodoItem);
  yield takeEvery(CREATE_TODO_ITEM_REQUESTED, createTodoItem);
  yield takeEvery(UPDATE_TODO_ITEM_REQUESTED, updateTodoItem);
}
