import { Request, Response, Router } from 'express';
import { addModel, deleteModel, getModels, selectModel, updateModel } from '@controller/Model';
const router = Router();

/******************************************************************************
 *                      Get All Model - "GET /api/model"
 ******************************************************************************/
router.get('/' , async ( req : Request , res : Response ) => {
    const models = await getModels();
    res.json(models);
});



/******************************************************************************
 *                       Add One Model - "POST /api/model"
 ******************************************************************************/
router.post('/' , async(req : Request , res : Response ) => {
    await addModel(req.body);
    res.json({ok : true});
});



/******************************************************************************
 *                       Update One Model - "PUT /api/model"
 ******************************************************************************/
router.put('/' , async(req : Request , res : Response ) => {
    await updateModel(req.body);
    res.json({ok : true});
});



/******************************************************************************
 *                       Delete One Model - "DELETE /api/model"
 ******************************************************************************/
router.delete('/' , async (req : Request , res : Response ) => {
    await deleteModel(req.body._id);
    res.json({ok : true});
});



/******************************************************************************
 *                       Select One Model - "POST /api/model/select"
 ******************************************************************************/
router.post('/select' , async (req : Request , res : Response) => {
    selectModel(req.body._id);
    res.json('ok');
})

export default router;