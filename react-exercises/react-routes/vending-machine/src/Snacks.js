import React from "react";
import { Link } from "react-router-dom";

function Soda() {
  return (
    <div className="Soda">
      <h1>Soda</h1>
      <Link to="/">Go back</Link>
    </div>
  );
}

function Chips() {
  return (
    <div className="Chips">
      <h1>Chips</h1>
      <Link to="/">Go back</Link>
    </div>
  );
}

function Sardines() {
  return (
    <div className="Sardines">
      <h1>Sardines</h1>
      <Link to="/">Go back</Link>
    </div>
  );
}

export { Soda, Chips, Sardines };
