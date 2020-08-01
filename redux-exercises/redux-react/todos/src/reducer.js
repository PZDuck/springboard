import uuid from "uuid/v4";

const INITIAL_STATE = {
  todos: [],
};

function reducer(state = INITIAL_STATE, action) {
  if (action.type === "ADD_TODO") {
    return {
      ...state,
      todos: [
        ...state.todos,
        {
          task: action.todo.task,
          isCompleted: action.todo.isCompleted,
          id: uuid(),
        },
      ],
    };
  }

  if (action.type === "UPDATE_TODO") {
    const todos = state.todos.map((todo) => {
      if (todo.id === action.id) {
        return {
          ...todo,
          task: action.newTodo.task,
          isCompleted: action.newTodo.isCompleted,
        };
      }
      return todo;
    });

    return {
      ...state,
      todos,
    };
  }
  if (action.type === "REMOVE_TODO") {
    return {
      ...state,
      todos: state.todos.filter((todo) => todo.id !== action.id),
    };
  }
  if (action.type === "MARK_COMPLETED") {
    const todos = state.todos.map((todo) => {
      if (todo.id === action.id) {
        return { ...todo, isCompleted: true };
      }
      return todo;
    });

    return {
      ...state,
      todos,
    };
  }
  return state;

  // Wrong, for some reason

  //   switch (action.type) {
  //     case "ADD_TODO":
  //       return {
  //         ...state,
  //         todos: [
  //           ...state.todos,
  //           {
  //                task: action.todo.task,
  //                isCompleted: action.todo.isCompleted,
  //                id: uuid(),
  //           },
  //         ],
  //       };

  //     case "UPDATE_TODO":
  //       let todos = state.todos.map((todo) => {
  //         if (todo.id === action.id) {
  //           return {
  //             ...todo,
  //             task: action.newTodo.task,
  //             isCompleted: action.newTodo.isCompleted,
  //           };
  //         }
  //         return todo;
  //       });
  //       return {
  //         ...state,
  //         todos,
  //       };

  //     case "REMOVE_TODO":
  //       return {
  //         ...state,
  //         todos: state.todos.filter((todo) => todo.id !== action.id),
  //       };

  //     case "MARK_COMPLETED":
  // todos = state.todos.map((todo) => {
  //   if (todo.id === action.id) {
  //     return { ...todo, isCompleted: true };
  //   }
  //   return todo;
  // });

  // return {
  //   ...state,
  //   todos,
  // };

  //     default:
  //       return state;
  //   }
}

export default reducer;
