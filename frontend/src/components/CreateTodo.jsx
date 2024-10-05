import React, { useState } from "react";
import "../App.css";
import Toast from "./Toast";

export const CreateTodo = () => {
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [toastData, setToastData] = useState({ status: "", message: "" });
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log({ name, value });
    setNewTodo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch("http://localhost:3005/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Specify JSON body
        body: JSON.stringify(newTodo), // Send the updated newTodo object
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Todo created successfully:", data);
        setToastData({ status: "success", message: data.msg });
        setTimeout(() => {
          setToastData(null);
          // reloadonce to get the updated todos data
          location.reload();
        }, 1000);
        // handleCreateTodo(data); // Pass the created todo data to the parent component
      } else {
        console.error("Error creating todo:", data);
      }
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="todoForm">
        <input type="text" name="title" id="title" value={newTodo.title} onChange={handleChange} />
        <input type="text" name="description" id="description" value={newTodo.description} onChange={handleChange} />
        <button type="submit">add todo</button>
      </form>
      <Toast toastData={toastData} />
    </>
  );
};
