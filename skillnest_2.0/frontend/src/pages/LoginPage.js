import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loginType, setLoginType] = useState(""); // "customer" | "provider"
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [showPass, setShowPass]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const loggedIn = await login({ email, password });
      if (loggedIn.role === "provider") {
        navigate("/add-service");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Left panel — decorative */}
      <div className="auth-panel-left">
        <div className="auth-panel-content">
          <img src={logo} alt="SkillNest" className="auth-brand-logo" />
          <h2 className="auth-panel-heading">Welcome back to SkillNest</h2>
          <p className="auth-panel-sub">
            Connect with skilled professionals and trusted services in your community.
          </p>
          <div className="auth-features">
            <div className="auth-feature-item"><span>✦</span> Verified local professionals</div>
            <div className="auth-feature-item"><span>✦</span> Easy booking &amp; tracking</div>
            <div className="auth-feature-item"><span>✦</span> Community-powered reviews</div>
          </div>
        </div>
        <div className="auth-panel-blob" />
      </div>

      {/* Right panel — form */}
      <div className="auth-panel-right">
        <div className="auth-form-card">
          <div className="auth-form-header">
            <h3>Sign in</h3>
            <p>Choose how you want to continue</p>
          </div>

          {/* Role selection — Customer & Provider only */}
          {!loginType && (
            <div className="login-role-select">
              <button
                className="login-role-btn customer"
                onClick={() => setLoginType("customer")}
              >
                <span className="role-icon">📅</span>
                <span className="role-label">Book a Service</span>
                <span className="role-desc">Find and book local professionals</span>
              </button>
              <button
                className="login-role-btn provider"
                onClick={() => setLoginType("provider")}
              >
                <span className="role-icon">🛠️</span>
                <span className="role-label">Add a Service</span>
                <span className="role-desc">Offer your skills to the community</span>
              </button>
            </div>
          )}

          {loginType && (
            <>
              <div className="login-role-badge">
                {loginType === "customer" ? "📅 Signing in as Customer" : "🛠️ Signing in as Service Provider"}
                <button className="role-change-btn" onClick={() => { setLoginType(""); setError(""); }}>
                  Change
                </button>
              </div>

              {error && <div className="auth-error">{error}</div>}

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-field">
                  <label>Email address</label>
                  <div className="input-icon-wrap">
                    <span className="input-icon">✉</span>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <label>Password</label>
                  <div className="input-icon-wrap">
                    <span className="input-icon">🔒</span>
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="Your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="toggle-pass"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn-auth" disabled={loading}>
                  {loading ? <span className="auth-spinner" /> : "Sign In →"}
                </button>
              </form>

              <p className="auth-switch">
                Don't have an account?{" "}
                <Link to="/register">Create one free</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
