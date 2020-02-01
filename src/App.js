import React from "react";
import "./App.css";
import Board from "./Board.js";

var SIZE = 4;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: SIZE
    };
  }

  get size() {
    return this.state.size;
  }

  render() {
    return (
      <div className="App">
        <Board size={this.size} />
      </div>
    );
  }
}

export default App;
