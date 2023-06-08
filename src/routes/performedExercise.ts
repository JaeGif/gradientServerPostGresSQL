import express from 'express';
const router = express.Router();
import * as performedExerciseController from '../controllers/performedExercise';

router.get(
  '/performedExercises',
  performedExerciseController.performed_exercises_get
);
router.get(
  '/performedExercises/:id',
  performedExerciseController.performed_exercise_get
);
router.post(
  '/performedExercises',
  performedExerciseController.performed_exercises_post
);
router.post(
  '/performedExercises/:id',
  performedExerciseController.performed_exercises_post
);

export default router;
