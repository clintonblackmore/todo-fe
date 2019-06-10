// Data
import initialState from "../data/todos";

function todoReducer(state, action) {
  console.log(`Performing action ${action.type}`);
  switch (action.type) {
    case "@@INIT":
      return initialState;

    case "DELETE_TODO_ITEM_REQUESTED":
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo._id === action.itemId)
            return { ...todo, deletionState: "requested" };
          return todo;
        })
      };

    case "DELETE_TODO_ITEM_FAILED":
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo._id === action.itemId)
            return { ...todo, deletionState: "failed" };
          return todo;
        })
      };

    case "DELETE_TODO_ITEM_SUCCEEDED":
      return {
        ...state,
        todos: state.todos.filter(item => item._id !== action.itemId)
      };

    case "FETCH_TODO_LIST_REQUESTED":
      return { ...state, status: "fetching" };

    case "FETCH_TODO_LIST_FAILED":
      return { ...state, status: "failed" };

    case "FETCH_TODO_LIST_SUCCEEDED":
      return { ...state, status: "succeeded", todos: action.data.todos };

    case "CREATE_TODO_ITEM_REQUESTED":
      // no change on a request
      return state;

    case "CREATE_TODO_ITEM_FAILED":
      // don't know what to do here yet
      return state;

    //return { ...state, status: "failed" };

    case "CREATE_TODO_ITEM_SUCCEEDED":
      return { ...state, todos: [...state.todos, action.data] };

    default:
      console.warn(`Do not know how to perform ${action.type} action`);
      return state;
  }
}

export default todoReducer;
