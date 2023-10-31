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

collectionRouter.delete('/:id',  auth, permit("admin"),async (req, res) => {
  try {
    const collectionId = req.params.id;
    const collection = await Collection.findOne({ _id: collectionId });

    if (!collection) {
      return res.status(404).send({ error: "Not found!" });
    }

    await Collection.deleteOne({ _id: collectionId });
    return res.send("Collection deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

export default collectionRouter;