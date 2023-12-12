import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
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

export const pipelineCategory = (lang: string) => [
  {
    $project: {
      image: '$image',
      lang: lang,
      title: `$translations.${lang}.title`,
      description: `$translations.${lang}.description`,
      isActive: '$isActive',
    },
  },
];

export default Category;
