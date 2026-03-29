import React, { useEffect, useState } from "react";
import axios from "axios";

function AddReview() {
  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.error(err));
  }, []);

  const submitReview = async (e) => {
    e.preventDefault();
    if (!serviceId || !rating) {
      alert("Please select a service and rating.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/reviews/add", {
        serviceId,
        rating,
        comment,
      });

      setSuccess(true);
      setServiceId(""); setRating(0); setComment("");
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Failed to submit review. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitReview} className="add-review-form">
      {success && (
        <div className="form-success">✅ Review submitted!</div>
      )}

      <div className="form-group">
        <label className="form-label">Select Service *</label>
        <select
          className="form-input"
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
          required
        >
          <option value="">Choose a service...</option>
          {services.map((s) => (
            <option key={s._id} value={s._id}>{s.title}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Rating *</label>
        <div className="star-selector">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star${(hoverRating || rating) >= star ? " filled" : ""}`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            >
              ★
            </span>
          ))}
          {rating > 0 && <span className="rating-label">{rating}/5</span>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Your Comment *</label>
        <textarea
          className="form-input"
          rows={3}
          placeholder="Share your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn-submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}

export default AddReview;