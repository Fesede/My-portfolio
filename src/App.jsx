import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Public Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

// Admin Components
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminAddProject from "./admin/AdminAddProject";
import AdminAddSkill from "./admin/AdminAddSkill";
import AdminContactMessages from "./admin/AdminContactMessages";

import "./assets/styles/main.css";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          {/* Main Portfolio Home Route */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Contact />
              </>
            }
          />

          {/* Admin Login Route */}
          <Route
            path="/admin"
            element={
              isAuthenticated ? (
                <Navigate to="/admin/dashboard" />
              ) : (
                <AdminLogin onLogin={() => setIsAuthenticated(true)} />
              )
            }
          />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              isAuthenticated ? <AdminDashboard /> : <Navigate to="/admin" />
            }
          />
          <Route
            path="/admin/add-project"
            element={
              isAuthenticated ? <AdminAddProject /> : <Navigate to="/admin" />
            }
          />
          <Route
            path="/admin/add-skill"
            element={
              isAuthenticated ? <AdminAddSkill /> : <Navigate to="/admin" />
            }
          />
          <Route
            path="/admin/messages"
            element={
              isAuthenticated ? (
                <AdminContactMessages />
              ) : (
                <Navigate to="/admin" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
