import {RobotState} from './robotState.type';
import sendToSocketsClient from '../sendTo';
import {Socket} from 'socket.io';
import {RobotStateTopic} from '@shared/socketTopic'
// Do logic about send to specified socket 
function send_robotState(sockets : Socket[] , state : RobotState) {
    sendToSocketsClient( sockets , RobotStateTopic, state);
}

export default send_robotState;