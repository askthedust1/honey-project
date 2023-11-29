import * as express from 'express';
import User from '../models/User';
import mongoose from 'mongoose';
import { OAuth2Client } from 'google-auth-library';
import config from '../config';

const usersRouter = express.Router();
const client = new OAuth2Client(config.google.clientId);

usersRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      displayName: req.body.displayName,
      phone: req.body.phone,
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

usersRouter.post('/google', async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).send({ error: 'Google login error!' });
    }

    const email = payload['email'];
    const id = payload['sub'];
    const displayName = payload['name'];

    if (!email) {
      return res.status(400).send({ error: 'Not enough user data to continue' });
    }

    let user = await User.findOne({ googleID: id });

    if (!user) {
      user = new User({
        email: email,
        password: crypto.randomUUID(),
        googleID: id,
        displayName,
      });
    }

    user.generateToken();

    await user.save();

    return res.send({ message: 'Login with Google successful!', user });
  } catch (e) {
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
    const userCheck = await User.findOne({ email: req.body.email });

    if (!userCheck) {
      return res.status(400).send({ error: 'Неправильный логин или пароль!' });
    }

    const isMatch = await userCheck.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send({ error: 'Неправильный логин или пароль!' });
    }

    userCheck.passwordConfirm = userCheck.password;
    userCheck.generateToken();
    await userCheck.save();

    const user = {
      _id: userCheck._id,
      email: userCheck.email,
      role: userCheck.role,
      token: userCheck.token,
      displayName: userCheck.displayName,
      phone: userCheck.phone,
    }

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
      return res.send(400).send({ message: 'Access denied!', userCheck: false });
    }

    return res.send({ message: 'User is admin', userCheck: true });
  } catch (e) {
    next(e);
  }
});

export default usersRouter;
