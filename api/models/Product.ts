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
  oldPrice: {
    type: Number,
    required: true,
    validate: {
      validator: function (value: number) {
        return value > 0;
      },
      message: 'Old price must be greater than 0',
    },
  },
  actualPrice: {
    type: Number,
    required: true,
    validate: {
      validator: function (value: number) {
        return value > 0;
      },
      message: 'Old price must be greater than 0',
    },
  },
  image: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    validate: {
      validator: function (value: number) {
        return value >= 0;
      },
      message: 'Количество не может быть меньше нуля',
    },
  },
  isActive: {
    type: Boolean,
    required: true,
    default: false,
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
  translations: {
    ru: {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
    en: {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
    kg: {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  },
  click: {
    type: Number,
    default: 0,
    required: false,
  },
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;
