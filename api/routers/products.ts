import express from 'express';
import Product from '../models/Product';
import Category from '../models/Category';
import User from '../models/User';
import { IProduct, IProductPost } from '../types';

const productRouter = express.Router();

interface ProductQuery {
  isActive: boolean;
  category?: string;
}

const getProductsQuery = (
  isActive: boolean,
  categoryId?: string
): { amount: { $gt: number }; isActive: boolean } => ({
  isActive,
  amount: { $gt: 0 },
  ...(categoryId && { category: categoryId }),
});

const getSortQuery = (sortType?: string): Record<string, 1 | -1> => {
  switch (sortType) {
    case 'priceDown':
      return { actualPrice: -1 };
    case 'priceUp':
      return { actualPrice: 1 };
    case 'title':
      return { datetime: -1 };
    default:
      return {};
  }
};

async function getProductsWithPages(
  query: ProductQuery,
  page: number,
  perPage: number,
  lang: string,
  sortType?: string
): Promise<{ productsOfPage: IProduct[]; currentPage: number; totalPages: number }> {
  const totalProducts = await Product.countDocuments(query);
  const totalPages = Math.ceil(totalProducts / perPage);

  const products = await Product.find(query)
    .populate('category', 'title description')
    .sort(getSortQuery(sortType))
    .skip((page - 1) * perPage)
    .limit(perPage)
    .lean();

  const fit = products.map((product) => {
    const translations = product.translations as Record<
      string,
      { title: string; description: string } | undefined
    >;
    const title = translations[lang]?.title ?? 'Default Title';
    return {
      ...product,
      title,
    };
  });

  return { productsOfPage: fit as IProduct[], currentPage: page, totalPages };
}

productRouter.get('/', async (req, res) => {
  try {
    const lang = req.headers['accept-language'] || 'ru';
    const { filterBy, categoryId } = req.query;
    const perPage = 9;

    const sort = req.query.sort as string;
    const page = typeof req.query.page === 'string' ? parseInt(req.query.page) : 1;
    const categoryPage =
      typeof req.query.categoryPage === 'string' ? parseInt(req.query.categoryPage) : 1;

    if (filterBy && filterBy === 'hit') {
      const result = await Product.find({
        $and: [{ isHit: true }, { isActive: true }, { amount: { $gt: 0 } }],
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
        $and: [{ isHit: false }, { isActive: true }, { amount: { $gt: 0 } }],
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
        $and: [
          { $expr: { $ne: ['$oldPrice', '$actualPrice'] } },
          { isActive: true },
          { amount: { $gt: 0 } },
        ],
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

    const categoryIdStr = typeof categoryId === 'string' ? categoryId : undefined;

    if (categoryIdStr) {
      const query = getProductsQuery(true, categoryIdStr);
      const productsWithPages = await getProductsWithPages(
        query,
        categoryPage,
        perPage,
        lang,
        sort
      );
      return res.send(productsWithPages);
    }

    const query = getProductsQuery(true);
    const productsWithPages = await getProductsWithPages(query, page, perPage, lang, sort);
    return res.send(productsWithPages);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
});

productRouter.get('/search', async (req, res) => {
  try {
    const lang = req.headers['accept-language'] || 'ru';
    const search = req.query.q as string;
    const regex = new RegExp(search, 'i');

    const productPerPage = 9;
    const page = parseInt(req.query.page as string) || 1;

    if (search) {
      const searchField = `translations.${lang}.title`;
      const query = {
        isActive: true,
        amount: { $gt: 0 },
        [searchField]: regex,
      };

      const productsTotal = await Product.countDocuments(query);
      const totalPages = Math.ceil(productsTotal / productPerPage);

      const products = await Product.find(query)
        .skip((page - 1) * productPerPage)
        .limit(productPerPage)
        .lean();

      const fit = products.map((product) => {
        const translations = product.translations as Record<
          string,
          | {
              title: string;
              description: string;
            }
          | undefined
        >;
        const title = translations[lang]?.title ?? 'Default Title';
        return {
          ...product,
          title,
        };
      });

      const productsWithPages = {
        productsOfPage: fit,
        currentPage: page,
        totalPages,
      };

      return res.send(productsWithPages);
    }
  } catch {
    return res.sendStatus(500);
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
      amount: { $gt: 0 },
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
