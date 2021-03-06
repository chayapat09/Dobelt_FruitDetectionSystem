import {Db , MongoClient} from 'mongodb';
import { MONGO_DB_NAME, MONGO_URL } from '@config/mongo_config'
import logger from '@shared/Logger';

class Database {
    static url = MONGO_URL;
    static dbName = MONGO_DB_NAME;
    
    public client : any;

    constructor() {
        this.client = null;
        this.connect();
    }

    public async connect() {

        return MongoClient.connect(
            Database.url,
            {
                // reconnectInterval : 1000 , 
                // reconnectTries : 30 , 
                useUnifiedTopology : true,
            })
            .then((client) => {
                this.client = client;
                client.isConnected()
                logger.info('Database Connected!');
            })
    }

    public async getDb() : Promise<Db> {
        if (this.client === null || !this.client.isConnected()) {
            logger.info('Reconnecting Database!');
            try {
                await this.connect()
            }
            catch (err) {
                logger.info(`Failed to Connect with database Error Message :\n ${err.message}`);
            }
        }

        return this.client.db(Database.dbName);
    }

}

const database = new Database();

export default database;