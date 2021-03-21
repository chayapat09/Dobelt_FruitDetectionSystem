import { getLog } from '@controller/Log';
import { LoggingQueryResult } from '@type/client-server-type/type_logging';
import { Request, Response, Router } from 'express';

const router = Router();

/******************************************************************************
 *                      Get All Model - "GET /api/log"
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