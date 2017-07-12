import React from "react";
import ReactDOM from "react-dom";
import LovableFilterableTable from "../../LovableFilterableTable";
import { shallow } from "enzyme";

import { tableSchema } from "../App";

import fs from "fs";
import path from "path";

const SAMPLE_RESPONSE_FILE = path.join(__dirname, "../../sample-data.json");

const generateItems = (n = 30) => {
  const response = fs.readFileSync(SAMPLE_RESPONSE_FILE);
  const json = JSON.parse(response);

  return json.slice(0, n).map(item => ({
    ...item,
    isLoved: false
  }));
};

import serializer from "jest-serializer-enzyme";
expect.addSnapshotSerializer(serializer);

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
        <LovableFilterableTable items={[]} schema={tableSchema} />
      );
    });

    it("should render an empty table", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("when given some `items`", () => {
    beforeEach(() => {
      const items = generateItems(3);
      wrapper = shallow(
        <LovableFilterableTable items={items} schema={tableSchema} />
      );
    });

    it("should render each item in the table", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("user enters search query", () => {
    let items;

    beforeEach(() => {
      items = generateItems();
      wrapper = shallow(
        <LovableFilterableTable items={items} schema={tableSchema} />
      );

      const searchBox = wrapper.find("input");
      searchBox.simulate("change", { target: { value: "coin" } });
    });

    it("should filter items", () => {
      expect(
        wrapper.find("tbody > tr > .item-name").map(n => n.text())
      ).toMatchSnapshot();
    });

    describe("user clears search query", () => {
      beforeEach(() => {
        const searchBox = wrapper.find("input");
        searchBox.simulate("change", { target: { value: "" } });
      });

      it("should render all the items again", () => {
        expect(wrapper.find("tbody > tr").length).toEqual(items.length);
      });
    });
  });
});
