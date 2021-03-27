# Belt Class that communicates with server via socket.io
# 1. Wait for event from server
# 2. Use Belt Move/stop commands
# 3. get Server last state on initialized / reconnection
# 4. and each detection event need to have eventId send with it in every req , res ?? if needed

import socketio
import BeltControl
import time
sio = socketio.Client()

NOT_DETECTED = 0; DETECTED = 1
BELT_STOP = 0   ; BELT_MOVE = 1

clientState = BELT_STOP
sensorState = NOT_DETECTED

def convertLocalToServerSensorEmitVal(localVal) :
    global NOT_DETECTED , DETECTED
    if localVal == 1 :
        return NOT_DETECTED
    else : return DETECTED
    return
def sensorUpdateCallback(sensorVal) :
    emitVal = convertLocalToServerSensorEmitVal(sensorVal)
    if sio.connected :
        sio.emit('belt::detectionSensorState' , emitVal)
    

belt = BeltControl.BeltControl(sensorUpdateCallback)

@sio.on('belt::setBeltState')
def on_message(data):
    targetState = data
    belt.setBeltState(targetState)
    return {'ok' :True}

@sio.on('belt::getStates')
def on_message(data):
    return {'clientState' : belt.getBeltState() , 'sensorState' : convertLocalToServerSensorEmitVal(belt.getSensorState())}

sio.connect('http://192.168.1.44:3000')


while True:
    belt.loop()
    time.sleep(0.05)
    
