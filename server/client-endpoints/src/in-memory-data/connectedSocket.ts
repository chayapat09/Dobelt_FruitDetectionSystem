import { Socket } from "socket.io";

class ConnectedSocket {
    private connectedClientSocket : Map<string,Socket> = new Map();
    
    public getSocket(_id :string) : Socket | undefined {
        return this.connectedClientSocket.get(_id);
    }

    public setSocket(_id : string , socket : Socket) {
        this.connectedClientSocket.set(_id , socket);
    }


    public deleteSocket(param : Socket) {
        // if (param instanceof Socket) {
        //     this.connectedClientSocket.delete(param.id)
        // }

        // if (typeof param === 'string') {
        //     this.connectedClientSocket.delete(param);
        // }
            this.connectedClientSocket.delete(param.id);
    }

    public getAllSocket() : Socket[] {
        const result : Socket[] = [];
        this.connectedClientSocket.forEach( (socket) => {
            result.push(socket);
        })

        return result;
    }
}
const connectedSocket = new ConnectedSocket();
export default connectedSocket;