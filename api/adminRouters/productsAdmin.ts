import express from 'express';
import { imagesUpload } from '../multer';
import auth from '../middleware/auth';
import Product from '../models/Product';
import Category from '../models/Category';
import permit from '../middleware/permit';
import config from '../config';
import { Error } from 'mongoose';
import * as fs from 'fs';
import { IProductPost } from '../types';

const productAdminRouter = express.Router();

productAdminRouter.get('/', auth, permit('admin'), async (req, res) => {
  const lang = 'ru';
  const qSearch = req.query.search as string;
  try {
    if (req.query.category) {
      const result = await Product.find({
        category: req.query.category,
        'translations.ru.title': { $regex: new RegExp(qSearch, 'i') },
      })
        .sort({ datetime: -1 })
        .populate({
          path: 'category',
          select: ['translations'],
          model: Category,
        });
      const fit = result.map((i) => {
        const product = i.toObject() as IProductPost;
        return {
          ...product,
          title: product.translations[lang].title,
        };
      });
      return res.send(fit);
    } else {
      const result = await Product.find({
        'translations.ru.title': { $regex: new RegExp(qSearch, 'i') },
      })
        .sort({ datetime: -1 })
        .populate({
          path: 'category',
          select: ['translations'],
          model: Category,
        });
      const fit = result.map((i) => {
        const product = i.toObject() as IProductPost;
        return {
          ...product,
          title: product.translations[lang].title,
          category: {
            ...product.category,
            title: product.category.translations[lang].title,
          },
        };
      });
      return res.send(fit);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).send('Internal Server Error');
  }
});

productAdminRouter.get('/click', auth, permit('admin'), async (req, res) => {
  const lang = 'ru';
  try {
    const result = await Product.find()
      .sort({ click: -1 })
      .populate({
        path: 'category',
        select: ['translations'],
        model: Category,
      });
    const fit = result.map((i) => {
      const product = i.toObject() as IProductPost;
      return {
        ...product,
        title: product.translations[lang].title,
        category: {
          ...product.category,
          title: product.category.translations[lang].title,
        },
      };
    });
    return res.send(fit);
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
  }
);

productAdminRouter.put(
  '/:id',
  auth,
  imagesUpload.single('image'),
  permit('admin'),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const translationsInfo = JSON.parse(req.body.translations);
      const product = await Product.findById(id);

      if (!product) {
        return res.status(400).send('Product not found!');
      }

      if (req.body.amount && req.body.amount < 0) {
        return res.send('Количество товара не может быть меньше нуля!');
      }

      if (req.body.oldPrice && req.body.oldPrice < 0) {
        return res.send('Цена не может быть меньше нуля!');
      }

      if (req.body.actualPrice && req.body.actualPrice < 0) {
        return res.send('Цена не может быть меньше нуля!');
      }

      const updateProduct = await Product.findByIdAndUpdate(id, {
        category: req.body.category,
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
        image: req.file ? req.file.filename : product.image,
        oldPrice: req.body.oldPrice,
        actualPrice: req.body.actualPrice,
        amount: req.body.amount,
      });

      if (!updateProduct) {
        return res.status(404).send('Not found!');
      }

      return res.send(updateProduct);
    } catch (e) {
      if (e instanceof Error.ValidationError) {
        return res.status(400).send(e);
      }
      return next(e);
    }
  }
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

    const productsCount = await Product.find({
      isActive: true,
      category: product.category,
    }).countDocuments();

    const category = await Category.findById(product.category);

    if (!category) {
      return res.status(404).send('Not found!');
    }

    if (productsCount === 0) {
      await Category.findByIdAndUpdate(product.category, {
        isActive: false,
      });

      return res.send(product);
    } else if (productsCount > 0) {
      await Category.findByIdAndUpdate(product.category, {
        isActive: true,
      });

      return res.send(product);
    }
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
