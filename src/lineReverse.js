import "./App.css";

function lineReverse(line) {
  let returnLine = [];
  for (let i = line.length - 1; i >= 0; i--) {
    returnLine.push(line[i]);
  }
  return returnLine;
}

export default lineReverse;
