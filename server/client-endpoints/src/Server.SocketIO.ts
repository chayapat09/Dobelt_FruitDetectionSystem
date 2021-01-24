import { cors_allow_origin } from '@config/socketIO_config';
import logger from '@shared/Logger';
import SocketIO , {Socket} from 'socket.io';


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

const connectedClientSocket : Map<string,Socket> = new Map();

io.on('connection' , (socket : Socket) => {
    logger.info(`Socket Connection from ${socket.request.socket.remoteAddress} established`);

    connectedClientSocket.set(socket.id , socket);

    socket.on('disconnect' , reason => {
        connectedClientSocket.delete(socket.id);

        logger.info(`Socket Connection from ${socket.request.socket.remoteAddress} disconnected`);
        logger.info(`Reason : ${reason}`);
    })

})

export const ClientSockets = connectedClientSocket;
export const Io = io;
