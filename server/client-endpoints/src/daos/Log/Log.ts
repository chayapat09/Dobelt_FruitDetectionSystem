import database from '@daos/db_connector';
import {ILog, Log} from '@entities/Log';
import {query_filter} from '@shared/enum';
import { ObjectID } from 'mongodb';
import {ModelDao} from '@daos/Model/Model';
export interface ILogQuery {
    filter : query_filter ; 
    model_id : string ;
}

export interface ILogDao {
    getOne: (email: string) => Promise<ILog | null>;
    getAll: () => Promise<ILog[]>;
    query : (query : ILogQuery) => Promise<ILog[]>;
    add: (user: ILog) => Promise<void>;
    // update: (user: IUser) => Promise<void>;
    delete: (id: string) => Promise<void>;
}

export class LogDao implements ILogDao {

    static collectionName = 'Log';

    /**
     * @param _id
     */
    public async getOne(_id: string): Promise<ILog | null> {
        
        const db = await database.getDb();
        const collection = db.collection(LogDao.collectionName);
        const document = await collection.findOne<ILog>({
            _id : new ObjectID(_id)
        })
        
        return document;
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
     * @param query
    */
    public async query(query: ILogQuery): Promise<ILog[]> {

        if (!(query.filter in query_filter)) throw Error('Wrong filter parameter provided');

        // This Method Access ModelCollection First
        const db = await database.getDb();
        const collection = db.collection(ModelDao.collectionName);

        // No need this hard query !! -> Good point is when Model was deleted this will return []
        const result = await collection.aggregate([
            {
                $match : {
                    _id : new ObjectID(query.model_id)
                }
            },
            { 
                $lookup:
                {
                    from: LogDao.collectionName,
                    localField: '_id',
                    foreignField: 'model_id',
                    as: 'logs' 
                }
            },
            query.filter === query_filter.NO_FILTER ? {$limit : 1} : {
                $project : {
                    logs : {
                        $filter : {
                            input : '$logs',
                            as : 'log',
                            cond : {
                                $eq : [
                                    '$$log.result' , 
                                    query.filter === query_filter.NORMAL_ONLY 
                                    ? Log.RESULT_NORMAL : Log.RESULT_DEFECTED
                                ] 
                            }
                        }
                    }
                }
            }
        ]).toArray();
        return result.length > 0 ?  result[0].logs : [];
    }


    /**
     *
     * @param log
     */
    public async add(log: ILog): Promise<void> {

        const db = await database.getDb();
        const collection = db.collection(LogDao.collectionName);
        const addDoc : any = {...log};
        delete addDoc._id;
        addDoc.model_id = new ObjectID(addDoc.model_id);
        const result = await collection.insertOne(addDoc);

        if (!result.result.ok) throw Error('Insert Log into Database Failed');

        //return Promise.resolve(undefined);
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
        const db = await database.getDb();
        const collection = db.collection(LogDao.collectionName);
        const result = await collection.findOneAndDelete({_id : new ObjectID(_id)});

        if (!result.ok) throw Error('Delete Log from Database Failed');
        //return Promise.resolve(undefined);
    }
}
const logDao = new LogDao();
export default logDao;