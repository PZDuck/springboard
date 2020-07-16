import React from "react";
import "./App.css";
import { NavLink } from "react-router-dom";
import ITEMS from "./items";

function NavBar() {
  return (
    <div className="Shelf">
      {Object.keys(ITEMS).map((i, idx) => (
        <NavLink key={idx} exact to={`${ITEMS[i].name}`}>
          <img src={ITEMS[i].icon} />
          <div className="item-label">{`${i}`}</div>
        </NavLink>
      ))}
    </div>
  );
}

export default NavBar;
