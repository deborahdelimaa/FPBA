const { Schema, model } = require('mongoose');

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
        'Vehicles',
        'Technology',
        'Furniture',
        'Sport',
        'Animals',
        'Other',
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
      ref: 'User',
    },
    buyer: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    feedback: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = model('Product', productSchema);

module.exports = Product;
