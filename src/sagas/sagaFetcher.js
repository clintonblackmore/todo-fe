import { createSagaFetcher } from "ory-redux-saga-fetch";

const baseURL = "http://localhost:3000/";

const getTodosFromAPI = () => fetch(`${baseURL}/todos`).then(res => res.JSON());

const sagaFetcher = createSagaFetcher({
  todos: { fetcher: getTodosFromAPI }
});

export default sagaFetcher;
