import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BannerSchema = new Schema({
  translations: {
    en: {
      image: {
        type: String,
        required: true,
      },
    },
    ru: {
      image: {
        type: String,
        required: true,
      },
    },
    kg: {
      image: {
        type: String,
        required: true,
      },
    },
  },
  description: {
    type: String,
    required: true,
  },
  page: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    required: [true, 'Телефон обязателен к заполнению'],
  },
});

export const pipelineBanner = (lang: string) => [
  {
    $project: {
      image: `$translations.${lang}.image`,
      description: `$description`,
      page: `$page`,
      priority: `$priority`,
    },
  },
];

const Banner = mongoose.model('Banner', BannerSchema);
export default Banner;
