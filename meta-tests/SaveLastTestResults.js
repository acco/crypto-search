const fs = require("fs");
const path = require("path");

export const filename = path.join(__dirname, "last-results.json.ignore");

// "test": "CI=true react-scripts test --env=jsdom --testResultsProcessor='./meta-tests/SaveLastTestResults.js'",

const SaveLastTestResults = results => {
  fs.writeFileSync(filename, JSON.stringify(results));
};

module.exports = SaveLastTestResults;
