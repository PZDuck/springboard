import React, { useState } from "react";
import { Route } from "react-router-dom";
import NumPad from "react-numpad";
import ITEMS from "./items";
import VendingMachineContext from "./VendingMachineContext";
import Bag from "./Bag";

function VendingMachine() {
  const [item, setItem] = useState("");
  const [bag, setBag] = useState({});

  const selectItem = (num) => {
    if (!(num in ITEMS)) return;
    setItem(num);
  };

  const updateBag = () => {
    let i = bag[item];
    if (!i) {
      i = { ...bag, [item]: 1 };
    } else {
      console.log(bag[item]);
      i = { ...bag, [item]: ++bag[item] };
      console.log(i);
    }
    setBag(i);
  };

  return (
    <VendingMachineContext.Provider value={bag}>
      <Bag />
      <div className="VendingMachine">
        <NumPad.Number
          onChange={(num) => selectItem(num)}
          label="Enter the num"
        />
        <button onClick={() => updateBag()}>Get a snack!</button>
        {Object.keys(ITEMS).map((i, idx) => (
          <Route key={idx} exact path={`/${ITEMS[i].name}`}>
            {ITEMS[i].component}
          </Route>
        ))}
      </div>
    </VendingMachineContext.Provider>
  );
}

export default VendingMachine;
