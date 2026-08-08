import { useState } from "react";
import "../assets/styles/main.css";

export default function AdminAddSkill() {
  const [skillData, setSkillData] = useState({
    name: "",
    percentage: "",
  });

  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    setSkillData({ ...skillData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: skillData.name,
          percentage: Number(skillData.percentage),
        }),
      });

      if (response.ok) {
        setStatusMessage("Skill successfully uploaded to database!");
        setSkillData({ name: "", percentage: "" });
      } else {
        setStatusMessage("Failed to upload skill.");
      }
    } catch {
      setStatusMessage("Error connecting to backend server.");
    }
  };

  return (
    <div className="admin-sub-section">
      <div className="admin-card">
        <h3>Add New Skill</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Skill Name (e.g., JavaScript)</label>
            <input
              type="text"
              name="name"
              value={skillData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Percentage (0 - 100)</label>
            <input
              type="number"
              name="percentage"
              min="0"
              max="100"
              value={skillData.percentage}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Upload Skill
          </button>
          {statusMessage && <p className="status-text">{statusMessage}</p>}
        </form>
      </div>
    </div>
  );
}
