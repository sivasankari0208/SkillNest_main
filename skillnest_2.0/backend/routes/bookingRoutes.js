const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// CREATE booking
router.post("/book", async (req, res) => {
  try {
    const booking = new Booking(req.body); // providerId comes from req.body now
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET bookings — filtered by userId (customer) or providerId (provider) or all (admin)
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.userId)     filter.userId     = req.query.userId;
    if (req.query.providerId) filter.providerId = req.query.providerId;
    const bookings = await Booking.find(filter).sort({ date: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE booking status
router.patch("/:id/status", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(booking);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE booking (admin)
router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;