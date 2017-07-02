import React from "react";
import ReactDOM from "react-dom";
import FilterableTable from "./FilterableTable";
import { COLUMNS } from "./App.js";
import { shallow } from "enzyme";

xdescribe("FitlerableTable", () => {
  let wrapper;

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<FilterableTable columns={COLUMNS} items={[]} />, div);
  });

  describe("when given empty set of items", () => {
    beforeEach(() => {
      wrapper = shallow(<FilterableTable columns={COLUMNS} items={[]} />);
    });

    it("should still render the `input` element", () => {
      expect(wrapper.containsMatchingElement(<input />)).toBe(true);
      // expect(wrapper.find("tbody > tr").length).toEqual(0);
    });

    it("should render no `tr` elements", () => {
      expect(wrapper.containsMatchingElement(<tr />)).toBe(false);
    });
  });

  describe("when supplied some `items`", () => {
    const items = [
      {
        name: "Bitcoin",
        id: 1
      },
      {
        name: "Ethereum",
        id: 2
      },
      {
        name: "Litecoin",
        id: 3
      }
    ];

    beforeEach(() => {
      wrapper = shallow(<FilterableTable columns={COLUMNS} items={items} />);
    });

    xit("should render some `tr` elements", () => {
      expect(wrapper.containsMatchingElement(<tr />)).toBe(true);
    });

    xit("should render appropriate number of `tr` elements", () => {
      expect(wrapper.find("tr").length).toEqual(3);
    });

    it("should render some `tr` elements", () => {
      expect(wrapper.exists("tbody > tr")).toBe(true);
    });

    it("should render appropriate number of `tr` elements", () => {
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

    it("should include the title of each item", () => {
      const titles = items.map(i => i.name);
      items.forEach(item => {
        expect(
          wrapper.find('tbody > tr > td[key="name"]').map(td => td.text())
        ).toEqual(titles);
      });
    });
  });
});
