import express from 'express';
const router = express.Router();
import * as userController from '../controllers/user';

router.get('/users', userController.users_get);

export default router;
