import { ModelDao } from '@daos/Model/Model';
import { IModel } from '@entities/Model';
import {Request , Response} from 'express';

const modelDao = new ModelDao();
export async function getModels() : Promise<IModel[]> {

    const models = await modelDao.getAll();

    return models;
}

export async function addModel(model : IModel) : Promise<void> {

    await modelDao.add(model);
    
}

export async function deleteModel(_id : string) :Promise<void> {

    await modelDao.delete(_id);

}
// TODO - type validation !!