import modelDao from '@daos/Model/Model';
import { IModel } from '@entities/Model';
import modelSelection from '@in-memory-data/selected-model';


async function mockData() {
    const models : IModel[] = await modelDao.getAll();
    const randIdx = Math.floor(Math.random() * models.length);
    modelSelection.setModel(models[randIdx % models.length]._id);
}

export default mockData;