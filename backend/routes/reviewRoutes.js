import express from "express";
import Review from "../models/reviewModel.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:hijabId", protect, async (req, res) => {
  try {
    const review = new Review({
      rating: Number(req.body.rating),
      comment: req.body.comment,
      hijabStyle: req.params.hijabId,
      user: req.user._id  
    });

    await review.save();
    res.status(201).json({ success: true, message: "Review added", review });
  } catch (err) {
    console.error("ERROR saving review:", err);
    res.status(500).json({ error: "Failed to add review" });
  }
});

// Get reviews
router.get("/:hijabId", async (req, res) => {
  try {
    const reviews = await Review.find({ hijabStyle: req.params.hijabId })
      .populate("user", "name email");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

export default router;
