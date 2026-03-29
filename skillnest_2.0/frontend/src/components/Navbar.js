import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

function Navbar({ darkMode, setDarkMode }) {
  const { user, logout, isProvider, isCustomer } = useAuth();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [dropOpen, setDropOpen]   = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const close = () => setDropOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  // Build nav links based on role
  const navLinks = [];

  if (!user) {
    // Guest — show nothing except auth buttons
  } else if (false) {
    navLinks.push(
      { to: "/",            label: "Home" },
      { to: "/add-service", label: "Add Service" },
      { to: "/reviews",     label: "Reviews" },
      { to: "/bookings",    label: "All Bookings" },
    );
  } else if (isProvider) {
    navLinks.push(
      { to: "/add-service", label: "Add Service" },
      { to: "/reviews",     label: "Reviews" },
    );
  } else if (isCustomer) {
    navLinks.push(
      { to: "/",         label: "Home" },
      { to: "/bookings", label: "My Bookings" },
      { to: "/reviews",  label: "Reviews" },
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
    setDropOpen(false);
    setMenuOpen(false);
  };

  const roleBadgeLabel = false ? "Admin" : isProvider ? "Provider" : "Customer";
  const roleBadgeClass = false ? "badge-admin" : isProvider ? "badge-provider" : "badge-customer";

  return (
    <nav className={`skillnest-navbar${scrolled ? " scrolled" : ""}`}>
      <div className="nav-container">

        {/* Brand */}
        <Link className="nav-brand" to="/" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="SkillNest" className="nav-logo" />
          <span className="nav-title">SkillNest</span>
        </Link>

        {/* Hamburger */}
        <button
          className={`hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        {/* Links */}
        <div className={`nav-links${menuOpen ? " open" : ""}`}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link${location.pathname === link.to ? " active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="nav-divider" />

          {user ? (
            <div
              className="user-menu"
              onClick={(e) => { e.stopPropagation(); setDropOpen(!dropOpen); }}
            >
              <div className="user-avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="user-name">{user.name.split(" ")[0]}</span>
              <span className={`role-badge ${roleBadgeClass}`}>{roleBadgeLabel}</span>
              <span className="user-chevron">{dropOpen ? "▲" : "▼"}</span>

              {dropOpen && (
                <div className="user-dropdown">
                  <div className="dropdown-header">
                    <strong>{user.name}</strong>
                    <small>{user.email}</small>
                    {user.skill && <span className="dropdown-skill">🛠 {user.skill}</span>}
                    <span className={`dropdown-role ${roleBadgeClass}`}>{roleBadgeLabel}</span>
                  </div>
                  <button className="dropdown-item logout-btn" onClick={handleLogout}>
                    🚪 Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="nav-auth-btns">
              <Link to="/login" className="btn-nav-login" onClick={() => setMenuOpen(false)}>
                Sign In
              </Link>
              <Link to="/register" className="btn-nav-register" onClick={() => setMenuOpen(false)}>
                Join Free
              </Link>
            </div>
          )}

          {/* Dark mode toggle */}
          <button
            className="dark-toggle"
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? "Light Mode" : "Dark Mode"}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
