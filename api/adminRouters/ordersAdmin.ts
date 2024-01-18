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

      const perPage = 10;
      const page = parseInt(req.query.camePage as string);

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

      const perPage = 10;
      const page = parseInt(req.query.camePage as string);

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
      const perPage = 10;
      const page = parseInt(req.query.camePage as string);

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
        .sort({ indexNumber: -1 });

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
      const perPage = 10;
      const page = parseInt(req.query.camePage as string);

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
        .sort({ indexNumber: -1 });

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
      const perPage = 10;
      const page = parseInt(req.query.camePage as string);

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
        .sort({ indexNumber: -1 });
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

      const perPage = 10;
      const page = parseInt(req.query.camePage as string);

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
        .sort({ indexNumber: -1 });
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
      const page = parseInt(req.query.camePage as string);
      const perPage = 10;
      const totalOrders = await Transaction.countDocuments();
      const totalPages = Math.ceil(totalOrders / perPage);

      const ordersByThisPage = await Transaction.find()
        .populate('user', 'displayName phone email')
        .populate('kits.product', 'title')
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ indexNumber: -1 });

      const ordersWithPages = {
        ordersOfPage: ordersByThisPage,
        currentPage: page,
        totalPages,
      };

      return res.send(ordersWithPages);
    }

    const transactions = await Transaction.find()
      .populate('user', 'displayName')
      .populate('kits.product', 'title');
    return res.send(transactions);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).send('Internal Server Error');
  }
});

export default orderAdminRouter;
