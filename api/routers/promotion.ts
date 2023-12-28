import Product from "../models/Product";
import express from "express";

const promotionRouter = express.Router();

promotionRouter.get('/', async (req, res) => {
    try {
        let page1 = 1;
        const perPage = 9;
        const totalProducts = await Product.find({
            $and: [{ $expr: { $ne: ['$oldPrice', '$actualPrice'] } }, { isActive: true }]
        }).countDocuments();
        const totalPages = Math.ceil(totalProducts / perPage);

        page1 = parseInt(req.query.page as string);

        const result = await Product.find({
            $and: [{ $expr: { $ne: ['$oldPrice', '$actualPrice'] } }, { isActive: true }]
        })        .populate('category', 'title description')
            .skip((page1 - 1) * perPage)
            .limit(perPage);

        const productsWithPages = {
            productsOfPage: result,
            currentPage: page1,
            totalPages,
        };
        return res.send(productsWithPages);

    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).send('Internal Server Error');
    }
});

export default promotionRouter;
