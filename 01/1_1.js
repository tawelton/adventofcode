const getInput = require("../fileReader");

(async () => {
  const input = await getInput(__dirname);
  const inputLines = input.split("\n");
  const leftList = [];
  const rightList = [];
  const inputPairs = inputLines.forEach((e) => {
    leftList.push(parseInt(e.split("   ")[0]));
    rightList.push(parseInt(e.split("   ")[1]));
  });

  leftList.sort();
  rightList.sort();

  let total = 0;
  for (let i = 0; i < leftList.length; i++) {
    total += Math.abs(leftList[i] - rightList[i]);
  }

  console.log(total);
})();
