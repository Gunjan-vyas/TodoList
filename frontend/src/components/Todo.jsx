import React from "react";

// eslint-disable-next-line react/display-name
const Todo = React.memo(({ todos, makeItCompleted }) => {
  // eslint-disable-next-line react/prop-types
  let completedTodo = todos.filter((todo) => todo.completed);
  // eslint-disable-next-line react/prop-types
  let Todo = todos.filter((todo) => !todo.completed);
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div>
        <h1>Todo</h1>
        {Todo?.map((todo, idx) => (
          <div key={todo._id + idx}>
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
            <div>
              <button onClick={() => makeItCompleted(todo._id)} disabled={todo.completed}>
                {todo.completed ? "Completed" : "Mark as complete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h1>Done</h1>
        {completedTodo?.map((todo, idx) => (
          <div key={todo._id + idx}>
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
            <div>
              <button onClick={() => makeItCompleted(todo._id)} disabled={todo.completed}>
                {todo.completed ? "Completed" : "Mark as complete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Todo;
