import express from 'express';
const router = express.Router();
import * as standardizedPerformancesController from '../controllers/standardizedPerformances';
router.get(
  '/standardizedPerformances',
  standardizedPerformancesController.standardized_exercise_get
);
router.get(
  '/standardizedPerformancesMax',
  standardizedPerformancesController.standardized_exercise_maxes_get
);
export default router;
