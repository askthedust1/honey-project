import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';
import categoriesRouter from './routers/categories';
import usersRouter from './routers/users';
import productRouter from './routers/products';
import transactionsRouter from './routers/transactions';
import collectionRouter from './routers/collections';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/categories', categoriesRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/transactions', transactionsRouter);
app.use('/collections', collectionRouter);
const run = async () => {
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch((e) => console.error(e));
