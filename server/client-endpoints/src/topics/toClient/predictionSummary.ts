import Summary from 'src/type/client-server-type/type_summary';
import sendToSocketsClient from '../sendTo';
import {Socket} from 'socket.io';

// Do logic about send to specified socket 
function send_predictionSummary(sockets : Socket[] , predictionSummary : Summary) {
    sendToSocketsClient(sockets ,Topic.RobotStateTopic , predictionSummary);
}

export default send_predictionSummary;