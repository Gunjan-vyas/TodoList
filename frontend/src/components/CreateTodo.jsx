import React from "react";
import "../App.css";

export const CreateTodo = () => {
  return (
    <form onSubmit={"/todo"} id="todoForm">
      <input type="text" name="tilte" id="tilte" />
      <input type="text" name="description" id="description" />
      <button>add todo</button>
    </form>
  );
};
