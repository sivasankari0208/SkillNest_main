import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const STATUS_OPTIONS = ["Pending", "Accepted", "Rejected", "Completed"];

const STATUS_COLORS = {
  "Pending":   "#f59e0b",
  "Accepted":  "#22c55e",
  "Rejected":  "#ef4444",
  "Completed": "#3b82f6",
};

function BookingsPage() {
  const { user, isCustomer } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    fetchBookings();
    // eslint-disable-next-line
  }, [user]);

  const fetchBookings = () => {
    setLoading(true);
    const url = `http://localhost:5000/api/bookings?userId=${user._id}`;

    axios.get(url)
      .then((res) => { setBookings(res.data); setLoading(false); })
      .catch((err) => { console.error(err); setLoading(false); });
  };

  // ── NEW: total amount helper ─────────────────────────────────────
  const totalAmount = bookings.reduce((sum, b) => sum + (b.serviceRate || 0), 0);
  const paidAmount  = bookings
    .filter((b) => b.status === "Completed")
    .reduce((sum, b) => sum + (b.serviceRate || 0), 0);
  // ─────────────────────────────────────────────────────────────────

  return (
    <div className="bookings-page">
      <div className="section-header">
        <h2>My Bookings</h2>
        <p>Track the status of your bookings</p>
      </div>

      {/* ── NEW: Summary banner ─────────────────────────────────── */}
      {!loading && bookings.length > 0 && (
        <div className="bookings-summary-bar">
          <div className="summary-pill">
            <span className="summary-icon">📋</span>
            <span className="summary-text">{bookings.length} Booking{bookings.length !== 1 ? "s" : ""}</span>
          </div>
          <div className="summary-pill">
            <span className="summary-icon">💰</span>
            <span className="summary-text">
              Total: <strong>₹{totalAmount.toLocaleString("en-IN")}</strong>
            </span>
          </div>
          <div className="summary-pill summary-paid">
              <span className="summary-icon">✅</span>
              <span className="summary-text">
                Completed: <strong>₹{paidAmount.toLocaleString("en-IN")}</strong>
              </span>
            </div>
        </div>
      )}
      {/* ─────────────────────────────────────────────────────────── */}

      {loading ? (
        <div className="services-loading"><div className="spinner" /></div>
      ) : bookings.length === 0 ? (
        <div className="services-empty">
          <span>📋</span>
          <p>No bookings yet. Book a service from the home page!</p>
        </div>
      ) : (
        <div className="bookings-grid">
          {bookings.map((b, i) => {
            const statusColor = STATUS_COLORS[b.status] || "#8a6070";
            const rate = b.serviceRate || 0;
            return (
              <div key={b._id} className="booking-card">
                <div className="booking-number">#{i + 1}</div>
                <h5 className="booking-service">{b.serviceName}</h5>

                {/* ── NEW: Amount chip on card ──────────────────── */}
                {rate > 0 && (
                  <div className="booking-amount-chip">
                    <span>💳</span>
                    <span className="amount-value">₹{rate.toLocaleString("en-IN")}</span>
                    <span className="amount-label">service charge</span>
                  </div>
                )}
                {/* ─────────────────────────────────────────────── */}

                <div className="booking-details">
                  <p><span>👤</span> {b.userName}</p>
                  {b.flatNo && <p><span>🏢</span> Flat: {b.flatNo}</p>}
                  {b.doorNo && <p><span>🚪</span> Door: {b.doorNo}</p>}
                  {b.date && (
                    <p><span>📅</span> {new Date(b.date).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric"
                    })}</p>
                  )}
                </div>

                {/* Status */}
                <span
                    className="booking-status"
                    style={{ background: statusColor + "22", color: statusColor, border: `1px solid ${statusColor}` }}
                  >
                    {b.status || "Pending"}
                  </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BookingsPage;
