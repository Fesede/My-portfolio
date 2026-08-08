import { useState, useEffect } from "react";
import ProjectModal from "./ProjectModal";
import "../assets/styles/main.css";

export default function Projects() {
  const [projectsList, setProjectsList] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then((res) => res.json())
      .then((data) => setProjectsList(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="section-title">My Projects</h2>
        <div className="project-grid">
          {projectsList.map((project) => (
            <div
              key={project.id}
              className="project-card"
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-card-image">
                <img
                  src={
                    project.imageUrl ||
                    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80"
                  }
                  alt={project.title}
                />
              </div>
              <div className="project-card-content">
                <h3>{project.title}</h3>
                <p>{project.description?.substring(0, 80)}...</p>
                <span className="view-details-link">Click to view details</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
