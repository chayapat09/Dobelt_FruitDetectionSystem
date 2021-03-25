import { Socket } from "socket.io"

export const socketEmit = (socket : Socket , event : string , value : any , timeout = 5000) => {

    const promise = new Promise<any>( (resolve , reject) => {

        let resolved = false;
        socket.emit(event , value, (response : any) => {
            resolve(response);
            resolved = true;
        });
        if (timeout > 0) {
            setTimeout( () => {
                if (!resolved) {
                    reject();
                }
            } , timeout)

        }
    });

    return promise;
}