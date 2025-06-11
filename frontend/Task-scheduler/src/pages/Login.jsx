import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Headers from "../components/Headers";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Login failed");
      }

      // Store token
      localStorage.setItem("token", data.access_token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <>
      <Headers />
      <div className="login-page">
        <div className="login-box">
          <h2 className="LoginTitle">Login to FocusMate</h2>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleLogin}>
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

            <button type="submit">Login</button>
          </form>

          <p className="register-text">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/register")} className="link">
              Register
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
