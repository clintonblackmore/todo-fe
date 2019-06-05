// React
import React, { Component } from "react";

// Redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Actions
import * as actionCreators from "./actions/actionCreators";

// Components
import TodoList from "./components/TodoList";

// Data
import todos from "./data/todos";

// CSS
import "./App.css";

class AppComponent extends Component {
  render() {
    return <TodoList todos={todos.todos} title="To Do List" />;
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  };
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

// Turn the default React App (called AppComponent) into a Redux one
const App = connect(
  mapStateToProps,
  mapDispachToProps
)(AppComponent);

export default App;
