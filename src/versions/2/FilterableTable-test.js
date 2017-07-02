/*
 * Working smoke test.
*/
import React from "react";
import ReactDOM from "react-dom";
import FilterableTable from "../../FilterableTable";

describe("FitlerableTable", () => {
  it("renders without crashing", () => {
    let items = ["bitcoin", "ethereum"];
    let onItemClick = () => {};

    const div = document.createElement("div");
    ReactDOM.render(
      <FilterableTable items={items} onItemClick={onItemClick} />,
      div
    );
  });
});
