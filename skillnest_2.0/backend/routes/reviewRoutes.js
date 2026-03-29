const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const Service = require("../models/Service");


// ADD REVIEW
router.post("/add", async (req, res) => {

  try {

    const review = new Review({

      serviceId: req.body.serviceId,
      rating: req.body.rating,
      comment: req.body.comment

    });

    await review.save();


    // GET ALL REVIEWS FOR THIS SERVICE
    const reviews = await Review.find({ serviceId: req.body.serviceId });

    // CALCULATE AVERAGE RATING
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = total / reviews.length;

    // UPDATE SERVICE RATING
    await Service.findByIdAndUpdate(req.body.serviceId, {
      rating: avgRating
    });


    res.json({
      message: "Review Added",
      review
    });

  } catch (err) {

    res.status(500).json(err);

  }

});


// GET ALL REVIEWS WITH SERVICE DETAILS
router.get("/", async (req, res) => {

  try {

    const reviews = await Review.find().populate("serviceId");

    res.json(reviews);

  } catch (err) {

    res.status(500).json(err);

  }

});

// DELETE REVIEW (admin)
router.delete("/:id", async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
