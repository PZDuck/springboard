import React from "react";
import { Link } from "react-router-dom";
import "./Snack.css";

function Snack(props) {
  return (
    <div className={`Snack ${props.name}`}>
      <h2>{props.name}</h2>
      <ul>
        {Object.keys(props.info).map((i) => (
          <li key={i}>
            {i.charAt(0).toUpperCase() + i.slice(1)} - {props.info[i]}
          </li>
        ))}
      </ul>
      <Link to="/">Go back</Link>
    </div>
  );
}

export default Snack;
