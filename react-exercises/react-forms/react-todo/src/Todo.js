import React, { useState } from "react";
import EditTodoForm from "./EditTodoForm";

function Todo({ id, todo, remove, edit, mark }) {
  const [isEditState, setIsEditState] = useState(false);

  const triggerEditState = () => {
    setIsEditState(!isEditState);
  };

  return (
    <li data-id={id}>
      {todo.isCompleted ? <s>{todo.task}</s> : todo.task}{" "}
      <button onClick={triggerEditState}>Change Me</button> OR{" "}
      <button onClick={remove}>Remove Me!</button> OR{" "}
      <button onClick={mark}>Mark Me Completed!</button>
      {isEditState && (
        <EditTodoForm todo={todo} edit={edit} triggerState={triggerEditState} />
      )}
    </li>
  );
}

export default Todo;
