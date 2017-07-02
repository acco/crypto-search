import React from "react";
import ReactDOM from "react-dom";
import FilterableTable from "../../FilterableTable";
import { shallow } from "enzyme";
import { tableSchema } from "../../App";

import fs from "fs";
import path from "path";

const SAMPLE_RESPONSE_FILE = path.join(__dirname, "../../sample-data.json");

const generateItems = () => {
  const response = fs.readFileSync(SAMPLE_RESPONSE_FILE);
  const json = JSON.parse(response);

  return json.slice(0, 30).map(item => ({
    ...item,
    isLoved: false
  }));
};

describe("FitlerableTable", () => {
  let wrapper;

  xit("renders without crashing", () => {
    let items = ["bitcoin", "ethereum"];
    let onItemClick = () => {};

    const div = document.createElement("div");
    ReactDOM.render(
      <FilterableTable
        schema={tableSchema}
        items={items}
        onItemClick={onItemClick}
      />,
      div
    );
  });

  describe("when supplied some `items`", () => {
    const items = [
      { name: "Bitcoin", id: 1 },
      { name: "Ethereum", id: 2 },
      { name: "Litecoin", id: 3 }
    ];

    beforeEach(() => {
      wrapper = shallow(<FilterableTable schema={tableSchema} items={items} />);
    });

    it("should render some `tr` elements", () => {
      expect(wrapper.find("tbody > tr").exists()).toBe(true);
    });

    it("should render correct number of `tr` elements", () => {
      expect(wrapper.find("tbody > tr").length).toEqual(3);
    });

    it("should include the title of each item", () => {
      items.forEach(item => {
        expect(
          wrapper.containsMatchingElement(
            <td>
              {item.name}
            </td>
          )
        ).toBe(true);
      });
    });
  });

  describe("user interaction", () => {
    let items;

    beforeEach(() => {
      items = generateItems();
      wrapper = shallow(<FilterableTable items={items} schema={tableSchema} />);

      const searchBox = wrapper.find("input");
      searchBox.simulate("change", { target: { value: "coin" } });
    });

    it("should render a subset of matching `items`", () => {
      const matching = items.filter(i => i.name.match(/coin/i));

      matching.forEach(match => {
        expect(
          wrapper.containsMatchingElement(
            <td>
              {match.name}
            </td>
          )
        ).toBe(true);
      });
    });
    it("should not render the `items` that don't match", () => {
      const notMatching = items.filter(i => !i.name.match(/coin/i));

      notMatching.forEach(match => {
        expect(
          wrapper.containsMatchingElement(
            <td>
              {match.name}
            </td>
          )
        ).toBe(false);
      });
    });
  });
});
