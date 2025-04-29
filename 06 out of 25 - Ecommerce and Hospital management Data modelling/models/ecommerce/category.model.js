import mongoose from 'mongoose';
// Category.model.js
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Category = mongoose.model(
  'Category',
  CategorySchema,
);
