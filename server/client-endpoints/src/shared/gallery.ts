import path from 'path';
import fs from 'fs-extra';

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