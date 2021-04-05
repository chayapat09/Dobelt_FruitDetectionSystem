import { predictionController } from '@controller/PredictionController';
import { Request, Response, Router } from 'express';
import multer from 'multer';

const router = Router();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, getPathToGallery())
//     },
    
//     filename: async function (req: Request, file: any, cb: any) {
//         // Add to DB Here ?? 
//         const doc_id : ObjectID = await galleryDao.add();
//         const docId : string = doc_id.toHexString();
        
//         const originalname : string = file.originalname;
//         const splitDotName = originalname.split('.');
//         const extension = splitDotName[splitDotName.length - 1];

//         const fileName = docId + '.' + extension;
        
//         cb(null, fileName);
//     }
// });

var storage = multer.memoryStorage()

const fileFilter = (req: any,file: any,cb: any) => {
    if(file.mimetype === "image/jpg"  || 
       file.mimetype === "image/jpeg"  || 
       file.mimetype === "image/png"){
    
    cb(null, true);
   }else{
      cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
    }
}
const upload = multer({storage: storage, fileFilter : fileFilter});

router.post('/', upload.single('image') , async ( req: Request , res:Response )=> {
    const file = req.file;
    // console.log(file.buffer);
    await predictionController(file);

    res.json({ok : true});
});

export default router;