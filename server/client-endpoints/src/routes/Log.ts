import { getLog } from '@controller/Log';
import { Request, Response, Router } from 'express';
import LoggingQueryResult from 'src/type/client-server-type/type_logging';

const router = Router();

/******************************************************************************
 *                      Get All Model - "GET /api/model"
 ******************************************************************************/
router.get('/' , async (req : Request , res : Response ) => {
    if (typeof req.query.filter !== 'string' || typeof req.query.model_id !== 'string') {
        res.json({ok : false});
        return;
    }
    const model_id = req.query.model_id;
    const filter = parseInt(req.query.filter);

    const logs : LoggingQueryResult = await getLog(filter , model_id);
    
    res.json(logs);
})

export default router;