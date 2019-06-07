// React
import React, { Component } from "react";

// Redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Actions
import * as actionCreators from "./actions/actionCreators";

// Components
import TodoList from "./components/TodoList";

// CSS
import "./App.css";

class AppComponent extends Component {
  componentDidMount() {
    console.log("App has mounted");
    this.props.fetchTodoList();
  }

  render() {
    const { todos, status, createTodoItem, deleteTodoItem } = this.props;

    return (
      <TodoList
        todos={todos}
        status={status}
        actions={{ createTodoItem, deleteTodoItem }}
        title="To Do List"
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos,
    status: state.status
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
