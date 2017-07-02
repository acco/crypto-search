"use strict";

const path = require("path");

const NODE_MODULES_DIR = path.join(__dirname, "../../node_modules");

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "test";
process.env.NODE_ENV = "test";
process.env.PUBLIC_URL = "";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", err => {
  throw err;
});

const jest = require("jest-cli");

const config = {
  collectCoverageFrom: ["src/**/*.{js,jsx}"],
  setupFiles: [
    path.resolve(
      path.join(NODE_MODULES_DIR, "react-scripts/config/polyfills.js")
    )
  ],
  transform: {
    "^.+\\.(js|jsx)$": path.resolve(
      NODE_MODULES_DIR,
      "react-scripts/config/jest/babelTransform.js"
    )
  },
  testMatch: ["<rootDir>/src/versions/**/FilterableTable**"],
  testEnvironment: "node"
};

jest.run([
  "--json",
  "--runInBand",
  "--silent",
  "--env=jsdom",
  "--config",
  JSON.stringify(config)
]);
