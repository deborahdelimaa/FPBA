const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    creator: {
      enum: ["Seller", "Buyer"],
    },
    comment: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  }
);

const Review = model("Review", reviewSchema);

module.exports = Review;
