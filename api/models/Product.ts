import mongoose from 'mongoose';
import Category from './Category';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => await Category.findById(value),
      message: 'Category does not exist',
    },
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  oldPrice: {
    type: Number,
    required: true,
  },
  actualPrice: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  isHit: {
    type: Boolean,
    required: true,
    default: false,
  },
  datetime: {
    type: String,
    required: true,
    default: new Date().toISOString(),
  },
  // translations: {
  //   en: {
  //     title: {
  //       type: String,
  //       required: true,
  //     },
  //     description: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  //   kg: {
  //     title: {
  //       type: String,
  //       required: true,
  //     },
  //     description: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // },
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;
