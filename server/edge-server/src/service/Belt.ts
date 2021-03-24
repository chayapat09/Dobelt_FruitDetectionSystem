// Belt + Motion Sensor

import logger from "@shared/Logger";
import EventEmitter from "node:events";
import { Socket } from "socket.io";


enum STATE {
    BELT_STOP,
    BELT_MOVING,
}
/*
@ socket event to Edge : belt::beltState -> number
@ socket event from Edge : belt::detectionSensorState : number
*/
class Belt extends EventEmitter {
    static NOT_DETECTED = 0; static DETECTED = 1;
    static BELT_STOP = 0;    static BELT_MOVE = 1;

    static to_beltState = 'belt::beltState';
    static from_detectionSensorState = 'belt::detectionSensorState';

    private detectionSensorState : number = Belt.NOT_DETECTED;
    private socket : Socket | null;

    private serverState : number = 0;

    constructor(socket : Socket) {
        super();
        this.socket = socket;


        socket.on('belt::detectionSensorState' , this.detectionSensorStateCallback);
        this.initializedNewSocket(socket);
    }

    initializedNewSocket(socket : Socket) {
        // Load state from saved tmp or
        // Set all Belt state to default if not existed
        socket.emit('belt::beltState' , Belt.BELT_STOP);
    }

    // Callbacks
    detectionSensorStateCallback(state : number) {
        this.setDetectionSensorState(state);
    }


    // Setter
    private setDetectionSensorState(state : number) {
        if (state !== Belt.NOT_DETECTED && state !== Belt.NOT_DETECTED) 
            throw Error('Detection State Error');
            this.stateController(state);
        this.detectionSensorState = state;
    }

    // Getter
    getDetectionSensorState() {
        return this.detectionSensorState
    }

    deActivate() {
        // Off all socket then wait for garbage collector to clean things up
        if (this.socket === null) return;
        this.socket.off('belt::detectionSensorState' , this.detectionSensorStateCallback);
        this.socket = null;
    }

    // Control

    async stateController(targetState : number) {
        // TODO : IF edge Reject ?? Retry ??
        switch (this.serverState) {
            case STATE.BELT_MOVING:
                if (targetState === STATE.BELT_MOVING) await this.edge_BeltMoving_BeltMoving();
                if (targetState === STATE.BELT_STOP) await this.edge_BeltMoving_BeltStop();
                break;
            case STATE.BELT_STOP:
                if (targetState === STATE.BELT_MOVING) await this.edge_BeltStop_BeltMoving();
                if (targetState === STATE.BELT_STOP) await this.edge_BeltStop_BeltStop();
                break;
            default:
                throw Error('Error @ Belt State Controller');
        }
    }

    stateBeltStop() {
        // Do Once
    }

    stateBeltMoving() {

    }

    edge_BeltStop_BeltMoving() {
        
        const promise = new Promise<void>( (resolve , reject) => {
            if (this.socket === null) {
                reject();
                return;
            }
            this.socket.emit(Belt.to_beltState , Belt.BELT_MOVE , (response : any) => {
                this.serverState = STATE.BELT_MOVING;
                resolve();
            });

        })
        return promise;

    }

    edge_BeltStop_BeltStop() {
        
        const promise = new Promise<void>( (resolve , reject) => {
            if (this.socket === null) {
                reject();
                return;
            }
            this.socket.emit(Belt.to_beltState , Belt.BELT_STOP , (response : any) => {
                this.serverState = STATE.BELT_STOP;
                resolve();
            });

        })
        return promise;

    }

    edge_BeltMoving_BeltStop() {
        const promise = new Promise<void>( (resolve , reject) => {
            if (this.socket === null) {
                reject();
                return;
            }
            this.socket.emit(Belt.to_beltState , Belt.BELT_STOP , (response : any) => {
                this.serverState = STATE.BELT_STOP;
                resolve();
            });

        })
        return promise;    
        
    }

    edge_BeltMoving_BeltMoving() {
        const promise = new Promise<void>( (resolve , reject) => {
            if (this.socket === null) {
                reject();
                return;
            }
            this.socket.emit(Belt.to_beltState , Belt.BELT_MOVE , (response : any) => {
                this.serverState = STATE.BELT_MOVING;
                resolve();
            });

        })
        return promise;    
        
    }
    
}