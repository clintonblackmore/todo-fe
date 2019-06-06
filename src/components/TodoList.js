import React, { Component } from "react";
import PropTypes from "prop-types";

class TodoList extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    todos: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool,
        _id: PropTypes.string.isRequired
      })
    )
  };

  buttonAction(id) {
    console.log(id);
  }

  renderToDoItem({ text, _id, completed, deleteFn }, { deleteTodoItem }) {
    const style = completed ? "completed" : null;

    return (
      <li className={style} key={_id}>
        {text}
        <button className="delete" onClick={() => deleteTodoItem(_id)}>
          X
        </button>
      </li>
    );
  }

  render() {
    const { title, todos, actions } = this.props;

    return (
      <div className="todo-list">
        <h1>{title}</h1>
        <ul>{todos.map(todo => this.renderToDoItem(todo, actions))}</ul>
      </div>
    );
  }
}

export default TodoList;
