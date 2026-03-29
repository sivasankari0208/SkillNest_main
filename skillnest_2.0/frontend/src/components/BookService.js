import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function BookService({ serviceId, serviceName, serviceProviderId, serviceRate, onBooked }) {
  const { user, isCustomer } = useAuth();

  const [flatNo, setFlatNo]   = useState("");
  const [doorNo, setDoorNo]   = useState("");
  const [open, setOpen]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!user || !isCustomer) return null;

  const rate = serviceRate || 0;

  const bookService = async () => {
    if (!flatNo.trim() || !doorNo.trim()) {
      alert("Please fill in Flat No and Door No.");
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/bookings/book", {
        serviceId,
        serviceName,
        serviceRate: rate,            // ← NEW: snapshot rate at booking time
        userName:    user.name,
        userId:      user._id,
        providerId:  serviceProviderId || null,
        flatNo,
        doorNo,
        date: new Date(),
      });

      await axios.patch(`http://localhost:5000/api/services/${serviceId}/increment-bookings`);

      setSuccess(true);
      setFlatNo("");
      setDoorNo("");
      if (onBooked) onBooked();
      setTimeout(() => { setSuccess(false); setOpen(false); }, 2500);
    } catch (err) {
      console.error(err);
      alert("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-service-wrap">
      {!open ? (
        <button className="btn-book" onClick={() => setOpen(true)}>
          📅 Book This Service
          {rate > 0 && (
            <span style={{
              marginLeft: "8px",
              background: "rgba(255,255,255,0.25)",
              borderRadius: "6px",
              padding: "2px 8px",
              fontSize: "13px",
              fontWeight: 700,
            }}>
              ₹{rate.toLocaleString("en-IN")}
            </span>
          )}
        </button>
      ) : (
        <div className="book-form">
          {success ? (
            <div className="book-success">✅ Booked Successfully!</div>
          ) : (
            <>
              {/* ── NEW: Rate summary inside form ───────────── */}
              {rate > 0 && (
                <div className="booking-rate-summary">
                  <span className="rate-summary-label">💰 Amount to Pay</span>
                  <span className="rate-summary-value">₹{rate.toLocaleString("en-IN")}</span>
                </div>
              )}
              {/* ────────────────────────────────────────────── */}

              <input
                type="text"
                placeholder="Flat No"
                className="book-input"
                value={flatNo}
                onChange={(e) => setFlatNo(e.target.value)}
              />
              <input
                type="text"
                placeholder="Door No"
                className="book-input"
                value={doorNo}
                onChange={(e) => setDoorNo(e.target.value)}
              />
              <div className="book-actions">
                <button className="btn-book" onClick={bookService} disabled={loading}>
                  {loading ? "Booking..." : `Confirm — ₹${rate.toLocaleString("en-IN")}`}
                </button>
                <button className="btn-cancel" onClick={() => setOpen(false)}>
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default BookService;
