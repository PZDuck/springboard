import React from "react";
import { useSelector, useDispatch } from "react-redux";
import NewTodoForm from "./NewTodoForm";
import Todo from "./Todo";

function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const addTodo = (todo) => {
    dispatch({ type: "ADD_TODO", todo });
  };

  const removeTodo = (id) => {
    dispatch({ type: "REMOVE_TODO", id });
  };

  const editTodo = (id, newTodo) => {
    dispatch({ type: "UPDATE_TODO", id, newTodo });
  };

  const markCompleted = (id) => {
    dispatch({ type: "MARK_COMPLETED", id });
  };

  return (
    <div>
      <NewTodoForm addTodo={addTodo} />
      <ul>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            todo={todo}
            remove={() => removeTodo(todo.id)}
            edit={(newTodo) => editTodo(todo.id, newTodo)}
            mark={() => markCompleted(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
