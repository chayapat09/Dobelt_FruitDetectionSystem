import { Router } from 'express';
import UserRouter from './Users';
import ModelRouter from './Model';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);

// Add sub-routes
router.use('/model', ModelRouter);

// Export the base-router
export default router;
