import { detection } from "@controller/EdgeData";
import { Router , Request , Response } from "express";

const router = Router();

// const packet = {
//     result : 1
// }

router.post('/' , async (req : Request , res : Response) => {
    const predictionResult : number = ((typeof req.body.result === 'string') ? parseInt(req.body.result) : req.body.result);
    const modelId : string = req.body.model_id;
    console.log(req.body);
    const log_id = await detection(predictionResult , modelId);
    // TODO : return log_id to client
    res.json({ok : true , log_id : log_id});
})
export default router;