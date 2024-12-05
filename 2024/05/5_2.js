const getInput = require("../../fileReader");

function moveElementBack(array, index, pagesMap) {
  if (index > 0) {
    const element = array.splice(index, 1)[0]; // Remove the element
    array.splice(index - 1, 0, element); // Insert it one position back
    pagesMap[array[index - 1]] = index - 1;
    pagesMap[array[index]] = index;
  }
}

(async () => {
  const input = await getInput(__dirname);
  let result = 0;

  // Parse input
  const [rulesInput, updatesInput] = input.split("\n\n");
  const rulePairs = rulesInput.split("\n").map((e) => e.split("|"));
  const updates = updatesInput.split("\n").map((e) => e.split(","));

  const rulesMap = {};
  // Populate map with keys and empty objects
  for (const rulePair of rulePairs) {
    if (!rulesMap[rulePair[0]]) {
      rulesMap[rulePair[0]] = { number: rulePair[0], before: {} };
    }
    if (!rulesMap[rulePair[1]]) {
      rulesMap[rulePair[1]] = { number: rulePair[1], before: {} };
    }
  }
  // Build rules tree
  for (const rulePair of rulePairs) {
    rulesMap[rulePair[0]].before[rulePair[1]] = rulesMap[rulePair[1]];
  }

  // determine validity
  for (const updatePages of updates) {
    const pagesMap = {};

    // Populate Map
    for (const [index, page] of updatePages.entries()) {
      pagesMap[page] = index;
    }
    let isModified = false;

    for (let index = 0; index < updatePages.length; index++) {
      const page = updatePages[index];
      const pageRules = rulesMap[page];

      // Check all rules
      for (const rule of Object.values(pageRules.before)) {
        // If incorrect, move backwards and set loop index back to new location
        if (pagesMap[rule.number] !== null && pagesMap[rule.number] < index) {
          isModified = true;
          moveElementBack(updatePages, index, pagesMap);
          index -= 2;
          break;
        }
      }
    }

    if (isModified) {
      result += parseInt(updatePages[Math.floor(updatePages.length / 2)]);
    }
  }

  console.log(result);
})();
