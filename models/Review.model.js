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

module.exports = model("Review", reviewSchema);
