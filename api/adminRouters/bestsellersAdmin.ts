import express from 'express';
import auth from '../middleware/auth';
import Product from '../models/Product';
import Category from '../models/Category';
import permit from '../middleware/permit';

const bestsellersAdminRouter = express.Router();

bestsellersAdminRouter.get('/', auth, permit('admin'), async (req, res) => {
  try {
    const category = req.query.category;
    if (category) {
      const result = await Product.find({
        category: category,
        isActive: true,
        isHit: false,
      }).populate({
        path: 'category',
        select: ['translations'],
        model: Category,
      });
      return res.send(result);
    } else {
      const result = await Product.find({
        isActive: true,
        isHit: false,
      }).populate({
        path: 'category',
        select: ['translations'],
        model: Category,
      });
      return res.send(result);
    }
  } catch (e) {
    return res.status(500).send('Internal Server Error');
  }
});

bestsellersAdminRouter.get('/:id', auth, permit('admin'), async (req, res) => {
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

    await Product.findByIdAndUpdate(productId, {
      isHit: true,
    });

    return res.send(product);
  } catch {
    return res.sendStatus(500);
  }
});

bestsellersAdminRouter.patch('/:id', auth, permit('admin'), async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).populate({
      path: 'product',
      select: 'translations.ru.title',
    });

    if (!product) {
      return res.status(404).send('Not found!');
    }

    await Product.findByIdAndUpdate(id, {
      isHit: true,
    });

    return res.send(product);
  } catch (e) {
    return res.status(500).send('error');
  }
});

bestsellersAdminRouter.patch('/:id/hit', auth, permit('admin'), async (req, res) => {
  try {
    const id = req.params.id;
    const bestseller = await Product.findById(id);

    if (!bestseller) {
      return res.status(404).send('Not found!');
    }

    await Product.findByIdAndUpdate(id, {
      isHit: false,
    });

    return res.send(bestseller);
  } catch (e) {
    return res.status(500).send('error');
  }
});
export default bestsellersAdminRouter;
