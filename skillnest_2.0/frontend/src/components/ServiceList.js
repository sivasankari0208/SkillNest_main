import React, { useEffect, useState } from "react";
import axios from "axios";
import BookService from "./BookService";
import { useAuth } from "../context/AuthContext";

function ServiceList() {
  
  const [services, setServices] = useState([]);
  const [loading, setLoading]   = useState(true);

  const fetchServices = () => {
    axios.get("http://localhost:5000/api/services")
      .then((res) => { setServices(res.data); setLoading(false); })
      .catch((err) => { console.error("Error loading services:", err); setLoading(false); });
  };

  useEffect(() => { fetchServices(); }, []);

  if (loading) {
    return (
      <div className="services-loading">
        <div className="spinner" />
        <p>Loading services...</p>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="services-empty">
        <span>🔍</span>
        <p>No services available yet. Be the first to add one!</p>
      </div>
    );
  }

  return (
    <div className="services-grid">
      {services.map((service) => (
        <div key={service._id} className="service-card">

          <div className="service-img-wrap">
            {service.image ? (
              <img
                src={`http://localhost:5000/uploads/${service.image}`}
                alt={service.title || service.name}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div className="service-img-placeholder" style={{ display: service.image ? "none" : "flex" }}>
              🛠️
            </div>

            {service.category && (
              <span className="service-category-badge">{service.category}</span>
            )}

            {(service.rating || 0) >= 4 && (
              <span className="top-rated-badge">⭐ Top Rated</span>
            )}
          </div>

          <div className="service-card-body">
            <h5 className="service-title">{service.title || service.name}</h5>
            <p className="service-description">{service.description}</p>

            {/* ── NEW: Rate display ─────────────────────────────── */}
            {service.rate > 0 && (
              <div className="service-rate-badge">
                <span className="rate-label">Service Rate</span>
                <span className="rate-amount">₹{service.rate.toLocaleString("en-IN")}</span>
                <span className="rate-unit">/ visit</span>
              </div>
            )}
            {/* ───────────────────────────────────────────────────── */}

            <div className="service-meta">
              <span className="service-rating">
                {service.rating
                  ? "⭐".repeat(Math.min(5, Math.round(service.rating)))
                  : "☆☆☆☆☆"}
                <b> {service.rating ? service.rating.toFixed(1) : "0.0"}</b>
              </span>
              <span className="service-bookings">
                📦 {service.bookings || 0} bookings
              </span>
            </div>

            <BookService
              serviceId={service._id}
              serviceName={service.title || service.name}
              serviceProviderId={service.providerId}
              serviceRate={service.rate || 0}   // ← NEW: pass rate to booking form
              onBooked={fetchServices}
            />
          </div>

        </div>
      ))}
    </div>
  );
}

export default ServiceList;
