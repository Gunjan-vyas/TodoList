import React from "react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import "../App.css";

// eslint-disable-next-line react/display-name
const Todo = React.memo(({ todos, makeItCompleted }) => {
  // eslint-disable-next-line react/prop-types
  const completedTodo = todos.filter((todo) => todo.completed);
  // eslint-disable-next-line react/prop-types
  const todoItems = todos.filter((todo) => !todo.completed);

  const renderTodoItem = (todo, idx) => (
    <div key={todo._id + idx} className={`todo-card ${todo.completed ? "completed" : ""}`}>
      <div className="todo-header">
        <h2>{todo.title}</h2>
        <button onClick={() => makeItCompleted(todo._id)} disabled={todo.completed} className="complete-btn">
          {todo.completed ? <FaCheckCircle color="green" /> : <FaRegCircle />} {todo.completed ? "Completed" : "Mark as complete"}
        </button>
      </div>
      <p>{todo.description}</p>
    </div>
  );

  return (
    <div className="todo-container">
      <div className="todo-column">
        <h2>🕒 Pending</h2>
        {todoItems.map(renderTodoItem)}
      </div>
      <div className="todo-column">
        <h2>✅ Done</h2>
        {completedTodo.map(renderTodoItem)}
      </div>
    </div>
  );
});

export default Todo;
