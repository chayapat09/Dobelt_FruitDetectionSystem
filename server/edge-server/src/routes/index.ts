import { Router } from 'express';
import PredictionRouter from './Prediction';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/prediction' , PredictionRouter);

// Export the base-router
export default router;