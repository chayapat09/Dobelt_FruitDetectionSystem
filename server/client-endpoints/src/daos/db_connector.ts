import {Db , MongoClient} from 'mongodb';
import { MONGO_DB_NAME, MONGO_URL } from '@config/mongo_config'

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
                reconnectInterval : 1000 , 
                reconnectTries : 30
            })
            .then((client) => {
                this.client = client;
                client.isConnected()
                console.log('Database Connected!');
            })
    }

    public async getDb() : Promise<Db> {
        if (this.client === null || !this.client.isConnected()) {
            console.log('Reconnecting Database!');
            try {
                await this.connect()
            }
            catch (err) {
                console.log(`Connecting To database Failed Message :\n ${err.message}`);
            }
        }

        return this.client.db(Database.dbName);
    }

}

const database = new Database();

export default database;