import React from "react";
import ReactDOM from "react-dom";
import LovableFilterableTable from "../../LovableFilterableTable";
import { shallow } from "enzyme";

import { tableSchema } from "../App";

describe("LovableFilterableTable", () => {
  it("renders without crashing", () => {
    const items = [];

    const div = document.createElement("div");
    ReactDOM.render(
      <LovableFilterableTable items={items} schema={tableSchema} />,
      div
    );
  });

  it("should still render search box", () => {
    const items = [];

    const wrapper = shallow(
      <LovableFilterableTable items={items} schema={tableSchema} />
    );
    expect(wrapper.find("input").exists()).toBe(true);
  });

  it("should have no table rows", () => {
    const items = [];

    const wrapper = shallow(
      <LovableFilterableTable items={items} schema={tableSchema} />
    );
    expect(wrapper.find("tbody > tr").exists()).toBe(false);
  });
});
