import path from 'path';
import * as dotenv from 'dotenv';

const pathEnvFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';

const rootPath = __dirname;
dotenv.config({ path: pathEnvFile });

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  port: parseInt(process.env.PORT || '8000'),
  db: 'mongodb://0.0.0.0:27017/honey-test',
};

export default config;
