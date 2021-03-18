import { getPathToGallery } from '@shared/gallery';
import express ,{ Request, Response, Router } from 'express';

const router = Router();

router.use('/thumbnail' , express.static(getPathToGallery()));
router.use('/full' , express.static(getPathToGallery()));

export default router;