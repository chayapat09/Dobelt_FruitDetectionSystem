# Belt Class that communicates with server via socket.io
# 1. Wait for event from server
# 2. Use Belt Move/stop commands
# 3. get Server last state on initialized / reconnection
# 4. and each detection event need to have eventId send with it in every req , res ?? if needed

import socketio

sio = socketio.Client()

NOT_DETECTED = 0; DETECTED = 1
BELT_STOP = 0   ; BELT_MOVE = 1

clientState = BELT_STOP
sensorState = NOT_DETECTED
# @sio.event
# def message(data):
#     print('I received a message!')

@sio.on('belt::setBeltState')
def on_message(data):
    print(data)
    return {'ok' :True}

@sio.on('belt::getStates')
def on_message(data):
    print(data)
    return {'clientState' : 0 , 'sensorState' : 0}

sio.connect('http://localhost:3000')

while True:
    sensor = int(input())
    sio.emit('belt::detectionSensorState' , sensor)