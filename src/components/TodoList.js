import React, { Component } from "react";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";

class TodoList extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    todos: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool
      })
    )
  };

  render() {
    return (
      <div className="todo-list">
        <h1>{this.props.title}</h1>
        <ul>
          {this.props.todos.map(todo => (
            <TodoItem {...todo} />
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoList;
