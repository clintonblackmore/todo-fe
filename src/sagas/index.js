import { call, put, takeLatest } from "redux-saga/effects";

const baseURL = "http://localhost:3000";

const Api = {
  fetchTodoList: () => fetch(`${baseURL}/todos`).then(res => res.json()),
  deleteTodoItem: id =>
    fetch(new Request(`${baseURL}/todos/${id}`, { method: "DELETE" }))
};

export function* fetchTodoList(action) {
  try {
    //const data = yield call(Api.fetchTodoList, action.payload.url);
    const data = yield call(Api.fetchTodoList);
    yield put({ type: "FETCH_TODO_LIST_SUCCEEDED", data });
  } catch (error) {
    yield put({ type: "FETCH_TODO_LIST_FAILED", error });
  }
}

export function* deleteTodoItem(action) {
  try {
    yield call(Api.deleteTodoItem, action.itemId);
    yield put({ type: "DELETE_TODO_ITEM_SUCCEEDED", itemId: action.itemId });
  } catch (error) {
    yield put({ type: "DELETE_TODO_ITEM_FAILED", itemId: action.itemId });
  }
}

export default function* watchWebRequests() {
  yield takeLatest("FETCH_TODO_LIST_REQUESTED", fetchTodoList);
  yield takeLatest("DELETE_TODO_ITEM_REQUESTED", deleteTodoItem);
}
