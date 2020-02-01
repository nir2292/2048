import "./App.css";

function lineCollapse(line) {
  let first = 0;
  while (first < line.length) {
    let second = first + 1;
    while (line[second] === 0 && second < line.length) {
      second++;
    }
    if (second === line.length) return line;
    if (line[first] === 0) {
      line[first] = line[second];
      line[second] = 0;
    } else if (line[first] === line[second]) {
      line[first] += line[second];
      line[second] = 0;
      first++;
    } else first++;
  }
  return line;
}

export default lineCollapse;
