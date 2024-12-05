const getInput = require("../../fileReader");

(async () => {
  const input = await getInput(__dirname);
  let result = 0;
  let status = [];

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

  for (const updatePages of updates) {
    const pagesMap = {};

    // Populate Map
    for (const [index, page] of updatePages.entries()) {
      pagesMap[page] = index;
    }
    let isValid = true;

    for (const [index, page] of updatePages.entries()) {
      // console.log("page: ", page, "index: ", index);
      const pageRules = rulesMap[page];
      // console.log("pagerules", Object.keys(pageRules.before));

      // Check all rules
      for (const rule of Object.values(pageRules.before)) {
        // console.log(
        //   `rule: ${rule.number} before ${page} - ${rule.number} : ${
        //     pagesMap[rule.number]
        //   } < ${index} = ${pagesMap[rule.number] < index}`
        // );
        if (pagesMap[rule.number] !== null && pagesMap[rule.number] < index) {
          // console.log("error", page);
          isValid = false;
          break;
        }
      }

      if (!isValid) break;
    }
    status.push(isValid);
    if (isValid) {
      result += parseInt(updatePages[Math.floor(updatePages.length / 2)]);
    }
  }

  console.log(result);
})();
