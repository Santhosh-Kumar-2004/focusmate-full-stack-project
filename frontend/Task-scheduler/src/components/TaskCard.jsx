import React from "react";
import "../styles/TaskCard.css";

const TaskCard = ({ task, onToggleComplete, onDelete }) => {
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const res = await fetch(`http://localhost:8000/tasks/${task.task_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Trying to delete task:", task.task_id);

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Delete failed");
      }

      onDelete(task.task_id); // tell parent to remove task from UI
    } catch (err) {
      alert(err.message || "Something went wrong while deleting");
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="task-card">
      <div className="task-details">
        <h2 className={`task-title ${task.isCompleted ? "completed" : ""}`}>
          {task.title}
        </h2>
        <p className="task-desc">{task.description}</p>
      </div>
      <div className="task-actions">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => onToggleComplete(task.id)}
          title="Mark as Completed"
        />
        <button onClick={handleDelete} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
