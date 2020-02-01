import React from "react";
import "./App.css";
import Cell from "./Cell.js";
import lineCollapse from "./lineCollapse.js";
import lineReverse from "./lineReverse.js";
import shuffleArray from "./shuffleArray.js";

let globalRender = 0;
let START_VALUE = 2;

class Board extends React.Component {
  constructor(props) {
    super(props);
    const size = props.size;
    const cellRows = [];

    for (let row = 0; row < size; row++) {
      let cellCols = [];
      for (let col = 0; col < size; col++) {
        cellCols.push(0);
      }
      cellRows.push(cellCols);
    }

    this.state = {
      size: size,
      cells: cellRows
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  get cells() {
    return this.state.cells;
  }

  get size() {
    return this.state.size;
  }

  getRow(rowNum) {
    return this.cells[rowNum];
  }

  getCol(colNum) {
    let returnCol = [];
    for (let i = 0; i < this.cells.length; i++) {
      returnCol.push(this.cells[i][colNum]);
    }
    return returnCol;
  }

  setRow(rowNum, newRow) {
    this.setState(currState => {
      let tempBoard = currState.cells;
      tempBoard[rowNum] = newRow;
      return {
        cells: tempBoard
      };
    });
  }

  setCol(colNum, newCol) {
    this.setState(currState => {
      let tempBoard = currState.cells;
      for (let i = 0; i < tempBoard.length; i++) {
        tempBoard[i][colNum] = newCol[i];
      }
      return {
        cells: tempBoard
      };
    });
  }

  setCell(rowNum, colNum, newCell) {
    this.setState(currState => {
      let tempBoard = currState.cells;
      tempBoard[rowNum][colNum] = newCell;
      return {
        cells: tempBoard
      };
    });
  }

  handleKeyPress(event) {
    if (event.keyCode === 37) {
      this.collapseLeft();
    } else if (event.keyCode === 38) {
      this.collapseUp();
    } else if (event.keyCode === 39) {
      this.collapseRight();
    } else if (event.keyCode === 40) {
      this.collapseDown();
    }

    this.setRandomElement();
  }

  collapseLeft() {
    for (let i = 0; i < this.size; i++) {
      let tempRow = this.getRow(i);
      let newRow = lineCollapse(tempRow.slice());

      this.setRow(i, newRow);
    }
  }
  collapseRight() {
    for (let i = 0; i < this.size; i++) {
      let tempRow = lineReverse(this.getRow(i));
      let newRow = lineCollapse(tempRow.slice());
      this.setRow(i, lineReverse(newRow));
    }
  }
  collapseUp() {
    for (let i = 0; i < this.size; i++) {
      let tempCol = this.getCol(i);
      let newCol = lineCollapse(tempCol.slice());
      this.setCol(i, newCol);
    }
  }

  collapseDown() {
    for (let i = 0; i < this.size; i++) {
      let tempCol = lineReverse(this.getCol(i));
      let newCol = lineCollapse(tempCol.slice());
      this.setCol(i, lineReverse(newCol));
    }
  }

  setRandomElement() {
    let newCell = this.generateRandomElement();
    this.setCell(newCell.row, newCell.col, newCell.val);
  }

  generateRandomElement() {
    let shuffledIndicesArr = shuffleArray(this.getArrayOfAllIndices());
    let [row, col] = this.getFirstZeroValueCell(shuffledIndicesArr);
    if (row === -1) {
      alert("GAME OVER");
      return;
    }
    return {
      row: row,
      col: col,
      val: START_VALUE
    };
  }

  getArrayOfAllIndices() {
    let indicesArr = [];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        indicesArr.push({
          r: i,
          c: j
        });
      }
    }
    return indicesArr;
  }

  getFirstZeroValueCell(indicesArr) {
    let ind = 0;
    let row = indicesArr[ind].r;
    let col = indicesArr[ind].c;
    while (this.cells[row][col] !== 0) {
      ind++;
      if (ind === indicesArr.length) {
        return -1, -1;
      }
      row = indicesArr[ind].r;
      col = indicesArr[ind].c;
    }
    return [row, col];
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
    this.setRandomElement();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    globalRender += 1;
    return (
      <div className="board">
        {this.cells.map((row, indRow) => (
          <div className="row" key={"row_" + "_" + globalRender + "_" + indRow}>
            {row.map((cell, indCol) => (
              <div key={"col_" + "_" + globalRender + "_" + indCol}>
                <Cell key={"col_" + indCol + "_row_" + indRow} value={cell} />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Board;
