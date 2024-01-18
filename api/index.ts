import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';
import categoriesRouter from './routers/categories';
import usersRouter from './routers/users';
import productRouter from './routers/products';
import transactionsRouter from './routers/transactions';
import bannersRouter from './routers/banners';
import productAdminRouter from './adminRouters/productsAdmin';
import categoriesAdminRouter from './adminRouters/categoriesAdmin';
import mainAdmin from './adminRouters/mainAdmin';
import promotionRouter from './routers/promotion';
import orderAdminRouter from './adminRouters/ordersAdmin';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/categories', categoriesRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/transactions', transactionsRouter);
app.use('/banners', bannersRouter);
app.use('/admin', productAdminRouter);
app.use('/adminCategories', categoriesAdminRouter);
app.use('/adminMain', mainAdmin);
app.use('/promotion', promotionRouter);
app.use('/adminOrder', orderAdminRouter);

const run = async () => {
  await mongoose.connect(config.db);

  app.listen(config.port, () => {
    console.log(`Server started on ${config.port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch((e) => console.error(e));
