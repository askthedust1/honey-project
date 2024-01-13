import mongoose from 'mongoose';
import Product from './Product';
import User from './User';

const kitSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
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
});

const TransactionSchema = new mongoose.Schema({
  indexNumber: {
    type: Number,
    required: true,
  },
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
    validate: {
      validator: function(value: string) {
        return value.trim().length > 0;
      },
      message: 'Адрес не может состоять только из пробелов',
    },
  },
  kits: [kitSchema],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
  dateTime: {
    type: String,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;
