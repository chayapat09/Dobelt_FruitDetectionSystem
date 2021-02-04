import PredictionSummary from './predictionSummary.type';
import sendToSocketsClient from '../sendTo';
import {Socket} from 'socket.io';
import { PredictionSummaryTopic } from '@shared/socketTopic';

// Do logic about send to specified socket 
function send_predictionSummary(sockets : Socket[] , predictionSummary : PredictionSummary) {
    sendToSocketsClient(sockets ,PredictionSummaryTopic , predictionSummary);
}

export default send_predictionSummary;