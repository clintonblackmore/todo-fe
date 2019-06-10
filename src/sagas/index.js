import { call, put, takeLatest, takeEvery } from "redux-saga/effects";

const baseURL = "http://localhost:3000";
//const baseURL = "https://fast-depths-86514.herokuapp.com";

const Api = {
  fetchTodoList: () => fetch(`${baseURL}/todos`).then(res => res.json()),
  deleteTodoItem: id =>
    fetch(new Request(`${baseURL}/todos/${id}`, { method: "DELETE" })),
  createTodoItem: text => {
    const req = new Request(`${baseURL}/todos`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ text })
    });
    console.log(req);
    return fetch(req).then(res => res.json());
  }
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

export function* createTodoItem(action) {
  try {
    const data = yield call(Api.createTodoItem, action.text);
    console.log(data);
    yield put({ type: "CREATE_TODO_ITEM_SUCCEEDED", data });
  } catch (error) {
    yield put({ type: "CREATE_TODO_ITEM_FAILED", text: action.text });
  }
}

export default function* watchWebRequests() {
  yield takeLatest("FETCH_TODO_LIST_REQUESTED", fetchTodoList);
  yield takeLatest("DELETE_TODO_ITEM_REQUESTED", deleteTodoItem);
  yield takeEvery("CREATE_TODO_ITEM_REQUESTED", createTodoItem);
}
