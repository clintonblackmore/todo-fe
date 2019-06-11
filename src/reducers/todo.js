// Data
import initialState from "../data/todos";

import {
  DELETE_TODO_ITEM_REQUESTED,
  DELETE_TODO_ITEM_FAILED,
  DELETE_TODO_ITEM_SUCCEEDED,
  FETCH_TODO_LIST_REQUESTED,
  FETCH_TODO_LIST_FAILED,
  FETCH_TODO_LIST_SUCCEEDED,
  CREATE_TODO_ITEM_REQUESTED,
  CREATE_TODO_ITEM_FAILED,
  CREATE_TODO_ITEM_SUCCEEDED,
  UPDATE_TODO_ITEM_REQUESTED,
  UPDATE_TODO_ITEM_FAILED,
  UPDATE_TODO_ITEM_SUCCEEDED
} from "../constants";

function todoReducer(state, { type, payload }) {
  console.log(`Performing action ${type}`);
  switch (type) {
    case "@@INIT":
      return initialState;

    case FETCH_TODO_LIST_REQUESTED:
      return { ...state, status: "fetching" };

    case FETCH_TODO_LIST_FAILED:
      return { ...state, status: "failed" };

    case FETCH_TODO_LIST_SUCCEEDED:
      return { ...state, status: "succeeded", todos: payload.data.todos };

    case CREATE_TODO_ITEM_REQUESTED:
      // no change on a request
      return state;

    case CREATE_TODO_ITEM_FAILED:
      // don't know what to do here yet
      return state;

    case CREATE_TODO_ITEM_SUCCEEDED:
      return { ...state, todos: [...state.todos, payload.data] };

    case UPDATE_TODO_ITEM_REQUESTED:
      return state; // no change

    case UPDATE_TODO_ITEM_FAILED:
      return state; // fail silently (!)

    case UPDATE_TODO_ITEM_SUCCEEDED:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo._id === payload.todo._id)
            return {
              ...payload.todo
            };
          return todo;
        })
      };

    case DELETE_TODO_ITEM_REQUESTED:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo._id === payload.itemId)
            return { ...todo, deletionState: "requested" };
          return todo;
        })
      };

    case DELETE_TODO_ITEM_FAILED:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo._id === payload.itemId)
            return { ...todo, deletionState: "failed" };
          return todo;
        })
      };

    case DELETE_TODO_ITEM_SUCCEEDED:
      return {
        ...state,
        todos: state.todos.filter(item => item._id !== payload.itemId)
      };

    default:
      console.warn(`Do not know how to perform ${type} action`);
      return state;
  }
}

export default todoReducer;
