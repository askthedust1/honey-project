import Product from '../models/Product';
import express from 'express';
import { IProductPost } from '../types';

const promotionRouter = express.Router();

promotionRouter.get('/', async (req, res) => {
  const lang = req.headers['accept-language'] || 'ru';

  try {
    const perPage = 9;
    const totalProducts = await Product.find({
      $and: [{ $expr: { $ne: ['$oldPrice', '$actualPrice'] } }, { isActive: true }],
    }).countDocuments();
    const totalPages = Math.ceil(totalProducts / perPage);

    const page1 = parseInt(req.query.page as string);

    const result = await Product.find({
      $and: [{ $expr: { $ne: ['$oldPrice', '$actualPrice'] } }, { isActive: true }],
    })
      .populate('category', 'title description')
      .skip((page1 - 1) * perPage)
      .limit(perPage);

    const fit = result.map((i) => {
      const product = i.toObject() as IProductPost;
      return {
        ...product,
        title: product.translations[lang].title,
      };
    });

    const productsWithPages = {
      productsOfPage: fit,
      currentPage: page1,
      totalPages,
    };
    return res.send(productsWithPages);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).send('Internal Server Error');
  }
});

export default promotionRouter;
