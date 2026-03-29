import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

const SKILLS = [
  "Cleaning", "Plumbing", "Electrical", "Carpentry",
  "Painting", "Gardening", "Cooking", "Tutoring",
  "Photography", "Mechanic", "Other",
];

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [roleChoice, setRoleChoice] = useState(""); // "customer" | "provider"
  const [form, setForm]             = useState({ name: "", email: "", password: "", skill: "" });
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [showPass, setShowPass]     = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== confirmPass) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await register({ ...form, role: roleChoice });
      if (roleChoice === "provider") {
        navigate("/add-service");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Left panel */}
      <div className="auth-panel-left register-panel">
        <div className="auth-panel-content">
          <img src={logo} alt="SkillNest" className="auth-brand-logo" />
          <h2 className="auth-panel-heading">Join the SkillNest community</h2>
          <p className="auth-panel-sub">
            Offer your skills to your neighbours or find the right professional for every job.
          </p>
          <div className="auth-features">
            <div className="auth-feature-item"><span>✦</span> List your skills for free</div>
            <div className="auth-feature-item"><span>✦</span> Get discovered locally</div>
            <div className="auth-feature-item"><span>✦</span> Build your reputation</div>
          </div>
        </div>
        <div className="auth-panel-blob" />
      </div>

      {/* Right panel — form */}
      <div className="auth-panel-right">
        <div className="auth-form-card">
          <div className="auth-form-header">
            <h3>Create account</h3>
            <p>Choose your account type to get started</p>
          </div>

          {/* Role selection */}
          {!roleChoice && (
            <div className="login-role-select">
              <button
                className="login-role-btn customer"
                onClick={() => setRoleChoice("customer")}
              >
                <span className="role-icon">📅</span>
                <span className="role-label">I want to Book Services</span>
                <span className="role-desc">Browse and book local professionals</span>
              </button>
              <button
                className="login-role-btn provider"
                onClick={() => setRoleChoice("provider")}
              >
                <span className="role-icon">🛠️</span>
                <span className="role-label">I want to Add Services</span>
                <span className="role-desc">Offer your skills and get hired</span>
              </button>
            </div>
          )}

          {roleChoice && (
            <>
              <div className="login-role-badge">
                {roleChoice === "customer" ? "📅 Registering as Customer" : "🛠️ Registering as Service Provider"}
                <button className="role-change-btn" onClick={() => { setRoleChoice(""); setError(""); }}>
                  Change
                </button>
              </div>

              {error && <div className="auth-error">{error}</div>}

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-row">
                  <div className="auth-field">
                    <label>Full Name *</label>
                    <div className="input-icon-wrap">
                      <span className="input-icon">👤</span>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={set("name")}
                        required
                      />
                    </div>
                  </div>

                  <div className="auth-field">
                    <label>Email *</label>
                    <div className="input-icon-wrap">
                      <span className="input-icon">✉</span>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={set("email")}
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>
                </div>

                {roleChoice === "provider" && (
                  <div className="auth-field">
                    <label>Your Skill / Profession</label>
                    <div className="input-icon-wrap">
                      <span className="input-icon">🛠</span>
                      <select
                        value={form.skill}
                        onChange={set("skill")}
                        className="auth-select"
                      >
                        <option value="">Select your skill (optional)</option>
                        {SKILLS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <div className="auth-row">
                  <div className="auth-field">
                    <label>Password *</label>
                    <div className="input-icon-wrap">
                      <span className="input-icon">🔒</span>
                      <input
                        type={showPass ? "text" : "password"}
                        placeholder="Min 6 characters"
                        value={form.password}
                        onChange={set("password")}
                        required
                        autoComplete="new-password"
                      />
                      <button type="button" className="toggle-pass" onClick={() => setShowPass(!showPass)}>
                        {showPass ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  <div className="auth-field">
                    <label>Confirm Password *</label>
                    <div className="input-icon-wrap">
                      <span className="input-icon">🔒</span>
                      <input
                        type={showPass ? "text" : "password"}
                        placeholder="Repeat password"
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn-auth" disabled={loading}>
                  {loading ? <span className="auth-spinner" /> : "Create Account →"}
                </button>
              </form>

              <p className="auth-switch">
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
