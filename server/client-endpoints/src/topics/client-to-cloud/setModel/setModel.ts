import { modelFeedSubscription } from "@controller/Model";
import { Socket } from "socket.io";
import { ISetModel } from "./setModel.type";


async function setModel(socket : Socket , model : ISetModel , ackCallback : any) {

    if (typeof model.model_id !== 'string') {
        ackCallback({ok : false});
        return;
    }
    // TODO : Error Handle (if needed)
    await modelFeedSubscription(socket , model.model_id);

    ackCallback({ok : true});
}

export default setModel;

// Method 1 Setmodel does not send lastMessage client has to do it manually via getLastMessage Topic
// Method 2 send Last Message via ackCallback

// Perfer 1 -> client no need to implement any thing more

// Prodecure sendToTopic_{topic}(...params) -> send to all sockets in model[i]

// Prodecure getLastMessage(topic , socket) -> access SocketEmission Layer that stored Last Message and send to that topic
// SocketEmission Layer store GroupQueryParams for each message { model : 'dgdfgdfg' , params2 : 'dfgsdsf' , params3 : 'sdfsdf' } like 3 Ways TableDb

// All Emission need to do via That Layer