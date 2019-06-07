// Data
import initialState from "../data/todos";

function todoReducer(state, action) {
  console.log(`Performing action ${action.type}`);
  switch (action.type) {
    case "@@INIT":
      return initialState;

    /*
    case "DELETE_TODO_ITEM":
      console.log("----");
      console.log(action);
      console.log(state);
      console.log("----");
      return state;
      */

    case "FETCH_TODO_LIST_REQUESTED":
      return { ...state, status: "fetching" };

    case "FETCH_TODO_LIST_FAILED":
      return { ...state, status: "failed" };

    case "FETCH_TODO_LIST_SUCCEEDED":
      return { ...state, status: "succeeded" };

    default:
      console.warn(`Do not know how to perform ${action.type} action`);
      return state;
  }
}

export default todoReducer;
