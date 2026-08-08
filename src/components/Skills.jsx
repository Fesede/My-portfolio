import { useState, useEffect } from "react";
import "../assets/styles/main.css";

export default function Skills() {
  const [skillsList, setSkillsList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/skills")
      .then((res) => res.json())
      .then((data) => setSkillsList(data))
      .catch((err) => console.error("Error fetching skills:", err));
  }, []);

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <h2 className="section-title">My Skills</h2>
        <div className="skills-grid">
          {skillsList.map((skill) => (
            <div key={skill.id} className="skill-card">
              <div className="skill-ring">
                <span className="skill-percentage">{skill.percentage}%</span>
              </div>
              <h3 className="skill-name">{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
