const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
    comment: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  }
);

const Review = model("Review", reviewSchema);

module.exports = Review;
