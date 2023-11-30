import express from 'express';
import { imagesUpload } from '../multer';
import auth from '../middleware/auth';
import mongoose from 'mongoose';
import { IProductPost } from '../types';
import Product from '../models/Product';
import Category from '../models/Category';
import permit from '../middleware/permit';
import config from '../config';
import * as fs from 'fs';

const productAdminRouter = express.Router();

productAdminRouter.get('/', auth, permit('admin'), async (req, res) => {
  // const lang = req.headers['accept-language'] || 'ru';
  try {
    if (req.query.category) {
      const result = await Product.find({ category: req.query.category });
      return res.send(result);
    } else {
      const result = await Product.find();
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
      select: ['title'],
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
    if (!req.body.title) return res.status(400).send({ error: 'Title is required!' });
    if (!req.body.price) return res.status(400).send({ error: 'Price is required!' });

    const productData: IProductPost = {
      category: req.body.category,
      title: req.body.title,
      oldPrice: req.body.oldPrice,
      actualPrice: req.body.actualPrice,
      description: req.body.description,
      amount: req.body.amount,
      image: req.file ? req.file.filename : '',
    };

    const product = new Product(productData);

    try {
      await product.save();
      return res.send(product);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      next(e);
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
