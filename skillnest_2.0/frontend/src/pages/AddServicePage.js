import React, { useEffect, useState } from "react";
import AddService from "../components/AddService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const STATUS_COLORS = {
  "Pending":   "#f59e0b",
  "Accepted":  "#22c55e",
  "Rejected":  "#ef4444",
  "Completed": "#3b82f6",
};

function ProviderBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line
  }, []);

  const fetchBookings = () => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/bookings?providerId=${user._id}`)
      .then((res) => { setBookings(res.data); setLoading(false); })
      .catch((err) => { console.error(err); setLoading(false); });
  };

  const handleStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/bookings/${id}/status`, { status });
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="services-loading">
        <div className="spinner" />
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="services-empty">
        <span>📋</span>
        <p>No bookings yet for your services.</p>
      </div>
    );
  }

  // ── Revenue summary ──────────────────────────────────────────────
  const totalRevenue    = bookings.reduce((s, b) => s + (b.serviceRate || 0), 0);
  const earnedRevenue   = bookings
    .filter((b) => b.status === "Completed")
    .reduce((s, b) => s + (b.serviceRate || 0), 0);
  const pendingRevenue  = bookings
    .filter((b) => b.status === "Pending" || b.status === "Accepted")
    .reduce((s, b) => s + (b.serviceRate || 0), 0);
  // ─────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Revenue summary bar ───────────────────────────────── */}
      <div className="bookings-summary-bar" style={{ marginBottom: "20px" }}>
        <div className="summary-pill">
          <span className="summary-icon">📋</span>
          <span className="summary-text">{bookings.length} Booking{bookings.length !== 1 ? "s" : ""}</span>
        </div>
        <div className="summary-pill">
          <span className="summary-icon">💰</span>
          <span className="summary-text">Total: <strong>₹{totalRevenue.toLocaleString("en-IN")}</strong></span>
        </div>
        <div className="summary-pill summary-paid">
          <span className="summary-icon">✅</span>
          <span className="summary-text">Earned: <strong>₹{earnedRevenue.toLocaleString("en-IN")}</strong></span>
        </div>
        {pendingRevenue > 0 && (
          <div className="summary-pill" style={{ borderColor: "#f59e0b55", background: "#fef9c355" }}>
            <span className="summary-icon">⏳</span>
            <span className="summary-text">Pending: <strong style={{ color: "#b45309" }}>₹{pendingRevenue.toLocaleString("en-IN")}</strong></span>
          </div>
        )}
      </div>
      {/* ──────────────────────────────────────────────────────── */}

      <div className="bookings-grid">
        {bookings.map((b, i) => {
          const color     = STATUS_COLORS[b.status] || "#8a6070";
          const isPending = !b.status || b.status === "Pending";
          const rate      = b.serviceRate || 0;

          return (
            <div key={b._id} className="booking-card">
              <div className="booking-number">#{i + 1}</div>
              <h5 className="booking-service">{b.serviceName}</h5>

              {/* ── Amount chip ───────────────────────────────── */}
              {rate > 0 && (
                <div className="booking-amount-chip">
                  <span>💳</span>
                  <span className="amount-value">₹{rate.toLocaleString("en-IN")}</span>
                  <span className="amount-label">service charge</span>
                </div>
              )}
              {/* ─────────────────────────────────────────────── */}

              <div className="booking-details">
                <p><span>👤</span> <strong>{b.userName}</strong></p>
                {b.flatNo && <p><span>🏢</span> Flat: {b.flatNo}</p>}
                {b.doorNo && <p><span>🚪</span> Door: {b.doorNo}</p>}
                {b.date && (
                  <p>
                    <span>📅</span>{" "}
                    {new Date(b.date).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
                  </p>
                )}
              </div>

              <span
                className="booking-status"
                style={{
                  background: color + "22",
                  color,
                  border: `1px solid ${color}`,
                  display: "inline-block",
                  marginBottom: "12px",
                }}
              >
                {b.status || "Pending"}
              </span>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {isPending && (
                  <>
                    <button
                      className="btn-book"
                      style={{ background: "#22c55e", border: "none", color: "#fff", padding: "6px 14px", borderRadius: "8px", cursor: "pointer" }}
                      onClick={() => handleStatus(b._id, "Accepted")}
                    >
                      ✅ Accept
                    </button>
                    <button
                      className="btn-cancel"
                      style={{ background: "#ef4444", border: "none", color: "#fff", padding: "6px 14px", borderRadius: "8px", cursor: "pointer" }}
                      onClick={() => handleStatus(b._id, "Rejected")}
                    >
                      ❌ Reject
                    </button>
                  </>
                )}
                {b.status === "Accepted" && (
                  <button
                    className="btn-book"
                    style={{ background: "#3b82f6", border: "none", color: "#fff", padding: "6px 14px", borderRadius: "8px", cursor: "pointer" }}
                    onClick={() => handleStatus(b._id, "Completed")}
                  >
                    🏁 Mark Completed
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function AddServicePage() {
  const { user, isProvider } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("add");

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    if (!isProvider) { navigate("/"); }
  }, [user, isProvider, navigate]);

  if (!user || !isProvider) return null;

  return (
    <div>
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
        <button
          onClick={() => setActiveTab("add")}
          style={{
            padding: "10px 24px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            background: activeTab === "add" ? "var(--accent, #8b5cf6)" : "var(--card-bg, #f3f4f6)",
            color: activeTab === "add" ? "#fff" : "inherit",
            transition: "all 0.2s",
          }}
        >
          ➕ Add Service
        </button>
        <button
          onClick={() => setActiveTab("bookings")}
          style={{
            padding: "10px 24px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            background: activeTab === "bookings" ? "var(--accent, #8b5cf6)" : "var(--card-bg, #f3f4f6)",
            color: activeTab === "bookings" ? "#fff" : "inherit",
            transition: "all 0.2s",
          }}
        >
          📋 My Bookings
        </button>
      </div>

      {activeTab === "add" ? (
        <>
          <h2 className="mb-4">Add Your Service</h2>
          <div className="card p-4 shadow">
            <AddService />
          </div>
        </>
      ) : (
        <>
          <div className="section-header">
            <h2>My Bookings</h2>
            <p>Customers who booked your services</p>
          </div>
          <ProviderBookings />
        </>
      )}
    </div>
  );
}

export default AddServicePage;
