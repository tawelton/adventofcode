const getInput = require("../../fileReader");

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

  const rightCountMap = {};
  for (const number of rightList) {
    rightCountMap[number] = (rightCountMap[number] ?? 0) + 1;
  }

  let total = 0;
  for (let i = 0; i < leftList.length; i++) {
    total += leftList[i] * (rightCountMap[leftList[i]] ?? 0);
  }

  console.log(total);
})();
