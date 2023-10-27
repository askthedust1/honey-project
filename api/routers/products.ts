import express from "express";
import {imagesUpload} from "../multer";
import auth from "../middleware/auth";
import mongoose from "mongoose";
import {IProductPost} from "../types";
import Product from "../models/Product";
import Category from "../models/Category";
import permit from "../middleware/permit";

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        return res.send(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).send('Internal Server Error');
    }
});

productRouter.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate({path:'category', select:['title'], model: Category});

        if (!product) {
            return res.sendStatus(404);
        }

        return res.send(product);
    } catch {
        return res.sendStatus(500);
    }
});

productRouter.post('/', auth, permit("admin"), imagesUpload.single('image'), async (req, res, next) => {
    if (!req.body.title) return  res.status(400).send({ error: "Title is required!" });
    if (!req.body.price) return  res.status(400).send({ error: "Price is required!" });
    const category = await Category.findOne({ _id: req.body.category })
    if (!category) return  res.status(400).send({ error: "No such category exists!" });

    const productData: IProductPost = {
        category: req.body.category,
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
    };

    if (req.file) {
        productData.image = req.file.filename;
    }

    const product = new Product(productData);

    try {
        await product.save();
        return res.send(product);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        next(e);
    }
});

export default productRouter;
