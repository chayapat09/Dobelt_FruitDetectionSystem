import RobotState from './robotState.type';
import sendToSocketsClient from '../sendTo';
import {Socket} from 'socket.io';
// Do logic about send to specified socket 
function send_robotState(sockets : Socket[] , state : RobotState) {
    sendToSocketsClient( sockets ,Topic.RobotStateTopic , state);    
}

export default send_robotState;