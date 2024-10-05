import { useEffect, useState } from "react";
import "./App.css";
import { CreateTodo } from "./components/CreateTodo";
import Todo from "./components/Todo";
const mockedTodos = [
  { title: "SomeTaskk", description: "some descriptoin1", completed: true },
  { title: "SomeTask2", description: "some descriptoin2", completed: true },
];
function App() {
  const [todos, setTodos] = useState();

  const fetchTodos = async () => {
    fetch("http://localhost:3005/todos")
      .then(async (res) => {
        console.log(res);
        return await res.json();
      })
      .then((data) => {
        setTodos(data.allTodos);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const makeItCompleted = async (e) => {
    let id = e.target.id;
    // let value = e.target.value;
    // send !value
    console.log(id);
    console.log({ e });
    try {
      const response = await fetch("http://localhost:3005/completed", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await response.json(id);

      if (response.ok) {
        console.log("Todo updated successfully:", data);
        location.reload();
      } else {
        console.error("Error updating todo:", data);
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <>
      <CreateTodo />
      <Todo todos={todos} makeItCompleted={makeItCompleted} />
    </>
  );
}

export default App;
