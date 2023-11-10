import mongoose from 'mongoose';
import Product from './Product';
import User from './User';

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => await User.findById(value),
      message: 'User does not exist',
    },
  },
  address: {
    type: String,
    required: true,
  },
  kits: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true,
        validate: {
          validator: async (value: mongoose.Types.ObjectId) => await Product.findById(value),
          message: 'Product does not exist',
        },
      },
      amount: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],

  totalPrice: {
    type: Number,
    required: true,
  },

  status: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;
