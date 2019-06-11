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

export function fetchTodoList() {
  return {
    type: FETCH_TODO_LIST_REQUESTED
  };
}

export function fetchTodoListSucceeded(data) {
  return {
    type: FETCH_TODO_LIST_SUCCEEDED,
    payload: { data }
  };
}

export function fetchTodoListFailed(error) {
  return {
    type: FETCH_TODO_LIST_FAILED,
    payload: { error }
  };
}

export function createTodoItem(text) {
  return {
    type: CREATE_TODO_ITEM_REQUESTED,
    payload: { text }
  };
}

export function createTodoItemSucceeded(data) {
  return { type: CREATE_TODO_ITEM_SUCCEEDED, payload: { data } };
}

export function createTodoItemFailed(payload) {
  return { type: CREATE_TODO_ITEM_FAILED, payload };
}

export function updateTodoItem(payload) {
  return {
    type: UPDATE_TODO_ITEM_REQUESTED,
    payload
  };
}

export function updateTodoItemSucceeded(payload) {
  return {
    type: UPDATE_TODO_ITEM_SUCCEEDED,
    payload
  };
}

export function updateTodoItemFailed(payload) {
  return {
    type: UPDATE_TODO_ITEM_FAILED,
    payload
  };
}

export function deleteTodoItem(itemId) {
  return {
    type: DELETE_TODO_ITEM_REQUESTED,
    payload: { itemId }
  };
}

export function deleteTodoItemSucceeded(itemId) {
  return {
    type: DELETE_TODO_ITEM_SUCCEEDED,
    payload: { itemId }
  };
}

export function deleteTodoItemFailed(itemId) {
  return {
    type: DELETE_TODO_ITEM_FAILED,
    payload: { itemId }
  };
}
