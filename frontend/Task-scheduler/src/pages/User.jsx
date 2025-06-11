import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/User.css";

const User = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  return (
    <div className="user-container">
      <h2 className="user-title">👥 Registered Users</h2>

      {users.length === 0 ? (
        <p className="user-empty-text">No users have registered yet.</p>
      ) : (
        <ul className="user-list">
          {users.map((user, index) => (
            <li key={index} className="user-list-item">
              <span className="user-index">{index + 1}.</span> {user.name} — {user.email}
            </li>
          ))}
        </ul>
      )}

      <button onClick={() => navigate("/dashboard")} className="back-button">
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default User;
