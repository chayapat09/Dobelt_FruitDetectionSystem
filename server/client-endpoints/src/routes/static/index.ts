import { getPathToGallery } from '@shared/gallery';
import express ,{ Request, Response, Router } from 'express';

const router = Router();

router.use('/gallery/thumbnail' , express.static(getPathToGallery()));
router.use('/gallery/full' , express.static(getPathToGallery()));

export default router;