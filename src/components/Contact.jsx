import { useState } from "react";
import "../assets/styles/main.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setSubmitted(true);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="section-title">Contact & Manager</h2>
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>
              Let's collaborate on front-end web design, applications, or
              database-driven projects.
            </p>
            <div className="info-details">
              <p>
                <strong>Name:</strong> Dereje Sebsibe Taddesse
              </p>
              <p>
                <strong>Email:</strong> deregood29@gmail.com
              </p>
              <p>
                <strong>Location:</strong> Addis Ababa, Ethiopia
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            {submitted ? (
              <div className="success-message">
                <p>Thank you! Your message has been sent successfully.</p>
              </div>
            ) : (
              <>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary">
                  Send Message
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
