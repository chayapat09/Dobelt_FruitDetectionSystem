import logDao from '@daos/Log/Log';
import { Log } from '@entities/Log';
import connectedSocket from '@in-memory-data/connectedSocket';
import modelSocket from '@in-memory-data/model-socket';
import send_predictionSummary from '@topics/cloud-to-client/predictionSummary/predictionSummary';
import PredictionSummary from '@topics/cloud-to-client/predictionSummary/predictionSummary.type';
import send_robotState from '@topics/cloud-to-client/robotState/robotState';
import RobotState from '@topics/cloud-to-client/robotState/robotState.type';
import { Socket } from 'socket.io';

export const robotState = (robotState : number) => {
    const state : RobotState = {
        state : robotState
    };
    
    const allSocket : Socket[] = connectedSocket.getAllSocket();
    send_robotState(allSocket , state);
}

export const detection = async (detectionResult : any , model_id : string ) => {
    // Add to Log DB
    const log : Log = new Log(model_id,new Date() , detectionResult);
    const addedLogId = await logDao.add(log);

    // Send out new Result (Log aggregation)
    const summaryQueryResult = await logDao.getSummary(model_id);

    const predictionSummary : PredictionSummary = {
        model_id : model_id , 
        defected : summaryQueryResult.defected , 
        detected : summaryQueryResult.detected , 
        normal : summaryQueryResult.normal ,  
    };
    
    const sockets : Socket[] = modelSocket.getSockets(model_id);
    send_predictionSummary(sockets , predictionSummary);

    return addedLogId
}
// Need to send model_id because if model is change between prediction consistence state only edge will know