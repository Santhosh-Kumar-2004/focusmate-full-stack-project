import React, { useState } from "react";
import "../styles/AddTaskForm.css";

const AddTaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please fill in both title and description.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Task creation failed");
      }

      onAdd(data); // pass new task to parent
      setTitle("");
      setDescription("");
    } catch (err) {
      alert(err.message || "Something went wrong");
      console.error("Add task error:", err);
    }
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Task Title</label>
        <input
          id="title"
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
