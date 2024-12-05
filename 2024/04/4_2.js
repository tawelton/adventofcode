const getInput = require("../../fileReader");

const CHECK_CHAR = "A";
const VALID_DIAGONALS = ["M", "S"];
let grid;
let xCount = 0;

function getLetter(row, column, direction) {
  // Check for valid coordinates
  const nextRow = row + direction[0];
  const nextColumn = column + direction[1];

  // GUARD: Bounds check
  if (nextRow < 0 || nextRow > grid.length - 1) {
    return;
  }
  if (nextColumn < 0 || nextColumn > grid[nextRow].length - 1) {
    return;
  }

  return grid[nextRow][nextColumn];
}

// Checks if letter is non null and M or S
function isValid(letter) {
  return letter && VALID_DIAGONALS.includes(letter);
}

function searchNeighbors(row, column) {
  // Top Left
  const topLeft = getLetter(row, column, [-1, -1]);
  // Top Right
  const topRight = getLetter(row, column, [-1, 1]);
  // Bottom Left
  const bottomLeft = getLetter(row, column, [1, -1]);
  // Bottom  Right
  const bottomRight = getLetter(row, column, [1, 1]);

  // GUARD: check if all characters valid
  if (![topLeft, topRight, bottomLeft, bottomRight].every((e) => isValid(e)))
    return;

  // If diagonals are different than each other, found an X!!
  if (topLeft !== bottomRight && topRight !== bottomLeft) {
    xCount++;
  }
}

(async () => {
  const input = await getInput(__dirname);
  grid = input.split("\n").map((e) => e.split(""));

  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[row].length; column++) {
      if (grid[row][column] === CHECK_CHAR) {
        searchNeighbors(row, column);
      }
    }
  }

  console.log(xCount);
})();
