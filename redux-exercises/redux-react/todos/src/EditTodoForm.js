import React, { useState } from "react";

function EditTodoForm({ todo, edit, triggerState }) {
  const [newTodo, setNewTodo] = useState(todo);

  const handleSubmit = (e) => {
    e.preventDefault();
    edit(newTodo);
    triggerState();
  };

  const handleChange = (e) => {
    setNewTodo({ task: e.target.value, isCompleted: false });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="todo-input">Edit the task: </label>
      <input
        id="todo-input"
        type="text"
        placeholder="What are you up to?"
        onChange={handleChange}
        value={newTodo.task}
      ></input>
      <button>Edit!</button>
    </form>
  );
}

export default EditTodoForm;
