import React from "react";
import "./App.css";

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  get value() {
    return this.state.value;
  }

  render() {
    if (this.value === 0) {
      return <div className="cell"></div>;
    } else {
      return <div className="cell">{this.value}</div>;
    }
  }
}

export default Cell;
