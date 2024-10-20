import { useEffect, useState, useCallback } from "react";
import { CreateTodo } from "./components/CreateTodo";
import Todo from "./components/Todo";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = useCallback(async () => {
    try {
      const res = await fetch(`${process.env.BACKEND_URL}/todos`);
      const data = await res.json();
      setTodos(data.allTodos);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const makeItCompleted = useCallback(async (id) => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/completed`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();

      if (response.ok) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, completed: true } : todo
          )
        );
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
    <>
      <CreateTodo onTodoCreated={fetchTodos} />
      <Todo todos={todos} makeItCompleted={makeItCompleted} />
    </>
  );
}

export default App;
