// Belt + Motion Sensor

import logger from "@shared/Logger";
import { socketEmit } from "@shared/socketEmit";
import EventEmitter from "events";
import { Socket } from "socket.io";


enum BELT_SERVER_STATE {
    BELT_STOP,
    BELT_MOVING,
}

export interface BeltState {
    clientState : number ; 
    sensorState : number ;
}

// TODO : Timeout -> DO a reconnection

/*
@ socket event to Edge : belt::beltState -> number
@ socket event from Edge : belt::detectionSensorState : number
*/
export class Belt extends EventEmitter {
    static NOT_DETECTED = 0; static DETECTED = 1;
    static BELT_STOP = 0;    static BELT_MOVE = 1;

    static to_beltState = 'belt::setBeltState';
    static to_getStates = 'belt::getStates';
    static from_detectionSensorState = 'belt::detectionSensorState';

    private detectionSensorState : number = 0;
    private serverState : number = 0; // ignore this replace by init // = client_state

    private socket : Socket | null = null;
    // private lastdetectionSensorEventId : string | null  = null; 

    constructor(socket : Socket) {
        super();
        this.initializedNewSocket(socket , true);
        // this.init();
        
    }

    onReconnection(socket : Socket) {
        this.initializedNewSocket(socket , false);
    }

    onDisconnected(reason : string) {
        // Off all socket then wait for garbage collector to clean things up
        if (this.socket === null) return;
        // this.unSubscribedSocketTopic(this.socket);
        
        this.socket = null;
    }

    init() {
        this.serverState = BELT_SERVER_STATE.BELT_STOP;
        this.detectionSensorState = Belt.NOT_DETECTED;
        // this.lastdetectionSensorEventId = null;
    }

    subscribedSocketTopic(socket : Socket) {
        socket.on(Belt.from_detectionSensorState , (state : number) => {
            this.detectionSensorStateCallback(state);
        });
        socket.on('disconnect' , (reason) => {
            this.onDisconnected(reason);
        });
    }
    // unSubscribedSocketTopic(socket : Socket) {
    //     socket.off(Belt.from_detectionSensorState , this.detectionSensorStateCallback);
    // }

    async initializedNewSocket(socket : Socket , fromConstructor : boolean) {
        // Load state from saved tmp or
        // Set all Belt state to default if not existed
        // Recover socket state by poll client for currrent state
        // if state match server state continue
        // else reinitialized all robot state
        // TODO : if state diff == 1 we can assume ack was corrupted
        // we can move server state to next state and continue executions
        this.socket = socket;
        // Sub first then send pingstate
        this.subscribedSocketTopic(socket);

        const res : BeltState = await socketEmit(socket , Belt.to_getStates , '');
        console.log(res);
        if (res.clientState === this.serverState && !fromConstructor) {
            // use BeltState as input for target state now garuntee no other event comes before below are executes
            this.setDetectionSensorState(res.sensorState);

        }
        else {
            // Reset all
            const res2 = await socketEmit(socket , Belt.to_beltState , Belt.BELT_STOP);
            this.init();
            await this.setDetectionSensorState(res.sensorState);
        }
    }

    // Callbacks
    detectionSensorStateCallback(state : number) {
        this.setDetectionSensorState(state);
    }


    // Setter
    private async setDetectionSensorState(state : number) {
        if (state !== Belt.NOT_DETECTED && state !== Belt.DETECTED) 
            throw Error('Detection State Error');

        try {
            if (state === Belt.DETECTED) {

                await this.stateController(Belt.BELT_STOP);
            }
            else {
                await this.stateController(Belt.BELT_MOVE);
            }
        }
        catch (err) {
            throw err;
        }
        this.detectionSensorState = state;
    }

    // Getter
    getDetectionSensorState() {
        return this.detectionSensorState
    }

    // Command to RPI

    setPhysicalBeltStop() {
        const promise = new Promise<void>( (resolve , reject) => {
            if (this.socket === null) {
                reject();
                return;
            }
            this.socket.emit(Belt.to_beltState , Belt.BELT_MOVE , (response : any) => {
                // this.serverState = BELT_SERVER_STATE.BELT_MOVING;
                resolve();
            });

        })
        return promise
    }

