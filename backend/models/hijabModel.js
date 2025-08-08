import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: String,
  rating: Number,
  comment: String,
});

const hijabSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  reviews: [reviewSchema],
});

const Hijab = mongoose.model("hijabstyles", hijabSchema);

export default Hijab;

