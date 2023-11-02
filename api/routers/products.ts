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
    const product = await Product.findById(req.params.id).populate({
      path: 'category',
      select: ['title'],
      model: Category,
    });

    if (!product) {
      return res.sendStatus(404);
    }

    return res.send(product);
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
      price: req.body.price,
      description: req.body.description,
    };

    if (req.file) {
      productData.image = req.file.filename;
    }

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
      image: req.file ? 'images/' + req.file.filename : null,
      price: req.body.price,
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

export default productRouter;
