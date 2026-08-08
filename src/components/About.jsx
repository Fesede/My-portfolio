import "react";
import "../assets/styles/main.css";

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Hello! I am{" "}
              <span className="highlight-name">Dereje Sebsibe Taddesse</span>, a
              passionate college student pursuing a diploma and specializing in
              front-end web development, web design, and software creation.
            </p>
            <p>
              I enjoy turning complex challenges into clean, responsive, and
              intuitive web applications. My technical toolkit includes working
              with modern frameworks, styling tools, backend data scripts, and
              database management to build fully functional digital solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
