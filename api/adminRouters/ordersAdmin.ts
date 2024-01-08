import * as express from 'express';
import Transaction from '../models/Transaction';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import User from '../models/User';

const orderAdminRouter = express.Router();

orderAdminRouter.get('/', auth, permit('admin'), async (req, res) => {
  try {
    if (req.query.statusId && req.query.camePage && req.query.search) {
      const qSearch = req.query.search as string;
      console.log('into by status and name search');
      let page = 1;
      const perPage = 20;
      page = parseInt(req.query.camePage as string);

      const ordersTotal = await Transaction.find({ status: req.query.statusId }).populate({
        path: 'user',
        match: { displayName: { $regex: new RegExp(qSearch, 'i') } },
        select: 'displayName',
      });

      const filteredByTotal = ordersTotal.filter((ordersTotal) => ordersTotal.user !== null);

      const countCollection = filteredByTotal.length;

      const ordersByStatus = await Transaction.find({ status: req.query.statusId })
        .populate({
          path: 'user',
          match: { displayName: { $regex: new RegExp(qSearch, 'i') } },
          select: 'displayName phone email',
        })
        .populate('kits.product', 'title')
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ indexNumber: -1 });
      const totalPages = Math.ceil(countCollection / perPage);
      console.log(`totalpages by status=${totalPages}`);

      const filteredTransactions = ordersByStatus.filter(
        (ordersByStatus) => ordersByStatus.user !== null
      );

      const ordersWithPages = {
        ordersOfPage: filteredTransactions,
        currentPage: page,
        totalPages,
      };
      return res.send(ordersWithPages);
    }

    if (req.query.statusId && req.query.camePage && req.query.searchNum) {
      const nSearch = req.query.searchNum as string;
      console.log('into by status and Number search');
      let page = 1;
      const perPage = 20;
      page = parseInt(req.query.camePage as string);

      const ordersTotal = await Transaction.find({ status: req.query.statusId }).populate({
        path: 'user',
        match: { phone: { $regex: new RegExp(nSearch, 'i') } },
        select: 'phone',
      });

      const filteredByTotal = ordersTotal.filter((ordersTotal) => ordersTotal.user !== null);

      const countCollection = filteredByTotal.length;

      const ordersByStatus = await Transaction.find({ status: req.query.statusId })
        .populate({
          path: 'user',
          match: { phone: { $regex: new RegExp(nSearch, 'i') } },
          select: 'displayName phone email',
        })
        .populate('kits.product', 'title')
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ indexNumber: -1 });
      const totalPages = Math.ceil(countCollection / perPage);
      console.log(`totalpages by status=${totalPages}`);

      const filteredTransactions = ordersByStatus.filter(
        (ordersByStatus) => ordersByStatus.user !== null
      );

      const ordersWithPages = {
        ordersOfPage: filteredTransactions,
        currentPage: page,
        totalPages,
      };
      return res.send(ordersWithPages);
    }

    if (req.query.camePage && req.query.search) {
      console.log(req.query.search);
      console.log('into only by search');

      let page = 1;
      const perPage = 4;
      page = parseInt(req.query.camePage as string);

      const userQuery = { displayName: { $regex: new RegExp(req.query.search as string, 'i') } };
      const userResults = await User.find(userQuery).select('_id');

      const countCollection = await Transaction.countDocuments({
        $or: [{ user: { $in: userResults } }, { 'kits.product': { $in: userResults } }],
      });

      const ordersByStatus = await Transaction.find({
        $or: [{ user: { $in: userResults } }, { 'kits.product': { $in: userResults } }],
      })
        .populate({
          path: 'user',
          match: userQuery,
          select: 'displayName phone email',
        })
        .populate('kits.product', 'title')
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ indexNumber: 1 });

      const totalPages = Math.ceil(countCollection / perPage);

      const filteredTransactions = ordersByStatus.filter((order) => order.user !== null);

      const ordersWithPages = {
        ordersOfPage: filteredTransactions,
        currentPage: page,
        totalPages,
      };

      return res.send(ordersWithPages);
    }

    if (req.query.camePage && req.query.searchNum) {
      // console.log(req.query.searchNum);
      // console.log('into only by search Number');
      let page = 1;
      const perPage = 4;
      page = parseInt(req.query.camePage as string);

      const userQuery = { phone: { $regex: new RegExp(req.query.searchNum as string, 'i') } };
      const userResults = await User.find(userQuery).select('_id');

      const countCollection = await Transaction.countDocuments({
        $or: [{ user: { $in: userResults } }, { 'kits.product': { $in: userResults } }],
      });

      const ordersByStatus = await Transaction.find({
        $or: [{ user: { $in: userResults } }, { 'kits.product': { $in: userResults } }],
      })
        .populate({
          path: 'user',
          match: userQuery,
          select: 'displayName phone email',
        })
        .populate('kits.product', 'title')
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ indexNumber: 1 });

      const totalPages = Math.ceil(countCollection / perPage);

      const filteredTransactions = ordersByStatus.filter((order) => order.user !== null);

      const ordersWithPages = {
        ordersOfPage: filteredTransactions,
        currentPage: page,
        totalPages,
      };

      return res.send(ordersWithPages);
    }

    if (req.query.statusId && req.query.camePage) {
      // console.log('into by only status');
      let page = 1;
      const perPage = 4;
      page = parseInt(req.query.camePage as string);

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

    if (req.query.camePage && req.query.search) {
      const qSearch = req.query.search as string;
      // console.log(req.query.search);
      // console.log('into only by search');
      let page = 1;
      const perPage = 4;
      page = parseInt(req.query.camePage as string);

      const ordersTotal = await Transaction.find().populate({
        path: 'user',
        match: { displayName: { $regex: new RegExp(qSearch, 'i') } },
        select: 'displayName',
      });

      const filteredByTotal = ordersTotal.filter((ordersTotal) => ordersTotal.user !== null);

      const countCollection = filteredByTotal.length;

      const ordersByStatus = await Transaction.find()
        .populate({
          path: 'user',
          match: { displayName: { $regex: new RegExp(qSearch, 'i') } },
          select: 'displayName phone email',
        })
        .populate('kits.product', 'title')
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ indexNumber: 1 });
      const totalPages = Math.ceil(countCollection / perPage);

      const filteredTransactions = ordersByStatus.filter(
        (ordersByStatus) => ordersByStatus.user !== null
      );

      const ordersWithPages = {
        ordersOfPage: filteredTransactions,
        currentPage: page,
        totalPages,
      };
      return res.send(ordersWithPages);
    }

    if (req.query.camePage && !req.query.search) {
      // console.log('into only by some page');
      let page = 1;
      page = parseInt(req.query.camePage as string);
      const perPage = 20;
      const totalOrders = await Transaction.countDocuments();

      const totalPages = Math.ceil(totalOrders / perPage);

      const ordersByThisPage = await Transaction.find()
        .populate('user', 'displayName phone email')
        .populate('kits.product', 'title')
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ indexNumber: 1 });

      const ordersWithPages = {
        ordersOfPage: ordersByThisPage,
        currentPage: page,
        totalPages,
      };

      return res.send(ordersWithPages);
    }

    console.log('into by ALL FULL');
    const transactions = await Transaction.find()
      .populate('user', 'displayName')
      .populate('kits.product', 'title');
    return res.send(transactions);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).send('Internal Server Error');
  }
});

orderAdminRouter.get('/:id', auth, permit('admin'), async (req, res) => {
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

orderAdminRouter.get('/new', auth, permit('admin'), async (req, res) => {
  console.log('get request for transaction new');
  try {
    console.log('get request for transaction new');
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

orderAdminRouter.patch('/:id/toggleStatus', auth, permit('admin'), async (req, res) => {
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

export default orderAdminRouter;
