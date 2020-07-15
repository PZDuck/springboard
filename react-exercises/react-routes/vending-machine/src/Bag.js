import React, { useContext } from "react";
import VendingMachineContext from "./VendingMachineContext";
import ITEMS from "./items";

function Bag() {
  const bag = useContext(VendingMachineContext);
  return (
    <div className="Bag">
      <h2>
        Your bag:{" "}
        <ul>
          {Object.entries(bag).map((i) => (
            <li>
              {ITEMS[i[0]].name} - #{i[1]}
            </li>
          ))}
        </ul>
      </h2>
    </div>
  );
}

export default Bag;
