import { call, put, takeLatest } from "redux-saga/effects";

const baseURL = "http://localhost:3000";

const Api = {
  fetchTodoList: () => fetch(`${baseURL}/todos`).then(res => res.json())
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

function* watchFetchTodoList() {
  yield takeLatest("FETCH_TODO_LIST_REQUESTED", fetchTodoList);
}

export default watchFetchTodoList;
