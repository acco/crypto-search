// I seek forgiveness from no one.
fs = require("fs");

const STRING_TO_REPLACE = /jest.run\(argv\)\;/g;
// const NEW_STRING =
//   'jest.run(argv + " --coveragePathIgnorePatterns=<rootDir>/src/versions");';

const NEW_STRING =
  'jest.run(argv + " --testResultsProcessor=<rootDir>/TestYourTests.js");';

const JEST_TEST_SCRIPT_PATH = "./node_modules/react-scripts/scripts/test.js";

const jestTestScript = fs.readFileSync(JEST_TEST_SCRIPT_PATH).toString("utf8");

if (jestTestScript.includes(NEW_STRING)) {
  console.log("Jest config already patched.");
  process.exit();
} else if (!STRING_TO_REPLACE.test(jestTestScript)) {
  throw new Error("Uh-oh. Expected to find string " + STRING_TO_REPLACE);
}

const patchedScript = jestTestScript.replace(STRING_TO_REPLACE, NEW_STRING);

fs.writeFileSync(JEST_TEST_SCRIPT_PATH, patchedScript);

console.log("Jest config patched!");
process.exit();
