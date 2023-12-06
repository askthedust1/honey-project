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
});

const Product = mongoose.model('Product', ProductSchema);

// const Modify = Product.aggregate([
//   {
//     $project: {
//       category: '$category',
//       image: '$image',
//       oldPrice: '$oldPrice',
//       actualPrice: '$actualPrice',
//       amount: '$amount',
//       isActive: '$isActive',
//       isHit: '$isHit',
//       datetime: '$datetime',
//       lang: '$translations.en',
//       title: `$translations.en.title`,
//       description: `$translations.en.description`,
//     },
//   },
// ]);
//
// const ModifyProduct = Modify.map(i => new Product(i))

export const pipelineProduct = (lang: string) => ({
  $project: {
    category: '$category',
    image: '$image',
    oldPrice: '$oldPrice',
    actualPrice: '$actualPrice',
    amount: '$amount',
    isActive: '$isActive',
    isHit: '$isHit',
    datetime: '$datetime',
    lang: lang,
    title: `$translations.${lang}.title`,
    description: `$translations.${lang}.description`,
  },
});

// export const oneProduct = (lang: string, id: string) => [
//   {
//     $match: {
//       _id: id,
//     },
//   },
// ];
export default Product;
