import React from "react";
import { Link } from "react-router-dom";
import "./Color.css";

function Color({ hex, history }) {
  if (!hex) {
    history.push("/colors");
  }

  return (
    <div className="Color" style={{ backgroundColor: hex }}>
      <p>
        <Link to="/">Go back</Link>
      </p>
    </div>
  );
}

export default Color;
