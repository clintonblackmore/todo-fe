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

export function createTodoItem(text) {
  return {
    type: CREATE_TODO_ITEM_REQUESTED,
    text
  };
}

export function deleteTodoItem(itemId) {
  return {
    type: DELETE_TODO_ITEM_REQUESTED,
    itemId
  };
}

export function fetchTodoList() {
  return {
    type: FETCH_TODO_LIST_REQUESTED
  };
}

export function updateTodoItem(id, text, completed) {
  return {
    type: UPDATE_TODO_ITEM_REQUESTED,
    id,
    text,
    completed
  };
}
