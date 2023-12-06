import express from 'express';
import { imagesUpload } from '../multer';
import auth from '../middleware/auth';
import Product from '../models/Product';
import Category from '../models/Category';
import permit from '../middleware/permit';
import config from '../config';
import { Error } from 'mongoose';
import * as fs from 'fs';

const productAdminRouter = express.Router();

productAdminRouter.get('/', auth, permit('admin'), async (req, res) => {
  try {
    if (req.query.category) {
      const result = await Product.find({ category: req.query.category })
        .sort({ datetime: -1 })
        .populate({
          path: 'category',
          select: ['translations'],
          model: Category,
        });
      return res.send(result);
    } else {
      const result = await Product.find()
        .sort({ datetime: -1 })
        .populate({
          path: 'category',
          select: ['translations'],
          model: Category,
        });
      return res.send(result);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).send('Internal Server Error');
  }
});

productAdminRouter.get('/:id', auth, permit('admin'), async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate({
      path: 'category',
      select: ['translations'],
      model: Category,
    });

    if (!product) {
      return res.status(404).send({ error: 'Not found' });
    }

    return res.send(product);
  } catch {
    return res.sendStatus(500);
  }
});

productAdminRouter.post(
  '/',
  auth,
  permit('admin'),
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      const translationsInfo = JSON.parse(req.body.translations);
      const productData = new Product({
        translations: {
          ru: {
            title: translationsInfo.ru.title,
            description: translationsInfo.ru.description,
          },
          en: {
            title: translationsInfo.en.title,
            description: translationsInfo.en.description,
          },
          kg: {
            title: translationsInfo.kg.title,
            description: translationsInfo.kg.description,
          },
        },
        category: req.body.category,
        oldPrice: parseFloat(req.body.oldPrice),
        actualPrice: parseFloat(req.body.actualPrice),
        amount: parseFloat(req.body.amount),
        image: req.file ? req.file.filename : '',
      });

      await productData.save();
      res.send(productData);
    } catch (e) {
      if (e instanceof Error.ValidationError) {
        return res.status(400).send(e);
      }
      return next(e);
    }
  },
);

productAdminRouter.put(
  '/:id',
  auth,
  imagesUpload.single('image'),
  permit('admin'),
  async (req, res) => {
    try {
      const id = req.params.id;

      const updateProduct = await Product.findByIdAndUpdate(id, {
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        image: req.file ? 'images/' + req.file.filename : '',
        oldPrice: req.body.oldPrice,
        actualPrice: req.body.actualPrice,
        amount: req.body.amount,
      });

      if (!updateProduct) {
        return res.status(404).send('Not found!');
      }

      return res.send(updateProduct);
    } catch (e) {
      return res.status(500).send('error');
    }
  },
);

productAdminRouter.patch('/:id', auth, permit('admin'), async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).send('Not found!');
    }

    await Product.findByIdAndUpdate(id, {
      isActive: !product.isActive,
    });

    return res.send(product);
  } catch (e) {
    return res.status(500).send('error');
  }
});

productAdminRouter.patch('/:id/hit', auth, permit('admin'), async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).send('Not found!');
    }

    await Product.findByIdAndUpdate(id, {
      isHit: !product.isHit,
    });

    return res.send(product);
  } catch (e) {
    return res.status(500).send('error');
  }
});

productAdminRouter.delete('/:id', auth, permit('admin'), async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).send('Not Found!');
    }
    await Product.findByIdAndRemove(id);

    const filePath = config.publicPath + '/' + product.image;
    fs.unlinkSync(filePath);

    res.send('Deleted');
  } catch (e) {
    res.status(500).send('error');
  }
});
export default productAdminRouter;
