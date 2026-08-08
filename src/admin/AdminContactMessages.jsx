import { useState, useEffect } from "react";
import "../assets/styles/main.css";

export default function AdminContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadMessages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/contact");
        if (isMounted) {
          if (response.ok) {
            const data = await response.json();
            setMessages(data);
          } else {
            setError("Failed to load messages from database.");
          }
        }
      } catch {
        if (isMounted) {
          setError("Error connecting to backend server.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadMessages();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="admin-sub-section">
      <div className="admin-card wide-card">
        <h3>Visitor Contact Messages</h3>
        <p className="admin-subtitle">
          Review inquiries sent from your portfolio contact form.
        </p>

        {loading && <p className="status-text">Loading messages...</p>}
        {error && <p className="status-text">{error}</p>}

        {!loading && !error && messages.length === 0 && (
          <p className="no-messages">No contact messages received yet.</p>
        )}

        <div className="messages-list">
          {messages.map((msg) => (
            <div key={msg.id} className="message-item">
              <div className="message-header">
                <strong>{msg.name}</strong>
                <span className="message-email">({msg.email})</span>
                <span className="message-date">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="message-body">{msg.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
