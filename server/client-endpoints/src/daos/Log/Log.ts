import {ILog} from '@entities/Log';
import {query_filter} from '@shared/enum';

export interface ILogQuery {
    filter : query_filter
    model_id : string 
}

export interface ILogDao {
    getOne: (email: string) => Promise<ILog | null>;
    getAll: () => Promise<ILog[]>;
    query : (query : ILogQuery) => Promise<ILog[]>;
    add: (user: ILog) => Promise<void>;
    // update: (user: IUser) => Promise<void>;
    delete: (id: string) => Promise<void>;
}

export class UserDao implements ILogDao {


    /**
     * @param _id
     */
    public getOne(_id: string): Promise<ILog | null> {
        // TODO
        return Promise.resolve(null);
    }


    /**
     *
     */
    public getAll(): Promise<ILog[]> {
            // TODO
        return Promise.resolve([]);
    }

    /**
     *
     * @param id
    */
    public async query(id: ILogQuery): Promise<ILog[]> {
        // TODO
    return Promise.resolve([]);
}


    /**
     *
     * @param log
     */
    public async add(log: ILog): Promise<void> {
            // TODO
        return Promise.resolve(undefined);
    }


    // /**
    //  *
    //  * @param user
    //  */
    // public async update(user: ILog): Promise<void> {
    //         // TODO
    //     return Promise.resolve(undefined);
    // }


    /**
     *
     * @param id
     */
    public async delete(_id: string): Promise<void> {
            // TODO
        return Promise.resolve(undefined);
    }
}

