import mongoose from 'mongoose';
// Product.model.js
const ProductSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      type: String,
    },

    name: {
      type: String,
      required: true,
    },

    productImage: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

export const Product = mongoose.model(
  'Product',
  ProductSchema,
);
