import logger from '@shared/Logger';
import SocketIO , {Socket} from 'socket.io';
//import modelSocket from '@in-memory-data/model-socket';
import {Belt} from '@service/Belt';
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

const sock = [];
io.on('connection' , (socket : Socket) => {
    logger.info(`Socket Connection from ${socket.request.socket.remoteAddress} established`);

    // On new connection
    
    sock.push(new Belt(socket));
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
