import mongoose from "mongoose";
import Product from "./Product";

const CollectionSchema = new mongoose.Schema({
    kits: [ {
        product: {
            type: mongoose.Types.ObjectId,
            ref: 'Product',
            required: true,
            validate: {
                validator: async (value: mongoose.Types.ObjectId) => await Product.findById(value),
                message: 'Product does not exist',
            }
        },
        amount: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    } ],

    totalPrice: {
        type: Number,
        required: true,
    },
});

const Collection = mongoose.model('Collection', CollectionSchema)

export default Collection;
