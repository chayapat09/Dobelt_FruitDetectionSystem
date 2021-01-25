import { Request, Response, Router } from 'express';
import { addModel, deleteModel, getModels } from 'src/controller/Model';
const router = Router();

/******************************************************************************
 *                      Get All Model - "GET /api/model"
 ******************************************************************************/

router.get('/' , async ( req : Request , res : Response ) => {
    await getModels(req , res);
});



/******************************************************************************
 *                       Add One Model - "POST /api/model"
 ******************************************************************************/
router.post('/' , async(req : Request , res : Response ) => {
    await addModel(req , res);
});



/******************************************************************************
 *                       Delete One Model - "Delete /api/model"
 ******************************************************************************/
router.delete('/' , async (req : Request , res : Response ) => {
    await deleteModel(req , res);
});





export default router;