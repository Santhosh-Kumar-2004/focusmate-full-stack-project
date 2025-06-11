import React from "react";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks, onToggleComplete, onDelete }) => {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.task_id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
