import { IModel } from "@entities/Model";

export interface IModelDao {
    getOne: (id: string) => Promise<IModel | null>;
    getAll: () => Promise<IModel[]>;
    add: (model: IModel) => Promise<void>;
    update: (model: IModel) => Promise<void>;
    delete: (id: string) => Promise<void>;
}

class ModelDao implements IModelDao {


    /**
     * @param _id
     */
    public getOne(email: string): Promise<IModel | null> {
        // TODO
        return Promise.resolve(null);
    }


    /**
     *
     */
    public getAll(): Promise<IModel[]> {
         // TODO
        return Promise.resolve([]);
    }


    /**
     *
     * @param model
     */
    public async add(model: IModel): Promise<void> {
         // TODO
        return Promise.resolve(undefined);
    }


    /**
     *
     * @param model
     */
    public async update(model: IModel): Promise<void> {
         // TODO
        return Promise.resolve(undefined);
    }


    /**
     *
     * @param id
     */
    public async delete(id: string): Promise<void> {
         // TODO
        return Promise.resolve(undefined);
    }
}

export default ModelDao;
