import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  image: {
    type: String,
    required: true,
  },
  translations: {
    en: {
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
