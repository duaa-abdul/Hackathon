import Review from "../models/reviewModel.js";

export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const hijabId = req.params.hijabId;

    const review = new Review({
      rating: Number(rating),
      comment,
      hijabStyle: hijabId,
      user: req.user._id, 
    });

    await review.save();
    res.status(201).json({ message: "Review added", review });
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error });
  }
};
