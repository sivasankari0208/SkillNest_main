import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function ReviewList() {
  
  const [reviews, setReviews]               = useState([]);
  const [services, setServices]             = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [loading, setLoading]               = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:5000/api/reviews"),
      axios.get("http://localhost:5000/api/services"),
    ])
      .then(([reviewsRes, servicesRes]) => {
        setReviews(reviewsRes.data);
        setServices(servicesRes.data);
        setLoading(false);
      })
      .catch((err) => { console.error(err); setLoading(false); });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/reviews/${id}`);
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const displayedReviews = selectedService
    ? reviews.filter((r) => r.serviceId && r.serviceId._id === selectedService)
    : reviews;

  return (
    <div className="review-list-wrap">
      <select
        className="form-input review-filter"
        value={selectedService}
        onChange={(e) => setSelectedService(e.target.value)}
      >
        <option value="">All Services</option>
        {services.map((s) => (
          <option key={s._id} value={s._id}>{s.title}</option>
        ))}
      </select>

      {loading ? (
        <div className="services-loading"><div className="spinner" /></div>
      ) : displayedReviews.length === 0 ? (
        <div className="services-empty">
          <span>💬</span>
          <p>No reviews yet for this service.</p>
        </div>
      ) : (
        <div className="reviews-scroll">
          {displayedReviews.map((r) => (
            <div className="review-card" key={r._id}>
              <div className="review-header">
                <span className="review-service">
                  {r.serviceId ? r.serviceId.title : "Unknown Service"}
                </span>
                <span className="review-stars">
                  {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                </span>
              </div>
              <p className="review-comment">{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReviewList;
