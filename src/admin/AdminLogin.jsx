import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/main.css";

export default function AdminLogin({ onLogin }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onLogin();
        navigate("/admin/dashboard");
      } else {
        setError(data.error || "Invalid username or password.");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Error connecting to backend server.");
    }
  };

  return (
    <div className="admin-sub-section">
      <div className="admin-card">
        <h3>Admin Login</h3>
        <p className="admin-subtitle">
          Enter your database credentials to access the management dashboard.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Log In
          </button>
          {error && <p className="status-text">{error}</p>}
        </form>
      </div>
    </div>
  );
}
