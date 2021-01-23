export interface IRobotState {
    state : number ;
}

class RobotState implements IRobotState {
    static IDLE_STATE = 0;
    static WORKING_STATE = 1;
    static socketIO_topic = 'robotState'

    public state : number;
    
    constructor(state : number) {
        this.state = state;
    }
}

export default RobotState;

// Server -> Client via Socket.IO


function fromServer(state : RobotState) {
    if (state.state === RobotState.IDLE_STATE) {
        // .......
    }
    if (state.state === RobotState.WORKING_STATE) {
        // ......
    }
}
