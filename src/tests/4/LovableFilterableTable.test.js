import React from "react";
import ReactDOM from "react-dom";
import LovableFilterableTable from "../../LovableFilterableTable";
import { shallow } from "enzyme";

import { tableSchema } from "../App";

describe("LovableFilterableTable", () => {
  let wrapper;

  it("renders without crashing", () => {
    const items = [];

    const div = document.createElement("div");
    ReactDOM.render(
      <LovableFilterableTable items={items} schema={tableSchema} />,
      div
    );
  });

  describe("when given empty `items`", () => {
    const items = [];

    beforeEach(() => {
      wrapper = shallow(
        <LovableFilterableTable items={items} schema={tableSchema} />
      );
    });

    it("should still render search box", () => {
      expect(wrapper.find("input").exists()).toBe(true);
    });

    it("should have no table rows", () => {
      expect(wrapper.find("tbody > tr").exists()).toBe(false);
    });
  });
});
