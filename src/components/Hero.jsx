import "react";
import photo from "../assets/photo.jpg";
import "../assets/styles/main.css";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <span className="welcome-tag">WELCOME TO MY PORTFOLIO</span>
        <h1>
          Hello, my name is <span className="highlight-name">Dereje</span>.
        </h1>
        <p className="hero-description">
          Front-End Web Developer & Web Designer. I build responsive websites
          and web applications with clean design and interactive user
          experiences.
        </p>
        <div className="hero-buttons">
          <a href="#contact" className="btn-primary">
            Download CV
          </a>
          <a href="#projects" className="btn-secondary">
            See My Work
          </a>
        </div>
      </div>

      <div className="hero-image-container">
        <img src={photo} alt="Dereje Sebsibe" className="hero-profile-photo" />
      </div>
    </section>
  );
}
