const getInput = require("../../fileReader");

(async () => {
  const input = await getInput(__dirname);

  const inputLines = input.split("\n");
  const reports = inputLines.map((e) => e.split(" ").map((f) => parseInt(f)));

  const statuses = [];

  for (const report of reports) {
    let direction;
    let status = "safe";
    // Start at second item since no trend is established until second item
    for (let j = 1; j < report.length; j++) {
      // determine direction from first iteration
      if (!direction) {
        if (report[j] > report[j - 1]) {
          direction = "increasing";
        } else if (report[j] < report[j - 1]) {
          direction = "decreasing";
        }
      }
      const delta = report[j] - report[j - 1];

      // if change is less than 1 or greater than 3, unsafe
      if (Math.abs(delta) > 3 || Math.abs(delta) < 1) {
        status = "unsafe";
        break;
      }

      // if trend is increasing and decrease detected,
      if (direction === "increasing" && delta <= 0) {
        status = "unsafe";
        break;
      }

      // if trend is decreasing and increase detected,
      if (direction === "decreasing" && delta >= 0) {
        status = "unsafe";
        break;
      }
    }

    statuses.push(status);
  }

  console.log(statuses.filter((e) => e === "safe").length);
})();
