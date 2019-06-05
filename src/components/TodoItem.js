// This component shows one to-do item

// It has the following properties:
// - text
// - complete

import React, { Component } from "react";
import PropTypes from "prop-types";

class Todo extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool
  };

  render() {
    const style = this.props.completed ? "completed" : null;
    console.log(style);

    return <li className={style}>{this.props.text}</li>;
  }
}

export default Todo;
