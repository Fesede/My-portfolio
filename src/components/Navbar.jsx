import "react";
import { Link } from "react-router-dom";
import "../assets/styles/main.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo-text">
        DEREJE SEBSIBE
      </Link>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <a href="/#about">About</a>
        </li>
        <li>
          <a href="/#projects">Projects</a>
        </li>
        <li>
          <a href="/#skills">Skills</a>
        </li>
        <li>
          <a href="/#contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
}
