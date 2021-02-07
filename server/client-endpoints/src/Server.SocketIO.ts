import { cors_allow_origin } from '@config/socketIO_config';
import connectedSocket from '@in-memory-data/connectedSocket';
import modelSocket from '@in-memory-data/model-socket';
import logger from '@shared/Logger';
import setModel from '@topics/client-to-cloud/setModel/setModel';
import SocketIO , {Socket} from 'socket.io';
//import modelSocket from '@in-memory-data/model-socket';

let cors = {};

if (process.env.NODE_ENV === 'development') {
    cors = {
        origin: cors_allow_origin,
        methods: ["GET", "POST"],
        credentials : true
    };
}

const io = new SocketIO.Server({
    cors: cors
});


io.on('connection' , (socket : Socket) => {
    logger.info(`Socket Connection from ${socket.request.socket.remoteAddress} established`);

    // On new connection
    connectedSocket.setSocket(socket.id , socket);

    socket.on('disconnect' , reason => {

        connectedSocket.deleteSocket(socket);
        modelSocket.deleteSocket(socket);

        logger.info(`Socket Connection from ${socket.request.socket.remoteAddress} disconnected`);
        logger.info(`Reason : ${reason}`);
    });

    // on reconnection ?


    // Event Handler
    socket.on('setModel' , (data , callback) => {
        setModel(socket , data , callback);
    });

})

export const Io = io;
