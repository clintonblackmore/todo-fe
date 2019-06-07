import { call, put, takeLatest } from "redux-saga/effects";

const baseURL = "http://localhost:3000/";

const Api = {
  fetchTodoList: () => fetch(`${baseURL}/todos`).then(res => res.JSON())
};

export function* fetchData(action) {
  try {
    const data = yield call(Api.fetchTodoList, action.payload.url);
    yield put({ type: "FETCH_TODO_LIST_SUCCEEDED", data });
  } catch (error) {
    yield put({ type: "FETCH_TODO_LIST_FAILED", error });
  }
}

function* watchFetchData() {
  yield takeLatest("FETCH_TODO_LIST_REQUESTED", fetchData);
}

export default watchFetchData;
