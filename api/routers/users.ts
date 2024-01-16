import * as express from 'express';
import User from '../models/User';
import mongoose from 'mongoose';

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
  try {
    if (req.body.password !== req.body.passwordConfirm) {
      return res.status(400).send({ error: 'Пароль не совпадает!' });
    }

    const user = new User({
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName,
      phone: req.body.phone,
      address: req.body.address || null,
    });

    user.generateToken();

    await user.save();
    return res.send({ message: 'Success', user });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get('Authorization');

    if (!token) {
      return res.send({ message: 'Success logout' });
    }
    const user = await User.findOne({ token });

    if (!user) {
      return res.send({ message: 'Success logout' });
    }

    user.generateToken();
    await user.save();
    return res.send({ message: 'Success logout' });
  } catch (e) {
    next(e);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send({ error: 'Неправильный логин или пароль!' });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send({ error: 'Неправильный логин или пароль!' });
    }

    user.generateToken();
    await user.save();

    return res.send({ message: 'Email and password correct!', user });
  } catch (e) {
    next(e);
  }
});

usersRouter.get('/roleCheck', async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const userCheck = await User.findOne({ token });

    if (!userCheck) {
      return res.send({ message: 'Access denied!', userCheck: false });
    }

    const isAdmin = userCheck.role === 'admin';

    if (!isAdmin) {
      return res.send({ message: 'Access denied!', userCheck: false });
    }

    return res.send({ message: 'User is admin', userCheck: true });
  } catch (e) {
    next(e);
  }
});

export default usersRouter;
