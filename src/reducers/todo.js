function todoReducer(state = [], action) {
  console.log(`Performing action ${action.type}`);
  switch (action.type) {
    case "@@INIT":
      return state;

    case "DELETE_TODO_ITEM":
      console.log("----");
      console.log(action);
      console.log(state);
      console.log("----");
      return state;

    default:
      console.warn(`Do not know how to perform ${action.type} action`);
      return state;
  }
}

export default todoReducer;
