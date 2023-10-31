import express from "express";
import {IKits, IKitsMutation, ITransactionPost} from "../types";
import mongoose from "mongoose";
import Transaction from "../models/Transaction";
import auth, {RequestWithUser} from "../middleware/auth";
import Product from "../models/Product";
import permit from "../middleware/permit";

const transactionsRouter = express.Router();
transactionsRouter.get('/', async (req, res) => {
    try {
        if (req.query.user) {
            const transactions = await Transaction.find({ user: req.query.user })
                .populate('user', 'displayName')
                .populate('kits.product', 'title');
            return res.send(transactions);
        } else {
            const transactions = await Transaction.find()
                .populate('user', 'displayName')
                .populate('kits.product', 'title');
            return res.send(transactions);
        }
    } catch {
        return res.sendStatus(500);
    }
});

transactionsRouter.post('/', auth, async (req, res, next) => {
    const kits: IKitsMutation[] = req.body.kits;
    if (!kits.length) return  res.status(400).send({ error: "No kits!" });

    try {
        let fullKits: IKits[] = [];
        let totalPrice = 0;

        for (let kit of kits) {
            const product = await Product.findById(kit.product);
            if (!product) return res.status(400).send({ error: "One of the products is missing!" });

            const fullKit = {
                product: kit.product,
                amount: kit.amount,
                price: product.price
            };

            totalPrice += fullKit.price * fullKit.amount;
            fullKits.push(fullKit);
        }

        const user = (req as RequestWithUser).user;
        const transactionData: ITransactionPost = {
            user: user.id,
            kits: fullKits,
            totalPrice: totalPrice,
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

transactionsRouter.patch('/:id/toggleStatus', auth, permit("admin"), async (req, res) => {
    try {
        const id = req.params.id;

        const transaction = await Transaction.findById(id);

        if (!transaction) {
            return res.status(404).send('Not found!');
        }

        await Transaction.findByIdAndUpdate(id, {
            status: !transaction.status,
        });

        return res.send(transaction);
    } catch (e) {
        return res.status(500).send('error');
    }
});

export default transactionsRouter;
