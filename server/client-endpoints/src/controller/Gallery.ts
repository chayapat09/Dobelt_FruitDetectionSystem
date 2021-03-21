import galleryDao, { IGalleryQuery, IGalleryQueryResultFromDao } from "@daos/Gallery/Gallery";
import modelDao from "@daos/Model/Model";
import { IModel } from "@entities/Model";
import {GalleryQueryResult} from '@type/client-server-type/type_gallery'
import { ObjectID } from "mongodb";
import { createImgFile } from "@shared/gallery";
export const getGallery = async (filter : number , model_id : string ) : Promise<GalleryQueryResult> => {
    const query : IGalleryQuery = {
        model_id : model_id , 
        filter : filter 
    };

    const queryRes : IGalleryQueryResultFromDao[] = await galleryDao.query(query);
    const modelDetail : IModel | null = await modelDao.getOne(query.model_id);

    if (modelDetail === null) {
        throw new Error('Model Not Found!');
    }
    if (modelDetail._id === null) {
        throw new Error('Model.id is null');
    }

    return new GalleryQueryResult(
        modelDetail._id , 
        modelDetail.model_name , 
        modelDetail.fruit_name , 
        queryRes
    );
}

// export const addGalleryImage = async ( image : any , log_id : string) => {
//     const doc_id : ObjectID = await galleryDao.add(log_id);
//     const docId : string = doc_id.toHexString(); // Used as file_name.jpg
//     const fileName = docId + '.jpg';
//     await createImgFile(fileName , image);
//     await galleryDao.setUrls(
//         doc_id , 
//         `/api/gallery/thumbnail/${fileName}` ,
//         `/api/gallery/full/${fileName}` 
//     );
// }