import * as express from 'express';
import mongoose from 'mongoose';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import {imagesUpload} from "../multer";
import {IBannerPost} from "../types";
import Banner from "../models/Banner";
import config from "../config";
import * as fs from "fs";

const bannersRouter = express.Router();

bannersRouter.post('/', auth, permit('admin'), imagesUpload.single('image'), async (req, res, next) => {
    const bannerData: IBannerPost = {
        description: req.body.description,
    };

    if (req.file) {
        bannerData.image = req.file.filename;
    }

    const banner = new Banner(bannerData);

    try {
        await banner.save();
        res.send(banner);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        next(e);
    }
});

bannersRouter.get('/', async (req, res) => {
    try {
        const banners = await Banner.find();
        return res.send(banners);
    } catch (e) {
        return res.sendStatus(500);
    }
});

bannersRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const banner_id = req.params.id;
        const banner = await Banner.findOne({ _id: banner_id });

        if (!banner) {
            return res.status(404).send({ error: 'Not found!' });
        }

        await Banner.deleteOne({ _id: banner_id });

        const filePath = config.publicPath + '/' + banner.image;
        fs.unlinkSync(filePath);

        return res.send('Banner deleted');
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }
        return next(error);
    }
});

export default bannersRouter;
