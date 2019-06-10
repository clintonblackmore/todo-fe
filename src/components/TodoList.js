import React, { Component } from "react";
import PropTypes from "prop-types";
import loadingImage from "../images/loading.gif";

class TodoList extends Component {
  todoInput = React.createRef();

  static propTypes = {
    title: PropTypes.string.isRequired,
    status: PropTypes.string,
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

  renderToDoItem(
    { text, _id, completed, deleteFn, deletionState },
    { deleteTodoItem }
  ) {
    let styles = "";
    if (completed) styles += " completed ";
    if (deletionState) styles += ` delete_${deletionState} `;

    let deleteButton = (
      <button className="delete" onClick={() => deleteTodoItem(_id)}>
        X
      </button>
    );
    if (deletionState === "requested") deleteButton = null;

    return (
      <li className={styles} key={_id}>
        {text}
        {deleteButton}
      </li>
    );
  }

  onSubmitNewTodo = (event, createTodoItem) => {
    event.preventDefault();
    const text = this.todoInput.current.value;
    createTodoItem(text);
    event.currentTarget.reset();
  };

  renderCreateToDoForm({ createTodoItem }) {
    return (
      <form onSubmit={event => this.onSubmitNewTodo(event, createTodoItem)}>
        <input
          type="text"
          placeholder="don't forget to ..."
          ref={this.todoInput}
        />
      </form>
    );
  }

  renderStatus(status) {
    switch (status) {
      case "fetching":
        return <img src={loadingImage} alt="loading" />;
      case "failed":
        return <p>Unable to obtain data. Sorry.</p>;
      case "succeeded":
        return null;
      default:
        return null;
    }
  }

  render() {
    const { title, todos, actions, status } = this.props;

    return (
      <div className="todo-list">
        <h1>{title}</h1>
        {this.renderStatus(status)}
        <ul>{todos.map(todo => this.renderToDoItem(todo, actions))}</ul>
        {this.renderCreateToDoForm(actions)}
      </div>
    );
  }
}

export default TodoList;
