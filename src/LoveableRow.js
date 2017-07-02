// Well... do ya?
import React, { Component } from "react";

const isLovedStyle = {
  backgroundColor: "rgba(255, 182, 193, 0.02)"
};

const tdStyle = {
  padding: "5px"
};

const LoveableRow = ({ values, isLoved, onHeartClick }) => {
  const heartClass = isLoved ? "fa fa-heart" : "fa fa-heart-o";

  return (
    <tr style={isLoved ? isLovedStyle : {}}>
      {values.map((value, idx) =>
        <td key={idx} style={tdStyle}>
          {value}
        </td>
      )}
      <td>
        {<i className={heartClass} aria-hidden="true" onClick={onHeartClick} />}
      </td>
    </tr>
  );
};

export default LoveableRow;
