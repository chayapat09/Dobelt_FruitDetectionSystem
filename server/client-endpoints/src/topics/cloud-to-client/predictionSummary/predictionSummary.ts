import PredictionSummary from './predictionSummary.type';
import sendToSocketsClient from '../sendTo';
import {Socket} from 'socket.io';

// Do logic about send to specified socket 
function send_predictionSummary(sockets : Socket[] , predictionSummary : PredictionSummary) {
    sendToSocketsClient(sockets ,Topic.RobotStateTopic , predictionSummary);
}

export default send_predictionSummary;