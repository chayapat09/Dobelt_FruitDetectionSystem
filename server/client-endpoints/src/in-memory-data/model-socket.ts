import {Socket} from 'socket.io';
export interface modelSocketPair {
    model_id : string;
    socket : Socket ;
}
export class ModelSocket {
    private modelSockets : modelSocketPair[] = [];

    // MockUp O(#Pairs) ~ O(#Client)
    public getSockets(model_id : string):Socket[] {
        const res : Socket[] = [];
        this.modelSockets.forEach(pair => {
            if (pair.model_id === model_id) {
                res.push(pair.socket);
            }
        })
        return res;
    }

    // MockUp O(#Pairs) ~ O(#Client)
    public deleteSocket(socket : Socket):void {

        const _modelSockets : modelSocketPair[] = [];
        this.modelSockets.forEach(pair => {
            if (pair.socket !== socket) {
                _modelSockets.push(pair);
            }
        });

        this.modelSockets = _modelSockets;

    }

    // Mockup O(#Pairs) ~ O(#Client)
    public setModel(socket : Socket , model_id : string) : void {
        let found = false;
        this.modelSockets.forEach(pair => {
            if (pair.socket === socket) {
                pair.model_id = model_id;
                found = true;
            }
        })

        if (!found) {
            const pair : modelSocketPair = {
                model_id : model_id , 
                socket : socket,
            };
            this.modelSockets.push(pair);
        }
    }

}
const modelSocket = new ModelSocket();
export default modelSocket;