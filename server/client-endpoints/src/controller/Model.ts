import { ModelDao } from '@daos/Model/Model';
import { IModel } from '@entities/Model';
import { IModelManage } from 'src/type/client-server-type/type_modelManage';
import modelSelection from '@in-memory-data/selectedModel';
import mockData from './Model.mock';
import { Socket } from 'socket.io';
import modelSocket from '@in-memory-data/model-socket';

/******************************************************************************
 *                       Model - RestAPI
 ******************************************************************************/

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


/******************************************************************************
 *                       Model(Subscription) - SocketIO
 ******************************************************************************/

 export async function modelFeedSubscription(socket : Socket , model_id : string) : Promise<void> {
    modelSocket.setModel(socket , model_id);
 }

 // TODO : First Subscribe Message ?? 
 // Need to find somewhere to store lastMessage for each topic
 // And use that class to sendMessage to eachTopic instead of emit function 
 // called in topics/*/**.ts
 // 2 functionalties
 // 1. emitted message
 // 2. stored history message for each topics
 // 3. function getMessage(socket , topic) will send last message for that topic to specified socket