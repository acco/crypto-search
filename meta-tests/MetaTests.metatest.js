import fs from "fs";
import { filename } from "./SaveLastTestResults";

describe("Getting all meta and stuff", () => {
  let results;
  beforeAll(() => {
    results = fs.readFileSync(filename);
  });
});
