const getInput = require("../../fileReader");

const CHECK_WORD = "XMAS".split("");
let grid;
let wordCount = 0;

let discoveredLetters = [];

function clearLetters() {
  discoveredLetters = [CHECK_WORD[0]];
}

function checkDirection(row, column, direction) {
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

  // Check if proposed next letter to discovered letters and see if matches n number of letters in check word
  const proposedLetters = [...discoveredLetters, grid[nextRow][nextColumn]];
  if (
    proposedLetters.join("") !==
    CHECK_WORD.slice(0, proposedLetters.length).join("")
  ) {
    return;
  }

  // Add current letter to discovered letters
  discoveredLetters = proposedLetters;

  // Check if word found
  if (discoveredLetters.length === 4) {
    wordCount++;
    return;
  }

  // Check next
  checkDirection(nextRow, nextColumn, direction);
}

function searchNeighbors(row, column) {
  // Top Left
  checkDirection(row, column, [-1, -1]);
  clearLetters();
  // Top Center
  checkDirection(row, column, [-1, 0]);
  clearLetters();
  // Top Right
  checkDirection(row, column, [-1, 1]);
  clearLetters();
  // Left
  checkDirection(row, column, [0, -1]);
  clearLetters();
  // Right
  checkDirection(row, column, [0, 1]);
  clearLetters();
  // Bottom Left
  checkDirection(row, column, [1, -1]);
  clearLetters();
  // Bottom Center
  checkDirection(row, column, [1, 0]);
  clearLetters();
  // Bottom  Right
  checkDirection(row, column, [1, 1]);
  clearLetters();
}

(async () => {
  const input = await getInput(__dirname);
  grid = input.split("\n").map((e) => e.split(""));

  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[row].length; column++) {
      if (grid[row][column] === CHECK_WORD[0]) {
        discoveredLetters = [CHECK_WORD[0]];
        searchNeighbors(row, column);
      }
    }
  }

  console.log(wordCount);
})();
