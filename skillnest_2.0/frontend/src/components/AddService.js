import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function AddService() {
  const { user } = useAuth();

  const [title, setTitle]             = useState("");
  const [category, setCategory]       = useState("");
  const [description, setDescription] = useState("");
  const [rate, setRate]               = useState("");   // ← NEW
  const [image, setImage]             = useState(null);
  const [preview, setPreview]         = useState(null);
  const [loading, setLoading]         = useState(false);
  const [success, setSuccess]         = useState(false);

  const categories = [
    "Cleaning", "Plumbing", "Electrical", "Carpentry",
    "Painting", "Gardening", "Cooking", "Tutoring", "Other"
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const submitService = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Please fill all required fields.");
      return;
    }
    if (!rate || isNaN(rate) || Number(rate) <= 0) {
      alert("Please enter a valid service rate (₹).");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title",        title);
    formData.append("category",     category);
    formData.append("description",  description);
    formData.append("rate",         rate);            // ← NEW
    formData.append("providerId",   user._id);
    formData.append("providerName", user.name);
    if (image) formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/services/add", formData);
      setSuccess(true);
      setTitle(""); setCategory(""); setDescription("");
      setRate("");                                    // ← NEW: reset
      setImage(null); setPreview(null);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Failed to add service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitService} className="add-service-form">
      {success && (
        <div className="form-success">✅ Service added successfully!</div>
      )}

      <div className="form-group">
        <label className="form-label">Service Title *</label>
        <input
          className="form-input"
          placeholder="e.g. Expert House Cleaning"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Category</label>
        <select
          className="form-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Description *</label>
        <textarea
          className="form-input"
          rows={4}
          placeholder="Describe your service in detail..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {/* ── NEW: Rate field ───────────────────────────────── */}
      <div className="form-group">
        <label className="form-label">Service Rate (₹) *</label>
        <div style={{ position: "relative" }}>
          <span style={{
            position: "absolute", left: "12px", top: "50%",
            transform: "translateY(-50%)",
            fontSize: "16px", fontWeight: 700,
            color: "var(--text-muted, #888)"
          }}>₹</span>
          <input
            className="form-input"
            style={{ paddingLeft: "30px" }}
            type="number"
            min="1"
            placeholder="e.g. 500"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            required
          />
        </div>
        <small style={{ color: "var(--text-muted, #888)", fontSize: "12px" }}>
          Enter the charge per visit / session in Indian Rupees
        </small>
      </div>
      {/* ───────────────────────────────────────────────────── */}

      <div className="form-group">
        <label className="form-label">Service Image</label>
        <input
          type="file"
          accept="image/*"
          className="form-input"
          onChange={handleImageChange}
        />
        {preview && (
          <img src={preview} alt="Preview" className="image-preview" />
        )}
      </div>

      <button type="submit" className="btn-submit" disabled={loading}>
        {loading ? "Adding..." : "➕ Add Service"}
      </button>
    </form>
  );
}

export default AddService;
