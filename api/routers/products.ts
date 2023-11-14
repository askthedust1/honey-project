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
import User from '../models/User';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  try {
    const token = req.get('Authorization');
    const user = await User.findOne({ token });

    if (user && user.role === 'admin') {
      const result = await Product.find();
      return res.send(result);
    }

    let page = 1;
    const perPage = 2;
    if (req.query.page) {
      page = parseInt(req.query.page as string);

      const products = await Product.find()
        .populate('category', 'title description')
        .skip((page - 1) * perPage)
        .limit(perPage);
      return res.send(products);
    }

    if (req.query.category) {
      const result = await Product.find({ category: req.query.category, isActive: true });
      return res.send(result);
    }

    const products = await Product.find({ isActive: true });
    return res.send(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).send('Internal Server Error');
  }
});

productRouter.get('/:id', async (req, res) => {
  try {
    const token = req.get('Authorization');
    const user = await User.findOne({ token });

    const productId = req.params.id;
    const product = await Product.findById(productId).populate({
      path: 'category',
      select: ['title'],
      model: Category,
    });

    if (!product) {
      return res.status(404).send({ error: 'Not found' });
    }

    if (
      (user && user.role === 'admin') ||
      (!user && product.isActive) ||
      (user && user.role === 'user' && product.isActive)
    ) {
      return res.send(product);
    }

    return res.status(404).send({ error: 'Not found' });
  } catch {
    return res.sendStatus(500);
  }
});

productRouter.post(
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

productRouter.put('/:id', auth, imagesUpload.single('image'), permit('admin'), async (req, res) => {
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
});

productRouter.delete('/:id', auth, permit('admin'), async (req, res) => {
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

productRouter.patch('/:id', auth, permit('admin'), async (req, res) => {
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

export default productRouter;
