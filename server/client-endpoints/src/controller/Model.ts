import { ModelDao } from '@daos/Model/Model';
import { IModel } from '@entities/Model';
import { IModelManage } from 'src/type/client-server-type/type_modelManage';
import modelSelection from '@in-memory-data/selected-model';
import mockData from './Model.mock';

mockData();

const modelDao = new ModelDao();

export async function getModels() : Promise<IModelManage> {

    const models = await modelDao.getAll();

    const selectedModel : string | null = modelSelection.getSelectedModel();

    const sendOutModel : IModelManage = {
        modelDatas : models ,
        selectedModel : selectedModel
    }

    return sendOutModel;
}

export async function addModel(model : IModel) : Promise<void> {
    model.addDate = new Date();
    await modelDao.add(model);
    
}

export async function updateModel(model : IModel) : Promise<void> {
    await modelDao.update(model);
}

export async function deleteModel(_id : string) :Promise<void> {

    await modelDao.delete(_id);

}

export async function selectModel(_id : string) : Promise<void> {

    modelSelection.setModel(_id);

}
// TODO - type validation !!