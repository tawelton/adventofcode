const getInput = require("../fileReader");

(async () => {
  const input = await getInput(__dirname);

  const pattern = /mul\((\d+),(\d+)\)/g;
  let total = 0;

  let match;
  while ((match = pattern.exec(input)) !== null) {
    total += parseInt(match[1]) * parseInt(match[2]);
  }

  console.log(total);
})();
