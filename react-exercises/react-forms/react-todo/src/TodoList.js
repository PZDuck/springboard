import React, { useState } from "react";
import NewTodoForm from "./NewTodoForm";
import Todo from "./Todo";

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((t) => id !== todos.indexOf(t)));
  };

  const editTodo = (id, newTodo) => {
    setTodos(
      todos.map((t, i) => {
        if (i === id) t = newTodo;
        return t;
      })
    );
  };

  const markCompleted = (id) => {
    setTodos(
      todos.map((t, i) => {
        if (i === id) t.isCompleted = !t.isCompleted;
        return t;
      })
    );
  };

  return (
    <div>
      <NewTodoForm addTodo={addTodo} />
      <ul>
        {todos.map((todo, idx) => (
          <Todo
            key={idx}
            id={idx}
            todo={todo}
            remove={() => removeTodo(idx)}
            edit={(newTodo) => editTodo(idx, newTodo)}
            mark={() => markCompleted(idx)}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
