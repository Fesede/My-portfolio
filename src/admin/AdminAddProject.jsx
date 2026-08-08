import { useState } from "react";
import "../assets/styles/main.css";

export default function AdminAddProject() {
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    projectLink: "",
  });

  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        setStatusMessage("Project successfully uploaded to database!");
        setProjectData({
          title: "",
          description: "",
          imageUrl: "",
          projectLink: "",
        });
      } else {
        setStatusMessage("Failed to upload project.");
      }
    } catch (error) {
      console.error(error);
      setStatusMessage("Error connecting to backend server.");
    }
  };

  return (
    <div className="admin-sub-section">
      <div className="admin-card">
        <h3>Add New Project</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Project Title</label>
            <input
              type="text"
              name="title"
              value={projectData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              rows="4"
              value={projectData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={projectData.imageUrl}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Project Link / Repository</label>
            <input
              type="text"
              name="projectLink"
              value={projectData.projectLink}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn-primary">
            Upload Project
          </button>
          {statusMessage && <p className="status-text">{statusMessage}</p>}
        </form>
      </div>
    </div>
  );
}
