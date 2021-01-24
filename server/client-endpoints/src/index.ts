import './pre-start'; // Must be the first import
import app from '@serverExpress';
import {Io} from '@serverSocketIO';
import logger from '@shared/Logger';
import database from '@daos/db_connector';
import {PORT} from '@config/express_config';
import ModelDao from '@daos/Model/Model';
// Start mongoDb connector
database.client;

// Start Express server

const httpServer = app.listen(PORT, () => {
    logger.info('Express server started on port: ' + PORT);
});

// Attatch socket.io to httpServer
Io.attach(httpServer);


// start Command : DEBUG=client-endpoints:* npm start