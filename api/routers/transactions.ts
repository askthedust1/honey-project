import * as express from 'express';
import mongoose from 'mongoose';
import { IKits, IKitsMutation, ITransactionPost } from '../types';
import Transaction from '../models/Transaction';
import Product from '../models/Product';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';

const transactionsRouter = express.Router();

transactionsRouter.get('/:id', auth, permit('admin'), async (req, res) => {
  try {
    const order = await Transaction.findById(req.params.id)
      .populate('user', 'displayName phone email')
      .populate({
        path: 'kits',
        populate: {
          path: 'product',
          model: 'Product',
          populate: {
            path: 'translations.ru',
            model: 'Product',
            select: 'title',
          },
        },
      });
    if (!order) {
      return res.sendStatus(404);
    }
    return res.send(order);
  } catch {
    return res.sendStatus(500);
  }
});

transactionsRouter.get('/new/history', auth, async (req, res) => {
  const user = (req as RequestWithUser).user;
  const lang = req.headers['accept-language'] || 'ru';
  try {
    const transactions = await Transaction.find({ user: user._id })
      .limit(20)
      .populate({
      path: 'kits',
      populate: {
        path: 'product',
        model: 'Product',
        populate: {
          path: 'translations.ru',
          model: 'Product',
          select: 'title',
        },
      },
    });

    const fit = transactions.map((i) => {
      const transaction = i.toObject();
      return {
        ...transaction,
        kits: i.kits.map((k) => {
          const kit = k.toObject();
          return {
            ...kit,
            product: {
              ...kit.product,
              title: kit.product.translations[lang].title,
              description: kit.product.translations[lang].description,
            },
          };
        }),
      };
    });

    return res.send(fit);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).send('Internal Server Error');
  }
});

transactionsRouter.get('/new/orders', auth, permit('admin'), async (req, res) => {
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
      payment: req.body.payment,
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
  try {
    const id = req.params.id;
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).send('Not found!');
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      {
        status: !transaction.status,
      },
      { new: true }
    );

    return res.send(updatedTransaction);
  } catch (e) {
    return res.status(500).send('error');
  }
});

export default transactionsRouter;
