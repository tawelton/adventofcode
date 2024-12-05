// Import the fs module from promises
const fs = require("fs").promises;
const path = require("path");

// Define the function to read the input.txt file
async function readInputFile(directory) {
  try {
    // Construct the path to the input.txt file relative to this module
    const filePath = path.join(directory, "input.txt");

    // Read the file
    const input = await fs.readFile(filePath, "utf8");

    // Return the contents of the file
    return input;
  } catch (err) {
    console.error("Error reading file:", err);
    throw err; // Rethrow the error for potential handling in caller
  }
}

// Export the function
module.exports = readInputFile;
