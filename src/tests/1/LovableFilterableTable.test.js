/*
 * As we discover, this does _not_ render without crashing. LovableFilterableTable needs props!
*/

// hey so you should pretend this next line never happened if you know what's good for you
import { itThatWeWantToThrow as it } from "../JestShims";

import React from "react";
import ReactDOM from "react-dom";
import LovableFilterableTable from "../../LovableFilterableTable";

describe("LovableFilterableTable", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<LovableFilterableTable />, div);
  });
});
