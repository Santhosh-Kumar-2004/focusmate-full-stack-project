import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Headers from "../components/Headers";
import "../styles/Register.css";

function isStrictValidEmail(email) {
  const emailRegex = /^[^\s@]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) return false;
  const domain = email.split("@")[1];
  const parts = domain.split(".");
  return !(parts.length >= 2 && parts[parts.length - 1] === parts[parts.length - 2]);
}

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (!isStrictValidEmail(email)) {
      setError("Invalid email address");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Registration failed");
      }

      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <>
      <Headers />
      <div className="register-page">
        <div className="register-box">
          <h2>Create an Account</h2>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button type="submit">Register</button>
          </form>

          <p className="login-text">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} className="link">
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
