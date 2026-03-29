const express = require("express");
const router  = express.Router();
const Service = require("../models/Service");
const multer  = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, "uploads/"); },
  filename:    function (req, file, cb) { cb(null, Date.now() + "-" + file.originalname); },
});

const upload = multer({ storage: storage });

// ADD SERVICE
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const service = new Service({
      title:        req.body.title,
      category:     req.body.category,
      description:  req.body.description,
      image:        req.file ? req.file.filename : null,
      rate:         req.body.rate ? Number(req.body.rate) : 0,   // ← NEW
      providerId:   req.body.providerId,
      providerName: req.body.providerName,
    });
    await service.save();
    res.json(service);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL SERVICES
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json(err);
  }
});

// INCREMENT BOOKINGS COUNT
router.patch("/:id/increment-bookings", async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { $inc: { bookings: 1 } },
      { new: true }
    );
    res.json(service);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE SERVICE (admin)
router.delete("/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