    setPhysicalBeltMove() {
        const promise = new Promise<void>( (resolve , reject) => {
            if (this.socket === null) {
                reject();
                return;
            }
            this.socket.emit(Belt.to_beltState , Belt.BELT_STOP , (response : any) => {
                // this.serverState = BELT_SERVER_STATE.BELT_STOP;
                resolve();
            });

        })
        return promise;
    }

    // Control

    async stateController(targetState : number) {
        // TODO : IF edge Reject ?? Retry ?? -> No because from assumption reconnection garuntee to happen
        switch (this.serverState) {
            case BELT_SERVER_STATE.BELT_MOVING:
                if (targetState === BELT_SERVER_STATE.BELT_MOVING) await this.edge_BeltMoving_BeltMoving();
                if (targetState === BELT_SERVER_STATE.BELT_STOP) await this.edge_BeltMoving_BeltStop();
                break;
            case BELT_SERVER_STATE.BELT_STOP:
                if (targetState === BELT_SERVER_STATE.BELT_MOVING) await this.edge_BeltStop_BeltMoving();
                if (targetState === BELT_SERVER_STATE.BELT_STOP) await this.edge_BeltStop_BeltStop();
                break;
            default:
                throw Error('Error @ Belt State Controller');
        }
        console.log(this.serverState === BELT_SERVER_STATE.BELT_MOVING ? 'BELT is MOVING' : 'BELT is STOP');
    }

    // stateBeltStop() {
    //  // Here was implements on physical devices
    // }

    // stateBeltMoving() {
        // Here was implements on physical devices in general cases
        // EG DIGITAL_WRITE(HIGH , 2); ... 
    // }

    async edge_BeltStop_BeltMoving() {
        try {
            await this.setPhysicalBeltMove()
            this.serverState = BELT_SERVER_STATE.BELT_MOVING;
        } 
        catch (err) {
            throw err;
        }

    }

    async edge_BeltStop_BeltStop() {
        try {
            await this.setPhysicalBeltStop()
            this.serverState = BELT_SERVER_STATE.BELT_STOP;
        } 
        catch (err) {
            throw err;
        }

    }

    async edge_BeltMoving_BeltStop() {
        try {
            await this.setPhysicalBeltStop()
            this.serverState = BELT_SERVER_STATE.BELT_STOP;
        } 
        catch (err) {
            throw err;
        }
    }

    async edge_BeltMoving_BeltMoving() {
        try {
            await this.setPhysicalBeltMove()
            this.serverState = BELT_SERVER_STATE.BELT_MOVING;
        } 
        catch (err) {
            throw err;
        }
        
    }
    
}

// Assumptions upon connection garuntees all event are received if not only case is garuntee that 
// wait for some times reconnection will triggered = reset all state/recover phase

// This emit detection Event Once to invoked that some object are detected
// Belt Stop by it's selves independently from other service
// But Belt can stop by other causes such as Dobot are @ position q2
// Dobot going in q2 -> Emit event ??
// Dobot going out q2 -> Emit event ??
// detection has queue for dobot to consume
// queue has only one waiting fruit 
// Object in queue can emit finished prediction event once

// BELT stop on (dobot on q2 || stop event)
// BELT move on (dobot not on q2 || move event)

// 1. wait conditions
// DOBOT to MOVE TO Q2 HAS TO PASS some set of constrains {await beltStop , await cameraFinishedCaptured(event_id) }

// DOBOT to MOVE TO Q4 || Q5 TO PASS some set of constrains {await prediction completes(event_id)}

// 2. some service is working perior to other service event eg. DOBOT out from q2 belt need to check that can it go to moving state
// EVERY SERVICE(DOBOT) state change emitted event to other services // Has function to check and emitted some event

// Implementation details 
// Constructed original FSM w/o constrain
// BELT consume DOBOT EVENT this working independently from others
// DOBOT CAMERA AND PREDICTION Working through RobotSequantialController
// GRIPPER as same as belt (no constrains)


// Control # Execute Path Parallelism to Balance