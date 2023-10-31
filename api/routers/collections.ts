import express from "express";
import auth from "../middleware/auth";
import permit from "../middleware/permit";
import Collection from "../models/Collection";
import { Error } from 'mongoose';
import Product from "../models/Product";

const collectionRouter = express.Router();

collectionRouter.post('/', auth, permit("admin"), async (req, res, next) => {
  try {
    const { kits } = req.body;

    let totalPrice = 0;
    for (const kit of kits) {
      const product = await Product.findById(kit.product);
      if (!product) {
        return res.status(400).send({ error: "Product is nor found" });
      }
      kit.price = product.price;
      totalPrice += product.price * kit.amount;
    }

    const newCollection = new Collection({ kits, totalPrice });
    await newCollection.save();
    res.send(newCollection);

  } catch (e) {
    if (e instanceof Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

export default collectionRouter;