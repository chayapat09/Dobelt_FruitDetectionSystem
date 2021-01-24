import './pre-start'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
import database from '@daos/db_connector';
import {PORT} from '@config/express_config';

// Start mongoDb connector
database.client;

// Start Express server

app.listen(PORT, () => {
    logger.info('Express server started on port: ' + PORT);
});

// start Command : DEBUG=client-endpoints:* npm start