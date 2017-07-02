import React from "react";
import ReactDOM from "react-dom";
import FilterableTable from "../../FilterableTable";
import { shallow } from "enzyme";

xdescribe("FitlerableTable", () => {
  it("renders without crashing", () => {
    let items = ["bitcoin", "ethereum"];
    let onItemClick = () => {};

    const div = document.createElement("div");
    ReactDOM.render(
      <FilterableTable items={items} onItemClick={onItemClick} />,
      div
    );
  });

  it("when given empty `items`, should still render search box", () => {
    const wrapper = shallow(<FilterableTable items={[]} />);
    expect(wrapper.contains(<div className="input" />)).toBe(true);
  });
});
