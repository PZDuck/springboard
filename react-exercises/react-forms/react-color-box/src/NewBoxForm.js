import React, { useState } from "react";
import "./NewBoxForm.css";

function NewBoxForm({ addBox }) {
  const INITIAL_STATE = {
    color: "",
    width: "",
    height: "",
  };

  const [box, setBox] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    console.log(e.target);
    setBox({
      ...box,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBox(box);
    setBox(INITIAL_STATE);
  };

  return (
    <form id="NewBoxForm" onSubmit={handleSubmit}>
      <label htmlFor="color">Enter a color</label>
      <input
        id="color"
        value={box.color}
        onChange={handleChange}
        placeholder="Color"
      ></input>

      <label htmlFor="width">Specify the width</label>
      <input
        id="width"
        value={box.width}
        onChange={handleChange}
        placeholder="Width"
      ></input>

      <label htmlFor="height">Specify the height</label>
      <input
        id="height"
        value={box.height}
        onChange={handleChange}
        placeholder="Height"
      ></input>
      <button>Pick</button>
    </form>
  );
}

export default NewBoxForm;
