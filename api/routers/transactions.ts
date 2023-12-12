import * as express from 'express';
import mongoose from 'mongoose';
import { IKits, IKitsMutation, ITransactionPost } from '../types';
import Transaction from '../models/Transaction';
import Product from '../models/Product';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';

const transactionsRouter = express.Router();
transactionsRouter.get('/', auth, permit('admin'), async (req, res) => {
  console.log(req.query);
  try {
    if (req.query.statusId && req.query.statusPage) {
      // console.log('statusPage router');
      let page = 1;
      const perPage = 20;
      page = parseInt(req.query.statusPage as string);

      const ordersTotal = await Transaction.find({
        status: req.query.statusId as string,
      }).countDocuments();

      const ordersByStatus = await Transaction.find({
        status: req.query.statusId as string,
      })
        .populate('user', 'displayName phone email')
        .populate('kits.product', 'title')
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ indexNumber: 1 });
      const totalPages = Math.ceil(ordersTotal / perPage);

      const ordersWithPages = {
        ordersOfPage: ordersByStatus,
        currentPage: page,
        totalPages,
      };

      return res.send(ordersWithPages);
    }

    if (req.query.orderPage) {
      // console.log('orderPage router');
      let page = 1;
      page = parseInt(req.query.orderPage as string);
      console.log(page);
      const perPage = 20;
      const totalOrders = await Transaction.countDocuments();
      //общее количество заказов в базе данных с использованием метода countDocuments
      const totalPages = Math.ceil(totalOrders / perPage);
      //общее количество страниц

      const ordersByThisPage = await Transaction.find()
        .populate('user', 'displayName phone email')
        .populate('kits.product', 'title')
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ indexNumber: 1 });

      //skip((page - 1) * perPage):
      // page - текущая страница, которую хотим получить.
      // perPage - количество элементов на одной странице.
      // (page - 1) * perPage вычисляет, сколько документов следует пропустить, чтобы начать с нужной страницы

      console.log(ordersByThisPage)

      const ordersWithPages = {
        ordersOfPage: ordersByThisPage,
        currentPage: page,
        totalPages,
      };

      return res.send(ordersWithPages);
    }

    // console.log('orderPage ALL router');

    const transactions = await Transaction.find()
      .populate('user', 'displayName')
      .populate('kits.product', 'title');
    return res.send(transactions);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).send('Internal Server Error');
  }
});

transactionsRouter.get('/history', auth, async (req, res) => {
  const user = (req as RequestWithUser).user;
  try {
    const transactions = await Transaction.find({ user: user._id, status: true }).populate(
      'kits.product',
      'title',
    );
    console.log(transactions[0].kits)

    return res.send(transactions);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).send('Internal Server Error');
  }
});

transactionsRouter.get('/new', auth, permit('admin'), async (req, res) => {
  try {
    const transactions = await Transaction.find({ status: false })
      .populate('user', 'displayName phone')
      .populate({
        path: 'kits.product',
        select: 'actualPrice image translations.ru.title isHit',
        populate: {
          path: 'category',
          select: 'translations.ru.title',
        },
      });
    return res.send(transactions);
  } catch {
    return res.sendStatus(500);
  }
});

transactionsRouter.get('/user/:date', auth, async (req, res) => {
  const user = (req as RequestWithUser).user;
  try {
    if (!user._id) {
      return res.status(400).send({ error: 'Invalid user ID' });
    }

    const transactions = await Transaction.findOne({ user: user._id, dateTime: req.params.date })
      .populate('user', 'displayName')
      .populate({
        path: 'kits.product',
        select: 'translations image',
      });

    return res.send(transactions);
  } catch {
    return res.sendStatus(500);
  }
});

transactionsRouter.post('/', auth, async (req, res, next) => {
  const kits: IKitsMutation[] = req.body.kits;
  if (!kits.length) return res.status(400).send({ error: 'No kits!' });

  try {
    const fullKits: IKits[] = [];
    let totalPrice = 0;

    for (const kit of kits) {
      const product = await Product.findById(kit.product);
      if (!product) return res.status(400).send({ error: 'One of the products is missing!' });

      const fullKit = {
        product: kit.product,
        amount: kit.amount,
        price: product.actualPrice,
      };

      totalPrice += fullKit.price * fullKit.amount;
      fullKits.push(fullKit);
    }

    const lastDocument = await Transaction.findOne().sort({ indexNumber: -1 });

    let indexNumberCount = 1;

    if (lastDocument && lastDocument.indexNumber) {
      indexNumberCount = lastDocument.indexNumber + indexNumberCount;
    }

    const user = (req as RequestWithUser).user;
    const transactionData: ITransactionPost = {
      indexNumber: indexNumberCount,
      user: user.id,
      kits: fullKits,
      totalPrice: totalPrice,
      address: req.body.address,
      dateTime: req.body.dateTime,
      status: false,
    };

    const transaction = new Transaction(transactionData);

    await transaction.save();
    return res.send(transaction);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    next(e);
  }
});

transactionsRouter.patch('/:id/toggleStatus', auth, permit('admin'), async (req, res) => {
  console.log('orderToggle');
  try {
    const id = req.params.id;
    console.log(id);
    const transaction = await Transaction.findById(id);
    console.log(transaction);

    if (!transaction) {
      return res.status(404).send('Not found!');
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      {
        status: !transaction.status,
      },
      { new: true },
    );

    return res.send(updatedTransaction);
  } catch (e) {
    return res.status(500).send('error');
  }
});

// findByIdAndUpdate поумолчанию возвращает документ до его обновления, а НЕ ПОСЛЕ.
// { new: true } вернет обновленный документ, а не оригинальный.

export default transactionsRouter;
