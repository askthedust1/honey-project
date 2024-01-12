import * as express from 'express';
import Category from '../models/Category';

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req, res) => {
  // const lang = req.headers['accept-language'] || 'ru';

  try {
    const categories = await Category.find({ isActive: true });
    // const categories = await Category.aggregate(pipelineCategory(lang));
    // const result = await categories;

    return res.send(categories);
  } catch (e) {
    return res.sendStatus(500);
  }
});

export default categoriesRouter;
