import express from 'express';
const app = express();
import path from 'path';
import bodyParser from 'body-parser';

import userRouter from './routes/user';
import workoutRouter from './routes/workout';
import exerciseRouter from './routes/exercise';
import authRouter from './routes/auth';
import authMiddleware from './middleware/auth';
const authMiddleWareUser = authMiddleware;
require('dotenv').config();

import cors from 'cors';
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/api', userRouter);
app.use('/api', workoutRouter);
app.use('/api', exerciseRouter);

app.listen(process.env.PORT || 3001, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
