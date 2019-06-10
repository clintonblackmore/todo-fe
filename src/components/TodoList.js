import React, { Component } from "react";
import PropTypes from "prop-types";
import loadingImage from "../images/loading.gif";
import ContentEditable from "react-contenteditable";

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

  renderToDoItem(
    { text, _id, completed, deletionState },
    { deleteTodoItem, updateTodoItem }
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

    const ref = React.createRef();

    return (
      <li className={styles} key={_id}>
        <ContentEditable
          html={text}
          ref={ref}
          //onChange={this.handleChange}
          onBlur={event => this.handleBlur(event, _id, updateTodoItem)}
          onKeyDown={event => this.handleKeyDown(event, _id, updateTodoItem)}
        />
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

  handleBlur = (event, id, updateTodoItem) => {
    console.log("blur");
    this.doUpdateText(event, id, updateTodoItem);
  };

  handleKeyDown = (event, id, updateTodoItem) => {
    const keyCode = event.keyCode || event.which;

    // If the enter key is pressed, prevent newlines and instead update the text
    if (keyCode === 13) {
      console.log("ret");
      event.returnValue = false;
      if (event.preventDefault) event.preventDefault();
      this.doUpdateText(event, id, updateTodoItem);
    }
  };

  doUpdateText = (event, id, updateTodoItem) => {
    console.log("DO UPDATE");
    const text = event.target.innerText;
    const completed = false;
    updateTodoItem(id, text, completed);
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
