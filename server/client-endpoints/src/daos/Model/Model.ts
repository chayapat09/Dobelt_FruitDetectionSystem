import database from "@daos/db_connector";
import { IModel } from "@entities/Model";
import { ObjectID } from "mongodb";

export interface IModelDao {
    getOne: (_id: string) => Promise<IModel | null>;
    getAll: () => Promise<IModel[]>;
    add: (model: IModel) => Promise<void>;
    update: (model: IModel) => Promise<void>;
    delete: (id: string) => Promise<void>;
}


// Used exception interupted as if Error on database happen

class ModelDao implements IModelDao {
    static collectionName = 'Model';

    /**
     * @param _id
     */
    public async getOne(_id: string): Promise<IModel | null> {
        // TODO
        const db = await database.getDb()
        const collection = db.collection(ModelDao.collectionName);
        const document = await collection.findOne<IModel>({_id : new ObjectID(_id)});
        
        return document;
    }


    /**
     *
     */
    public async getAll(): Promise<IModel[]> {
        const db = await database.getDb()
        const collection = db.collection(ModelDao.collectionName);
        const cursor = await collection.find<IModel>({});
        const documents = await cursor.toArray();
        return Promise.resolve(documents);
    }


    /**
     *
     * @param model
     */
    public async add(model: IModel): Promise<void> {
        const db = await database.getDb()
        const collection = db.collection(ModelDao.collectionName);
        const addDoc : any = {...model};
        delete addDoc._id;

        const result = await collection.insertOne(addDoc);    
    }


    /**
     *
     * @param model 
     */
    public async update(model: IModel): Promise<void> {
        // TODO

        // const db = await database.getDb()
        // const collection = db.collection(ModelDao.collectionName);
        // collection.findOneAndUpdate({_id : model._id} , model)
    }


    /**
     *
     * @param id
     */
    public async delete(_id: string): Promise<void> {
        const db = await database.getDb()
        const collection = db.collection(ModelDao.collectionName);
        const result = await collection.deleteOne({_id :new ObjectID(_id)});
        if (!result.result.ok) throw Error(`Delete Database failed @Model _id : ${_id}`);
    }
}

export default new ModelDao();
