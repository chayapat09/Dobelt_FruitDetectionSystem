import './pre-start'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
import database from '@daos/db_connector';

// Start mongoDb connector

database.getDb().then(db => {
    console.log(db.databaseName);
})

setInterval(() => database.getDb().then(db => console.log(db.databaseName)) , 1000);
// Start Express server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});

// start Command : DEBUG=client-endpoints:* npm start