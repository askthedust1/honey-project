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

export default usersRouter;