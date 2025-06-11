import React from "react";
import "../styles/TimeSlotsView.css";

const TimeSlotsView = ({ tasks }) => {
  return (
    <div className="timeline-container">
      <h2 className="timeline-heading">Task Timeline</h2>
      {tasks.length === 0 ? (
        <p className="timeline-empty">No tasks scheduled yet.</p>
      ) : (
        <ul className="timeline-list">
          {tasks.map((task, idx) => (
            <li key={idx} className="timeline-item">
              <span className="time-slot">{task.startTime || "Unscheduled"}</span>
              <span className="task-name">{task.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TimeSlotsView;
