import express from 'express';
const router = express.Router();
import * as userController from '../controllers/user';

router.get('/users', userController.users_get);
router.get('/users/:id', userController.user_get);

export default router;
