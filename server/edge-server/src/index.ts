import './pre-start'; // Must be the first import
import app from '@serverExpress';
import logger from '@shared/Logger';
import { Io } from './Server.SocketIO';


// Start the server
const port = Number(process.env.PORT || 3000);
const httpServer = app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});

Io.attach(httpServer);