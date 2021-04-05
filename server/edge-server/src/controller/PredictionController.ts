import selectedModel from "@in-memory-data/selected-model";
import { cloudLoggingService } from "@service/CloudLogging";
import { predictionService } from "@service/Prediction"

export const predictionController = async (imageFile : Express.Multer.File) => {
    
    // Prediction
    const selectedModelId = selectedModel.getSelectedModel();
    if (selectedModelId === null) throw Error('Prediction Model not Selected !');

    const result : number = await predictionService(imageFile , selectedModelId); // {0,1}

    // Send to cloud (non blocking command)
    cloudLoggingService(imageFile , result , selectedModelId);

    return {result : result};
}