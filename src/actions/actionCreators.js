export function createTodoItem(text) {
  return {
    type: "CREATE_TODO_ITEM",
    text
  };
}

export function deleteTodoItem(itemId) {
  console.log("Delete Todo Item called");
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
