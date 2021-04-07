import {Socket} from 'socket.io';

function sendToSocketsClient(sockets : Socket[] , topic : string , data : any) {
    console.log(sockets);
    console.log(topic , data);
    sockets[0].emit('eiei' , 'eiee')
    sockets.forEach((socket) => {
        socket.emit(topic,data);
    });
}

export default sendToSocketsClient;