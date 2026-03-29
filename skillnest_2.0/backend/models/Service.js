const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({

  title: String,

  category: String,

  description: String,

  image: String,

  rate: {
    type: Number,
    default: 0        // ← NEW: service charge in ₹
  },

  rating: {
    type: Number,
    default: 0
  },

  bookings: {
    type: Number,
    default: 0
  },

  providerId: String,

  providerName: String

});

module.exports = mongoose.model("Service", ServiceSchema);
