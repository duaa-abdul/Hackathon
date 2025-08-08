import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
       type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
  
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    hijabStyle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HijabStyle",
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
