import express from 'express';
const router = express.Router();
import * as userController from '../controllers/user';

router.get('/users', userController.users_get);
router.get('/users/:id', userController.user_get);
router.post('/users/emailcheck', userController.user_emailcheck);

router.put('/users/:id', userController.user_put);
router.delete('/users/:id', userController.user_delete);

export default router;
