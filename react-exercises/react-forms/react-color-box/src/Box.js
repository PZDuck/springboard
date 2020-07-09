import React from "react";
import "./Box.css";

function Box({ color, width, height, remove }) {
  return (
    <div
      className="Box"
      style={{
        backgroundColor: color,
        width: `${width}px`,
        height: `${height}px`,
      }}
      onClick={remove}
    >
      <span>X</span>
    </div>
  );
}

export default Box;
