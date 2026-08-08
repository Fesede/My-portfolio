import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// In-memory data storage (replaces the database)
let projects = [
  {
    id: 1,
    title: "Enterprise Logistics System",
    description:
      "A comprehensive transport management system engineered for tracking and logistics optimization.",
    projectLink: "https://github.com/",
  },
  {
    id: 2,
    title: "Event Management Platform",
    description:
      "Full-stack application built to coordinate events with customized employee management features.",
    projectLink: "https://github.com/",
  },
];

let skills = [
  { id: 1, name: "React", percentage: 90 },
  { id: 2, name: "JavaScript", percentage: 85 },
  { id: 3, name: "Node.js", percentage: 80 },
  { id: 4, name: "Tailwind CSS", percentage: 85 },
  { id: 5, name: "PostgreSQL", percentage: 75 },
];

let messages = [];

// API Routes
app.get("/api/projects", (req, res) => {
  res.json(projects);
});

app.get("/api/skills", (req, res) => {
  res.json(skills);
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  const newMessage = {
    id: Date.now(),
    name,
    email,
    message,
    createdAt: new Date(),
  };
  messages.push(newMessage);
  console.log("New contact message received:", newMessage);
  res
    .status(201)
    .json({ success: true, message: "Message sent successfully!" });
});

app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  // Simple hardcoded admin check
  if (username === "admin" && password === "securepassword123") {
    res.json({ success: true, token: "mock-jwt-token" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `Server is running smoothly on port ${PORT} (No database required!)`,
  );
});
