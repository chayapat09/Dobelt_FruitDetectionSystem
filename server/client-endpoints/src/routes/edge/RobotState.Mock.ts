import { robotState } from "@controller/EdgeData";
import { Router , Request , Response } from "express";

const router = Router();

// const packet = {
//     robotState : 1
// }

router.post('/' , async (req : Request , res : Response) => {
    const state : number = req.body.state;
    robotState(state);
    res.json({ok : true});
})

export default router;