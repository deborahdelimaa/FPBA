const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Vehicles",
        "Technology",
        "Furniture",
        "Sport",
        "Animals",
        "Other",
      ],
    },
    price: { type: Number, required: true },
    img: {
      type: String,
    },
    exchange: {
      type: Boolean,
      
    },
    sold: {
      type: Boolean,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", productSchema);
