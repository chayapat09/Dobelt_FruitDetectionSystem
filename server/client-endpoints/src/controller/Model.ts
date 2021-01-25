import { ModelDao } from '@daos/Model/Model';
import { IModel } from '@entities/Model';
import {Request , Response} from 'express';

const modelDao = new ModelDao();
export async function getModels(req : Request , res : Response) {

    const models = await modelDao.getAll();
    res.json(models);
}

export async function addModel(req : Request , res : Response) {
    const model : IModel = req.body;
    await modelDao.add(model);
    res.json({ok : true})
}

export async function deleteModel(req : Request , res : Response) {
    const _id = req.body._id;
    await modelDao.delete(_id);
    res.json({ok : true});
}
// TODO - type validation !!