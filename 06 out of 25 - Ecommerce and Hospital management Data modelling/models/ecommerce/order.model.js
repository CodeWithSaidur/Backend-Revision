import mongoose from 'mongoose';

//  mini model of orderItemSchima
const orderItemSchima = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },

  quantity: {
    type: Number,
    required: true,
  },
});

const OrderSchema = new mongoose.Schema(
  {
    orderPrice: {
      type: Number,
      required: true,
    },

    customer: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },

    orderItems: {
      type: [orderItemSchima],
    },

    address: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ['PENDING', 'CANCELLED', 'DALIVERED'],
      default: 'PENDING',
    },
  },
  {
    timestamps: true,
  },
);

export const Order = mongoose.model('Order', OrderSchema);
