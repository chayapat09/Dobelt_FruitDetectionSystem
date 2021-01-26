import {Socket} from 'socket.io';

function sendToSocketsClient(sockets : Socket[] , topic : string , data : any) {
    sockets.forEach((socket) => {
        socket.emit(topic,data);
    });
}

export default sendToSocketsClient;