export function createTodoItem(text) {
  return {
    type: "CREATE_TODO_ITEM",
    text
  };
}
