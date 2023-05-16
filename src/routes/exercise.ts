import express from 'express';
const router = express.Router();
import * as exerciseController from '../controllers/exercise';

router.get('/exercises', exerciseController.exercises_get);
router.get('/exercises/:id', exerciseController.exercise_get);
router.put('/exercises/:id', exerciseController.exercise_put);
router.delete('/exercises/:id', exerciseController.exercise_delete);

export default router;
