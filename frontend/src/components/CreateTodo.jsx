import React, { useState } from "react";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// eslint-disable-next-line react/display-name, react/prop-types
export const CreateTodo = React.memo(({ onTodoCreated }) => {
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });

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
        toast.success(data.msg);
        onTodoCreated();
        setNewTodo({ title: "", description: "" });
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.error("Error creating todo:", error);
      toast.error("Failed to create todo");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="todoForm">
        <input type="text" required name="title" value={newTodo.title} onChange={handleChange} />
        <input type="text" required name="description" value={newTodo.description} onChange={handleChange} />
        <button type="submit">Add Todo</button>
      </form>
      <ToastContainer />
    </>
  );
});
