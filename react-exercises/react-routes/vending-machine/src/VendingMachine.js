import React, { useState } from "react";
import { Route } from "react-router-dom";
import NumPad from "react-numpad";
import ITEMS from "./items";
import VendingMachineContext from "./VendingMachineContext";
import Bag from "./Bag";
import Shelf from "./Shelf";
import "./VendingMachine.css";

function VendingMachine() {
  const [bag, setBag] = useState({});

  const updateBag = (item) => {
    if (!(item in ITEMS)) return;

    let i = bag[item];
    if (!i) {
      i = { ...bag, [item]: 1 };
    } else {
      i = { ...bag, [item]: ++bag[item] };
    }
    setBag(i);
  };

  return (
    <VendingMachineContext.Provider value={bag}>
      <div className="VendingMachine">
        <div className="inner">
          <Shelf />
        </div>
        <div className="glass"></div>
        <div className="tray"></div>
        <div className="numpad">
          {" "}
          <NumPad.Number onChange={(num) => updateBag(num)} />
        </div>

        <div className="item">
          {Object.keys(ITEMS).map((i, idx) => (
            <Route key={idx} exact path={`/${ITEMS[i].name}`}>
              {ITEMS[i].component}
            </Route>
          ))}
        </div>

        <Bag />
      </div>
    </VendingMachineContext.Provider>
  );
}

export default VendingMachine;
