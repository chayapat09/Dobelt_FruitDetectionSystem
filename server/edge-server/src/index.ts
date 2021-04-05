import './pre-start'; // Must be the first import
import app from '@serverExpress';
import logger from '@shared/Logger';
import { Io } from './Server.SocketIO';

import selectedModel from '@in-memory-data/selected-model';
selectedModel.setModel('600fac81a3cb0f68a033ac20');

// Start the server
const port = Number(process.env.PORT || 3000);
const httpServer = app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});

Io.attach(httpServer);