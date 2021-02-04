import { detection } from "@controller/EdgeData";
import { Router , Request , Response } from "express";

const router = Router();

// const packet = {
//     result : 1
// }

router.post('/' , (req : Request , res : Response) => {
    const predictionResult : number = req.body.result;
    const modelId : string = req.body.model_id;

    detection(predictionResult , modelId);
    
    res.json({ok : true});
})
export default router;