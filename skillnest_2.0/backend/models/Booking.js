const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

  serviceId: String,

  serviceName: String,

  serviceRate: {
    type: Number,
    default: 0         // ← NEW: rate snapshot at time of booking (₹)
  },

  userName: String,

  userId: String,

  providerId: String,

  flatNo: String,

  doorNo: String,

  date: Date,

  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected", "Completed"],
    default: "Pending"
  }

});

module.exports = mongoose.model("Booking", bookingSchema);
