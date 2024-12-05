const getInput = require("../fileReader");

(async () => {
  let input = await getInput(__dirname);

  const pattern = /(?:mul\((\d+),(\d+)\)|do\(\)|don\'t\(\))/g;
  let total = 0;

  let match;
  let enabled = true;
  while ((match = pattern.exec(input)) !== null) {
    if (match[0] === "don't()") {
      enabled = false;
      continue;
    } else if (match[0] === "do()") {
      enabled = true;
      continue;
    }

    if (enabled) {
      total += parseInt(match[1]) * parseInt(match[2]);
    }
  }

  console.log(total);
})();
