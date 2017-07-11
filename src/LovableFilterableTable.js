import React, { Component } from "react";

import "./LovableFilterableTable.css";

const isLovedStyle = {
  backgroundColor: "rgba(255, 182, 193, 0.02)"
};

const tdStyle = {
  padding: "5px"
};

const getObjectValues = item => {
  // I love you, JavaScript!!!
  if (typeof Object.values === "function") {
    return Object.values(item);
  } else {
    return Object.keys(item).map(k => item[k]);
  }
};

const filterMatches = (filter, items) => {
  return items.filter(item => {
    return getObjectValues(item).find(
      property => property && property.match(new RegExp(filter, "i"))
    );
  });
};

class LovableFilterableTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: "",
      matches: this.props.items
    };
  }

  updateFilter = (filter, items) => {
    this.setState(() => ({
      filter: filter,
      matches: filterMatches(filter, items)
    }));
  };

  onFilterChange = e => {
    this.updateFilter(e.target.value, this.props.items);
  };

  componentWillReceiveProps(nextProps) {
    this.updateFilter(this.state.filter, nextProps.items);
  }

  render() {
    const { schema, onHeartClick } = this.props;
    const keys = Object.keys(schema);
    const { filter, matches } = this.state;

    return (
      <div className="LovableFilterableTable">
        <div className="row">
          <table>
            <thead>
              <tr>
                <td>
                  <label htmlFor="filterField">Filter</label>
                  <input
                    type="text"
                    placeholder="Filter..."
                    id="filterField"
                    style={{ minWidth: "300px" }}
                    onChange={this.onFilterChange}
                    value={filter}
                  />
                </td>
              </tr>
              <tr>
                {keys.map(key =>
                  <th key={key}>
                    {schema[key]}
                  </th>
                )}
                <th />
              </tr>
            </thead>
            <tbody>
              {matches.map(item => {
                const heartClass = item.isLoved
                  ? "fa fa-heart"
                  : "fa fa-heart-o";
                return (
                  <tr style={item.isLoved ? isLovedStyle : {}} key={item.id}>
                    {keys.map(key => {
                      const value = item[key];
                      return (
                        <td key={key} className={`item-${key}`} style={tdStyle}>
                          {value}
                        </td>
                      );
                    })}
                    <td className="item-heart">
                      {
                        <i
                          className={heartClass}
                          aria-hidden="true"
                          onClick={() => onHeartClick(item.id)}
                        />
                      }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default LovableFilterableTable;
