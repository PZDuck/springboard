import React from "react";
import "./App.css";
import { NavLink } from "react-router-dom";
import ITEMS from "./items";

function NavBar() {
  return (
    <nav className="NavBar">
      <ul>
        {Object.keys(ITEMS).map((i, idx) => (
          <NavLink key={idx} exact to={`${ITEMS[i].name}`}>
            <li>{`${i} ${ITEMS[i].name}`}</li>
          </NavLink>
        ))}
      </ul>
      <h2></h2>
    </nav>
  );
}

export default NavBar;
