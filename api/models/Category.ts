import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
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
    ru: {
      title: {
        type: String,
        required: true,
      },
      description: String,
    },
  },
});

const Category = mongoose.model('Category', CategorySchema);

const aggregate = Category.aggregate([
  { $addFields: { translations: { $objectToArray: '$translations' } } },
  { $unwind: '$translations' },
  { $addFields: { lang: '$translations.k' } },
  { $addFields: { content: '$translations.v' } },
  // {$addFields:{"quarters.name": "$name"}},
  // {$replaceRoot:{newRoot:"$quarters"}}
]);

aggregate
  .then((result) => {
    // new Category(result).save();
    // console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

export default Category;
