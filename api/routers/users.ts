import express from "express";
import User from "../models/User";

const usersRouter = express.Router();

usersRouter.delete('/sessions', async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        if (!token) {
            return res.send({message: 'Success logout'});
        }
        const user = await User.findOne({token});

        if (!user) {
            return res.send({message: 'Success logout'});
        }

        await user.generateToken();
        user.save();
        return res.send({message: "Success logout"});
    } catch (e) {
        next(e);
    }
});

usersRouter.post('/sessions', async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).send({ error: 'Wrong password or email!' });
        }

        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch) {
            return res.status(400).send({ error: 'Wrong password or email!' });
        }

        user.generateToken();
        await user.save();

        return res.send({ message: 'Email and password correct!', user });
    } catch (e) {
        next(e);
    }
});

export default usersRouter;