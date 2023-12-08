import express from 'express';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import Product from '../models/Product';
import Category from '../models/Category';
import User from '../models/User';
import Transaction from '../models/Transaction';

interface IAmountProducts {
  product: any;
  amount: number;
  sum: number;
}

const mainAdminRouter = express.Router();

mainAdminRouter.get('/', auth, permit('admin'), async (req, res) => {
  try {
    const products = await Product.find();
    const categories = await Category.find();
    const users = await User.find();
    const transactions = await Transaction.find();
    let sum = 0;
    transactions.forEach((transaction) => {
      transaction.kits.forEach((kit) => {
        sum += kit.price * kit.amount;
      });
    });
    const result = {
      productAmount: products.length,
      categoriesAmount: categories.length,
      usersAmount: users.length - 1,
      transactionsAmount: transactions.length,
      sumAmount: sum,
    };
    return res.send(result);
  } catch (error) {
    console.error('Error fetching', error);
    return res.status(500).send('Internal Server Error');
  }
});

mainAdminRouter.get('/hit', auth, permit('admin'), async (req, res) => {
  try {
    const transactions = await Transaction.find().populate({
      path: 'kits.product',
      select: 'actualPrice image translations.ru.title',
      populate: {
        path: 'category',
        select: 'translations.ru.title',
      },
    });

    let amounts: IAmountProducts[] = [];
    transactions.forEach((transaction) => {
      transaction.kits.forEach((kit) => {
        const productId: any = kit.product;
        const existingProduct = amounts.find(
          (anProduct) => anProduct.product._id === productId._id,
        );

        if (existingProduct) {
          existingProduct.amount += kit.amount;
          existingProduct.sum += kit.price * kit.amount;
        } else {
          const newProduct: IAmountProducts = {
            product: kit.product,
            amount: kit.amount,
            sum: kit.price * kit.amount,
          };
          amounts.push(newProduct);
        }
      });
    });
    const sortedAmounts = amounts.sort((a, b) => b.amount - a.amount);
    const top5Amounts = sortedAmounts.slice(0, 5);
    return res.send(top5Amounts);
  } catch (error) {
    console.error('Error fetching', error);
    return res.status(500).send('Internal Server Error');
  }
});

export default mainAdminRouter;
