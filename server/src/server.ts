import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dbConnect from './config/mongoose';
import { PORT } from './config/VARS';
import router from './routes/index.routes';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);

const initialize = async () => {
  await dbConnect();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

initialize();
