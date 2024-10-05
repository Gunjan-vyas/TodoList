import React from "react";

const Todo = ({ todos, makeItCompleted }) => {
  return (
    <>
      {todos?.map((todo, i) => (
        <div key={i}>
          <h2>{todo.title}</h2>
          <p>{todo.description}</p>
          <button onClick={makeItCompleted} id={todo._id} value={todo.completed}>
            {todo.completed ? "completed" : "Mark as complete"}
          </button>
        </div>
      ))}
    </>
  );
};

export default Todo;
