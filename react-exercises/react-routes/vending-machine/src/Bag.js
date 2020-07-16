import React, { useContext } from "react";
import VendingMachineContext from "./VendingMachineContext";
import ITEMS from "./items";
import "./Bag.css";

function Bag() {
  const bag = useContext(VendingMachineContext);
  return (
    <div className="Bag">
      <h2>
        Your bag:{" "}
        <ul>
          {Object.entries(bag).map((i, idx) => (
            <li key={ITEMS[i[0]].name}>
              <img src={ITEMS[i[0]].icon} />- {i[1]}
            </li>
          ))}
        </ul>
      </h2>
    </div>
  );
}

export default Bag;
