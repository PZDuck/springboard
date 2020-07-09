import React, { useState } from "react";
import Box from "./Box";
import NewBoxForm from "./NewBoxForm";
import "./BoxList.css";

function BoxList() {
  const [boxes, setBoxes] = useState([]);
  const addBox = (box) => {
    setBoxes([
      ...boxes,
      {
        color: box.color,
        width: box.width,
        height: box.height,
      },
    ]);
  };
  const removeBox = (box) => {
    setBoxes(boxes.filter((b) => b !== box));
  };

  return (
    <div className="BoxList">
      <NewBoxForm addBox={addBox} />
      <div className="BoxList-boxes">
        {boxes.map((box) => (
          <Box
            color={box.color}
            width={box.width}
            height={box.height}
            remove={() => removeBox(box)}
          />
        ))}
      </div>
    </div>
  );
}

export default BoxList;
