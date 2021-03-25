import logger from '@shared/Logger';
import SocketIO , {Socket} from 'socket.io';
//import modelSocket from '@in-memory-data/model-socket';

let cors = {};

// if (process.env.NODE_ENV === 'development') {
//     cors = {
//         origin: cors_allow_origin,
//         methods: ["GET", "POST"],
//         credentials : true
//     };
// }

const io = new SocketIO.Server({
    cors: cors
});


io.on('connection' , (socket : Socket) => {
    logger.info(`Socket Connection from ${socket.request.socket.remoteAddress} established`);

    // On new connection

    socket.on('disconnect' , reason => {


        logger.info(`Socket Connection from ${socket.request.socket.remoteAddress} disconnected`);
        logger.info(`Reason : ${reason}`);
    });

    // on reconnection ?


    // Event Handler
})

export const Io = io;

/*
onConnect -> Send ping to device to gather information what robot_id and device is this
ConnectionController Send socket to Service

*/
