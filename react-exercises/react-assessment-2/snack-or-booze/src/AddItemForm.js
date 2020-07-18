import React, { useState, useContext } from "react";
import AppContext from "./AppContext";
import "./AddItemForm.css";

function AddItemForm({ type, addItem }) {
  const INITIAL_STATE = {
    id: "",
    name: "",
    description: "",
    recipe: "",
    serve: "",
  };

  let { items, setItems } = useContext(AppContext); // get items State from the App component
  const [item, setItem] = useState(INITIAL_STATE);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // update the items by pushing a new item into corresponding key (snacks/drinks)
    let i = { ...items };
    i[type].push(item);

    addItem(type, item);
    setItems(i);
    setItem(INITIAL_STATE);
  };

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
      id: item.name.split(" ").join("-").toLowerCase(), // drawback: does not add the last letter until the next render
    });
  };

  return (
    <form class={`AddItemForm ${type}`} onSubmit={handleSubmit}>
      <label htmlFor="name">Name: </label>
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Name"
        onChange={handleChange}
        value={item.name}
      ></input>

      <label htmlFor="description">Description: </label>
      <input
        id="description"
        name="description"
        type="text"
        placeholder="Description"
        onChange={handleChange}
        value={item.description}
      ></input>

      <label htmlFor="recipe">Recipe: </label>
      <input
        id="recipe"
        name="recipe"
        type="text"
        placeholder="Recipe"
        onChange={handleChange}
        value={item.recipe}
      ></input>

      <label htmlFor="serve">Serve: </label>
      <input
        id="serve"
        name="serve"
        type="text"
        placeholder="Serve"
        onChange={handleChange}
        value={item.serve}
      ></input>

      <button>Add!</button>
    </form>
  );
}

export default AddItemForm;
