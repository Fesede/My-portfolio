import { useState } from "react";
import "../assets/styles/main.css";

export default function AdminDashboard() {
  // State for Project Form
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    projectLink: "",
  });

  // State for Skill Form
  const [skillData, setSkillData] = useState({
    name: "",
    percentage: "",
  });

  const [projectStatus, setProjectStatus] = useState("");
  const [skillStatus, setSkillStatus] = useState("");

  // Handle Project Form Changes
  const handleProjectChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  // Handle Skill Form Changes
  const handleSkillChange = (e) => {
    setSkillData({ ...skillData, [e.target.name]: e.target.value });
  };

  // Submit Project to Backend/Prisma
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        setProjectStatus("Project successfully uploaded to database!");
        setProjectData({
          title: "",
          description: "",
          imageUrl: "",
          projectLink: "",
        });
      } else {
        setProjectStatus("Failed to upload project.");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setProjectStatus("Error connecting to backend server.");
    }
  };

  // Submit Skill to Backend/Prisma
  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(skillData),
      });

      if (response.ok) {
        setSkillStatus("Skill successfully uploaded to database!");
        setSkillData({ name: "", percentage: "" });
      } else {
        setSkillStatus("Failed to upload skill.");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setSkillStatus("Error connecting to backend server.");
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Portfolio Admin Panel</h2>
        <p>Manage and upload portfolio projects and skills to your database.</p>
      </div>

      <div className="admin-grid">
        {/* Upload Project Form */}
        <div className="admin-card">
          <h3>Add New Project</h3>
          <form onSubmit={handleProjectSubmit}>
            <div className="form-group">
              <label>Project Title</label>
              <input
                type="text"
                name="title"
                value={projectData.title}
                onChange={handleProjectChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                rows="3"
                value={projectData.description}
                onChange={handleProjectChange}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                name="imageUrl"
                value={projectData.imageUrl}
                onChange={handleProjectChange}
              />
            </div>
            <div className="form-group">
              <label>Project Link</label>
              <input
                type="text"
                name="projectLink"
                value={projectData.projectLink}
                onChange={handleProjectChange}
              />
            </div>
            <button type="submit" className="btn-primary">
              Upload Project
            </button>
            {projectStatus && <p className="status-text">{projectStatus}</p>}
          </form>
        </div>

        {/* Upload Skill Form */}
        <div className="admin-card">
          <h3>Add New Skill</h3>
          <form onSubmit={handleSkillSubmit}>
            <div className="form-group">
              <label>Skill Name (e.g. React)</label>
              <input
                type="text"
                name="name"
                value={skillData.name}
                onChange={handleSkillChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Percentage (0 - 100)</label>
              <input
                type="number"
                name="percentage"
                value={skillData.percentage}
                onChange={handleSkillChange}
                required
              />
            </div>
            <button type="submit" className="btn-primary">
              Upload Skill
            </button>
            {skillStatus && <p className="status-text">{skillStatus}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
