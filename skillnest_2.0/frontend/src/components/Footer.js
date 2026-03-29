import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="skillnest-footer">
      <div className="container">
        <div className="footer-grid">

          <div className="footer-brand">
            <img src={logo} alt="SkillNest" className="footer-logo" />
            <h5>SkillNest</h5>
            <p>A community platform where people share skills and help each other grow.</p>
          </div>

          <div className="footer-links">
            <h5>Quick Links</h5>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/add-service">Add Service</Link></li>
              <li><Link to="/reviews">Reviews</Link></li>
              <li><Link to="/bookings">Bookings</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h5>Contact</h5>
            <p>✉️ support@skillnest.com</p>
            <p>📞 +91 9876543210</p>
            <div className="footer-socials">
              <a href="#!" aria-label="Twitter">𝕏</a>
              <a href="#!" aria-label="Instagram">📸</a>
              <a href="#!" aria-label="LinkedIn">💼</a>
            </div>
          </div>

        </div>

        <hr className="footer-divider" />

        <p className="footer-copy">
          © 2026 SkillNest · Community Service Exchange Platform
        </p>
      </div>
    </footer>
  );
}

export default Footer;