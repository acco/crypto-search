/*
 * As we discover, this does _not_ render without crashing. FilterableTable needs props!
*/
import React from "react";
import ReactDOM from "react-dom";
import FilterableTable from "../../FilterableTable";

describe("FitlerableTable", () => {
  xit("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<FilterableTable />, div);
  });
});
