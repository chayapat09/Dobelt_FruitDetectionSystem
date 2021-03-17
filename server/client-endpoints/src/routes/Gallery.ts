import { getGallery } from '@controller/Gallery';
import { GalleryQueryResult } from '@type/client-server-type/type_gallery';
import { Request, Response, Router } from 'express';

const router = Router();

/******************************************************************************
 *                      Get All Model - "GET /api/gallery"
 ******************************************************************************/
router.get('/' , async (req : Request , res : Response ) => {
    if (typeof req.query.filter !== 'string' || typeof req.query.model_id !== 'string') {
        throw Error('filter or model_id wrong!');
    }
    const model_id = req.query.model_id;
    const filter = parseInt(req.query.filter);

    const gallerys : GalleryQueryResult = await getGallery(filter , model_id);
    
    res.json(gallerys);
})

export default router;