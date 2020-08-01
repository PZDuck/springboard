import React, { useState } from "react";

function NewTodoForm({ addTodo }) {
  const INITIAL_STATE = {
    task: "",
    isCompleted: false,
  };

  const [todo, setTodo] = useState(INITIAL_STATE);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(todo);
    setTodo(INITIAL_STATE);
  };

  const handleChange = (e) => {
    setTodo({
      task: e.target.value,
      isCompleted: false,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="todo-input">Add new task: </label>
      <input
        id="todo-input"
        type="text"
        placeholder="What are you up to?"
        onChange={handleChange}
        value={todo.task}
      ></input>
      <button>Add!</button>
    </form>
  );
}

export default NewTodoForm;
