// models/styleModel.js
import mongoose from "mongoose";

const styleSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  reviews: [
    {
      rating: Number,
      comment: String,
    },
  ],
});

export default mongoose.model("style", styleSchema);
