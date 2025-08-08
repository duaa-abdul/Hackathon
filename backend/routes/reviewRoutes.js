import express from "express";
import Review from "../models/reviewModel.js";

const router = express.Router();

router.post("/:hijabId", async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.params.hijabId);
    
    const review = new Review({rating:Number(req.body.rating), comment:req.body.comment, hijabStyle:req.params.hijabId, user: req.body.user?._id,});
    await review.save();
    res.status(201).json(review);
  } catch (err) {
     console.error("🔴 ERROR saving review:", err);
    res.status(500).json({ error: "Failed to add review" });
  }
});

router.get("/:hijabId", async (req, res) => {
  try {
    const reviews = await Review.find({ hijabId: req.params.hijabId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

export default router;
