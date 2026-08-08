import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import process from "process";

dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// ==================== PROJECTS API ====================

// GET: Fetch all projects
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(projects);
  } catch {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// POST: Add a new project (Admin)
app.post("/api/projects", async (req, res) => {
  const { title, description, imageUrl, projectLink } = req.body;
  try {
    const newProject = await prisma.project.create({
      data: { title, description, imageUrl, projectLink },
    });
    res.json({ success: true, project: newProject });
    // eslint-disable-next-line no-unused-vars
  } catch (_) {
    res.status(500).json({ error: "Failed to create project" });
  }
});

// ==================== SKILLS API ====================

// GET: Fetch all skills
app.get("/api/skills", async (req, res) => {
  try {
    const skills = await prisma.skill.findMany();
    res.json(skills);
    // eslint-disable-next-line no-unused-vars
  } catch (_) {
    res.status(500).json({ error: "Failed to fetch skills" });
  }
});

// POST: Add a new skill (Admin)
app.post("/api/skills", async (req, res) => {
  const { name, percentage } = req.body;
  try {
    const newSkill = await prisma.skill.create({
      data: { name, percentage: Number(percentage) },
    });
    res.json({ success: true, skill: newSkill });
    // eslint-disable-next-line no-unused-vars
  } catch (_) {
    res.status(500).json({ error: "Failed to create skill" });
  }
});

// ==================== CONTACT MESSAGES API ====================

// GET: Fetch all contact messages (Admin)
app.get("/api/contact", async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(messages);
    // eslint-disable-next-line no-unused-vars
  } catch (_) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// POST: Submit a contact form message (Visitor)
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await prisma.contactMessage.create({
      data: { name, email, message },
    });
    res.json({ success: true, message: "Message sent successfully" });
    // eslint-disable-next-line no-unused-vars
  } catch (_) {
    res.status(500).json({ error: "Failed to send message" });
  }
});

// ==================== ADMIN LOGIN API ====================

// POST: Admin Login verification
app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (admin && admin.password === password) {
      res.json({ success: true, message: "Login successful" });
    } else {
      res
        .status(401)
        .json({ success: false, error: "Invalid username or password" });
    }
    // eslint-disable-next-line no-unused-vars
  } catch (_) {
    res.status(500).json({ error: "Server error during login" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
