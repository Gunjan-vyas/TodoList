import React, { useState } from "react";
import "../App.css";
import Toast from "./Toast";

// eslint-disable-next-line react/display-name, react/prop-types
export const CreateTodo = React.memo(({ onTodoCreated }) => {
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [toastData, setToastData] = useState({ status: "", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTodo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/todo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });

      const data = await response.json();

      if (response.ok) {
        setToastData({ status: "success", message: data.msg });
        setTimeout(() => setToastData(null), 1000);
        onTodoCreated();
        setNewTodo({ title: "", description: "" });
      } else {
        setToastData({ status: "error", message: data.msg });
      }
    } catch (error) {
      console.error("Error creating todo:", error);
      setToastData({ status: "error", message: "Failed to create todo" });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="todoForm">
        <input type="text" name="title" value={newTodo.title} onChange={handleChange} />
        <input type="text" name="description" value={newTodo.description} onChange={handleChange} />
        <button type="submit">Add Todo</button>
      </form>
      <Toast toastData={toastData} />
    </>
  );
});
