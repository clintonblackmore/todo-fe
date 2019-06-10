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
    return fetch(req).then(res => res.json());
  },
  updateTodoItem: (id, text, completed) => {
    const req = new Request(`${baseURL}/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify(text, completed)
    });
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
    //console.log(data);
    yield put({ type: "CREATE_TODO_ITEM_SUCCEEDED", data });
  } catch (error) {
    yield put({ type: "CREATE_TODO_ITEM_FAILED", text: action.text });
  }
}

export function* updateTodoItem(action) {
  try {
    const { id, text, completed } = action;
    const data = yield call(Api.updateTodoItem, id, text, completed);
    console.log({ updating: { action, data } });
    //console.log(action);
    //c//onsole.log(data);
    yield put({ ...action, type: "UPDATE_TODO_ITEM_SUCCEEDED" });
  } catch (error) {
    yield put({ ...action, type: "UPDATE_TODO_ITEM_FAILED" });
  }
}

export default function* watchWebRequests() {
  yield takeLatest("FETCH_TODO_LIST_REQUESTED", fetchTodoList);
  yield takeEvery("DELETE_TODO_ITEM_REQUESTED", deleteTodoItem);
  yield takeEvery("CREATE_TODO_ITEM_REQUESTED", createTodoItem);
  yield takeEvery("UPDATE_TODO_ITEM_REQUESTED", updateTodoItem);
}
