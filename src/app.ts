import express from 'express';
const app = express();
import path from 'path';
import bodyParser from 'body-parser';

import userRouter from './routes/user';

require('dotenv').config();

import cors from 'cors';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', userRouter);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
