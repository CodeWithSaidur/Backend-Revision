import mongoose from 'mongoose';
// Todo.model.js
const TodoSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    
    createdBy: {
      // making a relation between todo and user
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    subtodo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubTodo',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Todo = mongoose.model('Todo', TodoSchema);
