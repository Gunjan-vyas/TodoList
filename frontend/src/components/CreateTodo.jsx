import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPlus } from "react-icons/fa";
import "../App.css";

// eslint-disable-next-line react/display-name
export const CreateTodo = React.memo(({ onTodoCreated }) => {
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTodo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/todo`, {
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
      toast.error("Failed to create todo");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="todo-form">
        <input type="text" required name="title" placeholder="Title" value={newTodo.title} onChange={handleChange} />
        <input type="text" required name="description" placeholder="Description" value={newTodo.description} onChange={handleChange} />
        <button type="submit" className="add-btn">
          <FaPlus /> Add
        </button>
      </form>
      <ToastContainer />
    </>
  );
});
