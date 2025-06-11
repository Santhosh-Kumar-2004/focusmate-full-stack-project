import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AddTaskForm from "../components/AddTaskForm";
import TaskList from "../components/TaskList";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchTasks();
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:8000/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch tasks");

      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err.message);
      alert("Session expired. Please login again.");
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const addTask = async (taskData) => {
    try {
      const res = await fetch("http://localhost:8000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });

      if (!res.ok) throw new Error("Task creation failed");
      await fetchTasks();
    } catch (err) {
      console.error(err.message);
      alert("Failed to add task.");
    }
  };

  const deleteTask = async (taskId) => {
  try {
    const res = await fetch(`http://localhost:8000/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Task deletion failed");

    // Corrected filtering
    setTasks(tasks.filter((task) => task.task_id !== taskId));
  } catch (err) {
    console.error(err.message);
    alert("Failed to delete task.");
  }
};


  return (
    <div className="dashboard-container">
      <Header />
      <main className="dashboard-main">
        <AddTaskForm onAdd={addTask} />
        <TaskList tasks={tasks} onDelete={deleteTask} />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
