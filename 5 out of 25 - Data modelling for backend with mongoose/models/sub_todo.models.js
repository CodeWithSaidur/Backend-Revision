import mongoose from 'mongoose';
// SubTodo.model.js
const SubTodoSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    complete: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

export const SubTodo = mongoose.model(
  'SubTodo',
  SubTodoSchema,
);
