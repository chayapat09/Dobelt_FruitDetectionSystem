import { Router } from "express";
import detectionRouter from './Detection.Mock';
import robotStateRouter from './RobotState.Mock';

const router = Router();

router.use('/detection' , detectionRouter);
router.use('/state' , robotStateRouter);

export default router;

// Provide model to edge via http download