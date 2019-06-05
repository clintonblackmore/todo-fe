import React, { Component } from "react";
import todos from "./data/todos";
import "./App.css";
import TodoList from "./components/TodoList";

class App extends Component {
  state = {
    todos
  };

  render() {
    return <TodoList todos={todos.todos} title="To Do List" />;
  }
}

export default App;
