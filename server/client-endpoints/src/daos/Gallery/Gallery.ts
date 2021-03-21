import database from '@daos/db_connector';
// import {ILog as IGallery, Log} from '@entities/Log';
import {IGallery} from '@entities/Gallery';
import {query_filter} from '@shared/enum';
import { ObjectID } from 'mongodb';
import logDao, { ILogQuery } from '@daos/Log/Log';
import { ILog } from '@entities/Log';
export interface IGalleryQuery {
    filter : query_filter ; 
    model_id : string ;
}

export interface IGalleryQueryResultFromDao {
    _id : IGallery['_id'];
    log_id : IGallery['log_id'];
    thumbnailUrl : IGallery['thumbnailUrl'];
    fullUrl : IGallery['fullUrl'];
    logDocument : ILog;
}

export interface ILogDao {
    getOne: (email: string) => Promise<IGallery | null>;
    getAll: () => Promise<IGallery[]>;
    query : (query : IGalleryQuery) => Promise<IGallery[]>;
    add: (log_id: string) => Promise<ObjectID>;
    setUrls(docId: ObjectID , log_id : ObjectID , thumbnailUrl : string , fullUrl : string) : Promise<void>
    // update: (user: IUser) => Promise<void>;
    delete: (id: string) => Promise<void>;
}

// export interface

export class GalleryDao implements ILogDao {

    static collectionName = 'Gallery';

    /**
     * @param _id
     */
    public async getOne(_id: string): Promise<IGallery | null> {
        
        const db = await database.getDb();
        const collection = db.collection(GalleryDao.collectionName);
        const document = await collection.findOne<IGallery>({
            _id : new ObjectID(_id)
        })

        return document;
    }


    /**
     *
     */
    public async getAll(): Promise<IGallery[]> {
            // TODO
        const db = await database.getDb();
        const collection = db.collection(GalleryDao.collectionName);
        const galleryResult = await collection.find<IGallery>({}).toArray();
        return galleryResult;
    }

    /**
     *
     * @param query
    */
    public async query(query: IGalleryQuery): Promise<IGalleryQueryResultFromDao[]> {

        if (!(query.filter in query_filter)) throw Error('Wrong filter parameter provided');
        const logQuery : ILogQuery = {
            model_id : query.model_id,
            filter : query.filter,
        }

        const logs_id : ObjectID[] = []
        const logs = await logDao.query(logQuery);
        const logDocuments = new Map();
        logs.forEach(log => {
            logs_id.push(new ObjectID(log._id));
            logDocuments.set(log._id , log);
        });
        // If limited needed limit before here

        const db = await database.getDb();
        const collection = db.collection(GalleryDao.collectionName);
        const galleryResult = await collection.find<IGallery>({log_id : {$in : logs_id}}).toArray();
        
        const result : IGalleryQueryResultFromDao[] = [];

        galleryResult.forEach( gallery => {
            const galleryQueryRes : IGalleryQueryResultFromDao = {
                ...gallery , 
                logDocument : logDocuments.get(gallery._id)
            }

            result.push(galleryQueryRes)
        })
        return result;

    }


    /**
     *
     * @param log
     */
    public async add(): Promise<ObjectID> {

        const db = await database.getDb();
        const collection = db.collection(GalleryDao.collectionName);
        // const _log_id = new ObjectID(log_id);    
        const addDoc = {
            // log_id : _log_id,
        }
        const result = await collection.insertOne(addDoc);
        if (!result.result.ok) throw Error('Add gallery doc Failed')
        return result.insertedId;
    }

    public async setUrls(docId : ObjectID , log_id : ObjectID, thumbnailUrl : string , fullUrl : string) : Promise<void> {
        const db = await database.getDb();
        const collection = db.collection(GalleryDao.collectionName);
        const result = await collection.findOneAndUpdate({_id : docId} , {$set : {
            log_id : log_id ,
            thumbnailUrl : thumbnailUrl , 
            fullUrl : fullUrl,
        }});

        if (!result.ok) throw Error('Set Url failed');

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
        const collection = db.collection(GalleryDao.collectionName);
        const result = await collection.findOneAndDelete({_id : new ObjectID(_id)});

        if (!result.ok) throw Error('Delete Log from Database Failed');
        //return Promise.resolve(undefined);
    }
}
const galleryDao = new GalleryDao();
export default galleryDao;