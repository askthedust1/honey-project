import * as express from 'express';
import Category, { pipelineCategory } from '../models/Category';
import mongoose from 'mongoose';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import Product from '../models/Product';
import { imagesUpload } from '../multer';

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req, res) => {
  const lang = req.headers['accept-language'] || 'ru';

  try {
    const categories = await Category.aggregate(pipelineCategory(lang));
    const result = await categories;

    return res.send(result);
  } catch (e) {
    return res.sendStatus(500);
  }
});

categoriesRouter.post(
  '/',
  auth,
  permit('admin'),
  imagesUpload.single('image'),
  async (req, res, next) => {
    const categoryData = {
      translations: req.body.translations,
      image: req.file ? req.file.filename : '',
    };

    const category = new Category(categoryData);

    try {
      await category.save();
      res.send(category);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      next(e);
    }
  },
);

categoriesRouter.put(
  '/:id',
  auth,
  permit('admin'),
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      const categoryId = req.params.id;
      const category = await Category.findById(categoryId);

      if (!category) {
        return res.status(404).send({ error: 'Not found!' });
      }

      category.translations = req.body.translations || category.translations;
      category.image = req.file ? req.file.filename : category.image;

      await category.save();

      return res.send(category);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(error);
      }
      return next(error);
    }
  },
);

categoriesRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const category_id = req.params.id;
    const category = await Category.findOne({ _id: category_id });

    if (!category) {
      return res.status(404).send({ error: 'Not found!' });
    }

    const relatedProducts = await Product.find({ category: category_id });
    if (relatedProducts.length > 0) {
      return res
        .status(400)
        .send({ error: 'Cannot delete category because there are products associated with it.' });
    }

    await Category.deleteOne({ _id: category_id });
    return res.send('Category deleted');
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

categoriesRouter.patch('/:id', auth, permit('admin'), async (req, res) => {
  try {
    const id = req.params.id;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).send('Not found!');
    }

    await Category.findByIdAndUpdate(id, {
      isActive: !category.isActive,
    });

    return res.send(category);
  } catch (e) {
    return res.status(500).send('error');
  }
});

export default categoriesRouter;
