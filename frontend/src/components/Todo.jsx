import React from "react";

// eslint-disable-next-line react/display-name
const Todo = React.memo(({ todos, makeItCompleted }) => {
  return (
    <>
      {todos?.map((todo) => (
        <div key={todo._id}>
          <h2>{todo.title}</h2>
          <p>{todo.description}</p>
          <button
            onClick={() => makeItCompleted(todo._id)}
            disabled={todo.completed}
          >
            {todo.completed ? "Completed" : "Mark as complete"}
          </button>
        </div>
      ))}
    </>
  );
});

export default Todo;
