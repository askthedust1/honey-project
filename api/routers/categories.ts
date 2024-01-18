import * as express from 'express';
import Category from '../models/Category';

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true });

    return res.send(categories);
  } catch (e) {
    return res.sendStatus(500);
  }
});

export default categoriesRouter;
