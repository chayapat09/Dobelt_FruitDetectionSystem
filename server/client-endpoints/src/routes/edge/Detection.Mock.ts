import { detection } from "@controller/EdgeData";
import { Router , Request , Response } from "express";

const router = Router();

// const packet = {
//     result : 1
// }

router.post('/' , (req : Request , res : Response) => {
    const predictionResult : number = req.body.result;

    detection(predictionResult , '');
    
    res.json({ok : true});
})
export default router;