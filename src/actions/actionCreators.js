export function createTodoItem(text) {
  return {
    type: "CREATE_TODO_ITEM_REQUESTED",
    text
  };
}

export function deleteTodoItem(itemId) {
  return {
    type: "DELETE_TODO_ITEM_REQUESTED",
    itemId
  };
}

export function fetchTodoList() {
  return {
    type: "FETCH_TODO_LIST_REQUESTED"
  };
}

export function updateTodoItem(id, text, completed) {
  return {
    type: "UPDATE_TODO_ITEM_REQUESTED",
    id,
    text,
    completed
  };
}
