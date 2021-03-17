import { Router } from 'express';
import UserRouter from './Users';
import ModelRouter from './Model';
import LogRouter from './Log';
import GalleryRouter from './Gallery';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);

// Add sub-routes
router.use('/model', ModelRouter);
router.use('/log' , LogRouter);
router.use('/gallery' , GalleryRouter);
// Export the base-router
export default router;
