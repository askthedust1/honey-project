import * as express from 'express';
import Category from '../models/Category';
import mongoose from 'mongoose';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import Product from '../models/Product';
import { imagesUpload } from '../multer';
import { Error } from 'mongoose';

const categoriesAdminRouter = express.Router();

categoriesAdminRouter.get('/', auth, permit('admin'), async (req, res) => {
  const qSearch = req.query.search as string;
  try {
    const result = await Category.find({
      'translations.ru.title': { $regex: new RegExp(qSearch, 'i') },
    });
    return res.send(result);
  } catch (e) {
    console.error('Error fetching categories:', e);
    return res.status(500).send('Internal Server Error');
  }
});

categoriesAdminRouter.get('/:id', auth, permit('admin'), async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).send({ error: 'Not found' });
    }

    return res.send(category);
  } catch {
    return res.sendStatus(500);
  }
});

categoriesAdminRouter.post(
  '/',
  auth,
  permit('admin'),
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      const categoryData = new Category({
        translations: JSON.parse(req.body.translations),
        image: req.file ? req.file.filename : '',
      });

      await categoryData.save();
      res.send(categoryData);
    } catch (e) {
      if (e instanceof Error.ValidationError) {
        return res.status(400).send(e);
      }
      return next(e);
    }
  }
);

categoriesAdminRouter.put(
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

      category.translations = JSON.parse(req.body.translations) || category.translations;
      category.image = req.file ? req.file.filename : category.image;

      await category.save();

      return res.send(category);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(error);
      }
      return next(error);
    }
  }
);

categoriesAdminRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
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

categoriesAdminRouter.patch('/:id', auth, permit('admin'), async (req, res) => {
  try {
    const id = req.params.id;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).send('Not found!');
    }

    const productsCount = await Product.find({ category: id, isActive: true }).countDocuments();

    if (productsCount > 0 && category.isActive === true) {
      return res.send(category);
    } else if (productsCount === 0 && category.isActive === false) {
      return res.send(category);
    } else if (productsCount > 0 && category.isActive === false) {
      await Category.findByIdAndUpdate(id, {
        isActive: !category.isActive,
      });

      return res.send(category);
    } else if (productsCount === 0 && category.isActive === true) {
      await Category.findByIdAndUpdate(id, {
        isActive: !category.isActive,
      });

      return res.send(category);
    }
  } catch (e) {
    return res.status(500).send('error');
  }
});

export default categoriesAdminRouter;
