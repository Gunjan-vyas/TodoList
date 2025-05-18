// App.js
import { useEffect, useState, useCallback } from "react";
import { CreateTodo } from "./components/CreateTodo";
import Todo from "./components/Todo";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = useCallback(async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/todos`);
      const data = await res.json();
      // Show newest todos at top
      setTodos(data.allTodos.reverse());
    } catch (err) {
      console.error(err);
    }
  }, []);

  const makeItCompleted = useCallback(async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/completed`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();

      if (response.ok) {
        setTodos((prevTodos) => prevTodos.map((todo) => (todo._id === id ? { ...todo, completed: true } : todo)));
      } else {
        console.error("Error updating todo:", data);
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="app-container">
      <h1 className="app-title">📝 My Todos</h1>
      <CreateTodo onTodoCreated={fetchTodos} />
      <Todo todos={todos} makeItCompleted={makeItCompleted} />
    </div>
  );
}

export default App;
