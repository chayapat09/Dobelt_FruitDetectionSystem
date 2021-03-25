import path from 'path';
import fs from 'fs-extra';
import galleryDao from '@daos/Gallery/Gallery';
import logger from './Logger';

const PATH_TO_GALLERY = '../../../gallery-dobelt'; // DON'T Export
export const getPathToGallery = () => {
    return path.resolve(PATH_TO_GALLERY)
}
/*
@fileName includes file extension
@file -> to be buffer ?
*/
export const createImgFile = async (fileName : string , file : any) => {
    const filePath = path.join(PATH_TO_GALLERY,fileName);
    await fs.writeFile(filePath , file);
}

export const deleteNoReferenceImages = async () => {
    const galleryPath = getPathToGallery();
    const fileList = await fs.readdir(galleryPath);
    const re = /.{24}\../;
    const gallery = await galleryDao.getAll();

    const existFileName = new Set();

    gallery.forEach(doc => {
        existFileName.add(doc._id);
    });
    fileList.forEach(fileName => {
        if (re.test(fileName) && !existFileName.has(fileName.substr(0 , 24) )) {
            fs.remove(path.join(galleryPath , fileName) , (err) => {
                if (err) {
                    logger.info(`File : ${fileName} Delete Failed!`);
                    return;
                }
                logger.info(`File : ${fileName} Deleted`);
            });
        }
    });
}

//6f457432a71e.jpg
//60576e82f16b