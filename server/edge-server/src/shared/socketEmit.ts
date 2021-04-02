import { Socket } from "socket.io"

export const socketEmit = (socket : Socket , event : string , value : any , timeout = 5000) => {

    const promise = new Promise<any>( (resolve , reject) => {

        socket.emit(event , value, (response : any) => {
            resolve(response);
        });
        if (timeout > 0) {
            setTimeout( () => {
                    reject(new Error('socket Emit Timeout'));
            } , timeout);

        }
    });

    return promise;
}