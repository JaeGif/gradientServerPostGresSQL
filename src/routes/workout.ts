import express from 'express';
const router = express.Router();
import * as workoutController from '../controllers/workout';

router.get('/workouts', workoutController.workouts_get);
router.get('/workouts/:id', workoutController.workout_get);
router.put('/workouts/:id', workoutController.workout_put);
router.delete('/workouts/:id', workoutController.workout_delete);

export default router;
