import express from "express";
import Category from "../models/Category";
import mongoose from "mongoose";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const categoriesRouter = express.Router();

categoriesRouter.post('/', async (req, res, next) => {

    const categoryData = {
        title: req.body.title,
        description: req.body.description,
    };

    const category = new Category(categoryData);

    try {
        await category.save();
        res.send(category);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        next(e);
    }
});

categoriesRouter.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        return res.send(categories);
    } catch(e) {
        return res.sendStatus(500);
    }
});

categoriesRouter.delete("/:id", auth, permit("admin"), async (req, res, next) => {
    try {
        const category_id = req.params.id;
        const category = await Category.findOne({ _id: category_id });

        if (!category) {
            return res.status(404).send({ error: "Not found!" });
        }

        await Category.deleteOne({ _id: category_id });
        return res.send("Category deleted");
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }
        return next(error);
    }
});

export default categoriesRouter;
