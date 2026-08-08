import "react";
import "../assets/styles/main.css";

export default function ProjectModal({ project, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        {project.projectLink && (
          <div className="modal-action">
            <a
              href={project.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              View Project Link
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
