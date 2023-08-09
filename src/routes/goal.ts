import express from 'express';
const router = express.Router();
import * as goalController from '../controllers/goal';

router.get('/goals/:id', goalController.goal_get);
router.put('/goals/:id', goalController.goal_put);
router.post('/goals', goalController.goal_post);
export default router;
