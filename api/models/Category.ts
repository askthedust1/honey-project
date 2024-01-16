import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  translations: {
    en: {
      title: {
        type: String,
        required: true,
      },
      description: String,
    },
    ru: {
      title: {
        type: String,
        required: true,
      },
      description: String,
    },
    kg: {
      title: {
        type: String,
        required: true,
      },
      description: String,
    },
  },
});

const Category = mongoose.model('Category', CategorySchema);
export default Category;
