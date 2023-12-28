import express from 'express';
import Product from '../models/Product';
import Category from '../models/Category';
import User from '../models/User';
import { IProductPost } from '../types';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const lang = req.headers['accept-language'] || 'ru';

  try {
    const filterBy = req.query.filterBy;

    if (filterBy && filterBy === 'hit') {
      const result = await Product.find({
        $and: [{ isHit: true }, { isActive: true }],
      }).limit(6);

      const fit = result.map((i) => {
        const product = i.toObject() as IProductPost;
        return {
          ...product,
          title: product.translations[lang]?.title,
        };
      });
      return res.send(fit);
    }

    if (filterBy && filterBy === 'new') {
      const result = await Product.find({
        $and: [{ isHit: false }, { isActive: true }],
      })
        .sort({ datetime: 'descending' })
        .limit(6);

      const fit = result.map((i) => {
        const product = i.toObject() as IProductPost;
        return {
          ...product,
          title: product.translations[lang]?.title,
        };
      });
      return res.send(fit);
    }

    if (filterBy && filterBy === 'offers') {
      const result = await Product.find({
        $and: [{ $expr: { $ne: ['$oldPrice', '$actualPrice'] } }, { isActive: true }],
      }).limit(6);

      const fit = result.map((i) => {
        const product = i.toObject() as IProductPost;
        return {
          ...product,
          title: product.translations[lang]?.title,
        };
      });
      return res.send(fit);
    }

    let page = 1;
    const perPage = 9;
    const totalProducts = await Product.find({ isActive: true }).countDocuments();
    const totalPages = Math.ceil(totalProducts / perPage);

    if (req.query.page) {
      page = parseInt(req.query.page as string);

      const products = await Product.find({ isActive: true })
        .populate('category', 'title description')
        .skip((page - 1) * perPage)
        .limit(perPage);

      const fit = products.map((i) => {
        const product = i.toObject() as IProductPost;
        return {
          ...product,
          title: product.translations[lang].title,
        };
      });

      const productsWithPages = {
        productsOfPage: fit,
        currentPage: page,
        totalPages,
      };
      return res.send(productsWithPages);
    }

    if (req.query.categoryId && req.query.categoryPage) {
      const categoryPerPage = 9;
      let pageCategory = 1;

      pageCategory = +req.query.categoryPage;

      const products = await Product.find({
        category: req.query.categoryId as string,
        isActive: true,
      })
        .populate('category', 'title description')
        .skip((pageCategory - 1) * categoryPerPage)
        .limit(categoryPerPage);

      const productsTotal = await Product.find({
        category: req.query.categoryId as string,
        isActive: true,
      }).countDocuments();

      const totalPages = Math.ceil(productsTotal / categoryPerPage);

      const fit = products.map((i) => {
        const product = i.toObject() as IProductPost;
        return {
          ...product,
          title: product.translations[lang].title,
        };
      });

      const productsWithPages = {
        productsOfPage: fit,
        currentPage: pageCategory,
        totalPages,
      };

      return res.send(productsWithPages);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).send('Internal Server Error');
  }
});

productRouter.get('/:id', async (req, res) => {
  const lang = req.headers['accept-language'] || 'ru';

  try {
    const token = req.get('Authorization');
    const user = await User.findOne({ token });

    const productId = req.params.id;
    const product = await Product.findById(productId).populate({
      path: 'category',
      select: ['translations'],
      model: Category,
    });

    if (!product) {
      return res.status(404).send({ error: 'Not found' });
    }
    product.click = (product.click || 0) + 1;
    await product.save();

    if (
      (user && user.role === 'admin') ||
      (!user && product.isActive) ||
      (user && user.role === 'user' && product.isActive)
    ) {
      const productFormed = product.toObject() as IProductPost;
      const fit = {
        ...productFormed,
        title: productFormed.translations[lang].title,
        description: productFormed.translations[lang].description,
        category: {
          ...productFormed.category,
          title: productFormed.category.translations[lang].title,
        },
      };

      return res.send(fit);
    }

    return res.status(404).send({ error: 'Not found' });
  } catch {
    return res.sendStatus(500);
  }
});

productRouter.get('/:id/relatedProducts', async (req, res) => {
  const lang = req.headers['accept-language'] || 'ru';

  try {
    const token = req.get('Authorization');
    const user = await User.findOne({ token });

    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send({ error: 'Not found' });
    }

    const relatedProducts = await Product.find({
      category: product.category as string,
      isActive: true,
      _id: { $ne: productId },
    })
      .limit(4)
      .populate({
        path: 'category',
        select: ['translations'],
        model: Category,
      });

    if (!relatedProducts) {
      return res.status(404).send({ error: 'Not found' });
    }

    if (
      (user && user.role === 'admin') ||
      (!user && product.isActive) ||
      (user && user.role === 'user' && product.isActive)
    ) {
      const fit = relatedProducts.map((i) => {
        const product = i.toObject() as IProductPost;
        return {
          ...product,
          title: product.translations[lang].title,
        };
      });

      return res.send(fit);
    }

    return res.status(404).send({ error: 'Not found' });
  } catch {
    return res.sendStatus(500);
  }
});

export default productRouter;
