import { getGallery } from '@controller/Gallery';
import galleryDao from '@daos/Gallery/Gallery';
import { deleteNoReferenceImages, getPathToGallery } from '@shared/gallery';
import { GalleryQueryResult } from '@type/client-server-type/type_gallery';
import { Request, Response, Router } from 'express';
import { ObjectID } from 'mongodb';

import path from 'path';
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
});


/******************************************************************************
 *                      ADD image to Log_id - "POST /api/gallery/upload"
 *  @param body : {log_id : string} , 'image' field in multi-part-form uploading image files
 ******************************************************************************/

// router.post('/upload' , async (req : Request , res : Response ) => {

// });

import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, getPathToGallery())
    },
    
    filename: async function (req: Request, file: any, cb: any) {
        // Add to DB Here ?? 
        const doc_id : ObjectID = await galleryDao.add();
        const docId : string = doc_id.toHexString();
        
        const originalname : string = file.originalname;
        const splitDotName = originalname.split('.');
        const extension = splitDotName[splitDotName.length - 1];

        const fileName = docId + '.' + extension;
        
        cb(null, fileName);
    }
});

const fileFilter = (req: any,file: any,cb: any) => {
    console.log(file.mimetype);
    if(file.mimetype === "image/jpg"  || 
       file.mimetype === "image/jpeg"  || 
       file.mimetype === "image/png"){
    
    cb(null, true);
   }else{
      cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
    }
}
const upload = multer({storage: storage, fileFilter : fileFilter});

router.post('/upload', upload.single('image') , async ( req: Request , res:Response )=> {
    const file = req.file;
    const fileNameList = file.filename.split('.');
    fileNameList.pop();
    const galleryDoc_id : string = fileNameList.join('');
    const docID = new ObjectID(galleryDoc_id);
    const log_id = new ObjectID(req.body.log_id);
    await galleryDao.setUrls(
        docID , 
        log_id ,
        `/static/gallery/thumbnail/${file.filename}` ,
        `/static/gallery/full/${file.filename}` 
    );

    // await galleryDao.setUrls(
    //     doc_id , 
    //     `/static/gallery/thumbnail/${fileName}` ,
    //     `/static/gallery/full/${fileName}` 
    // );
    res.json({ok : true , filename : file.filename});
});

// post body.log_id = lo


/******************************************************************************
 *       Garbage Collection Gallery Image Files - "DELETE /api/gallery"
 ******************************************************************************/

router.delete('/' , async (req , res) => {
    await deleteNoReferenceImages();
    res.json({ok : true});

})
export default router;