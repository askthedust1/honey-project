import * as express from 'express';
import mongoose from 'mongoose';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import { imagesUpload } from '../multer';
import Banner, { pipelineBanner } from '../models/Banner';
import config from '../config';
import * as fs from 'fs';

const bannersRouter = express.Router();

bannersRouter.put(
  '/:number',
  auth,
  permit('admin'),
  imagesUpload.single('image'),
  async (req, res, next) => {
    const banner_priority = req.params.number;
    const banner = await Banner.findOne({ priority: banner_priority });

    if (!banner) {
      return res.send({ error: 'Укажите очередность баннера!' });
    }

    if (req.body.translations === 'ru') {
      if (banner.translations) {
        if (banner.translations.ru) {
          banner.translations.ru.image = req.file
            ? req.file.filename
            : banner.translations.ru.image;
        }
      }
    }

    if (req.body.translations === 'en') {
      if (banner.translations) {
        if (banner.translations.en) {
          banner.translations.en.image = req.file
            ? req.file.filename
            : banner.translations.en.image;
        }
      }
    }

    if (req.body.translations === 'kg') {
      if (banner.translations) {
        if (banner.translations.kg) {
          banner.translations.kg.image = req.file
            ? req.file.filename
            : banner.translations.kg.image;
        }
      }
    }

    banner.page = req.body.page || banner.page;
    banner.description = req.body.description || banner.description;

    try {
      await banner.save();
      return res.send({ message: 'Success' });
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      next(e);
    }
  }
);

bannersRouter.get('/', async (req, res) => {
  const lang = req.headers['accept-language'] || 'ru';
  try {
    const banners = await Banner.aggregate(pipelineBanner(lang)).sort({ priority: 1 });
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

    const filePath = config.publicPath + '/' + banner.translations;
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
