export const NORMAL = 0;
export const DEFECTED = 1;

export const predictionService = async (imageFile : Express.Multer.File , selectedModelId : string) => {
    const fileBuffer = imageFile.buffer;
    // model file selectedModelId.{extension}
    // Call python asyncronously to predict 


    return NORMAL

}