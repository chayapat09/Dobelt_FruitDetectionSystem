import time
import RPi.GPIO as GPIO
import os
import cv2
import camera.imageUpload
DIR = 15 #Orange
STP = 14 #Green
CW = 1
CCW = 0
delay = 0.001
 
GPIO.setmode(GPIO.BCM)
 
GPIO.setup(26, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(DIR, GPIO.OUT)
GPIO.setup(STP, GPIO.OUT)
 
GPIO.output(DIR, CW)
 
state = [i for i in range(7)]
 
 
STEPPER_BACKWARD = 0
STEPPER_FORWARD = 1
STEPPER_STOP  = 2
 
# 2 sensors // Emitted event for each sensors
 
class Sensor :
    def __init__(self , pin = 0) :
        self.lastState = 0
        self.nowState = 0
        self.pin = pin
        GPIO.setup(pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
 
    def readSensorValue(self) :
        readVal = 0 if GPIO.input(self.pin) == 1 else 1
 
        self.lastState = self.nowState
        self.nowState = readVal
 
 
class DetectionSensor :
    def __init__(self) :
        self.s1 = Sensor(27)
        self.s2 = Sensor(26)
 
    def updateSensorValue(self) :
        self.s1.readSensorValue()
        self.s2.readSensorValue()
 
 
class Stepper :
 
    def __init__(self) :
        self.stepCount = 0
        self.remainingSteps = 0
        self.dir = STEPPER_FORWARD
 
 
    def driveInf(self , dir) :
        # dir in [0,1] == True
        self.dir = dir
        self.remainingSteps = int(1e9 + 7)
 
    def driveStep(self , dir , step) :
        # dir in [0,1] == True
        self.dir = dir
        self.remainingSteps = step
 
    def driveControllerLoop(self) :
        # Count step here !
        if self.remainingSteps <= 0:return
        if self.dir == STEPPER_FORWARD :
            #print('drive Forward one step')
            GPIO.output(DIR, CW)
            GPIO.output(STP, GPIO.HIGH) 
            time.sleep(0.0005)
            GPIO.output(STP, GPIO.LOW) 
            time.sleep(0.0005)
        if self.dir == STEPPER_BACKWARD:
 
            #print('drive Backward one step')
        # drive One step code
            GPIO.output(DIR, CCW)
            GPIO.output(STP, GPIO.HIGH) 
            time.sleep(0.0005)
            GPIO.output(STP, GPIO.LOW) 
            time.sleep(0.0005)
 
 
        self.remainingSteps -= 1
        self.stepCount += 1
        pass
 
    def startStepCounter(self) :
        self.stepCount = 0
        pass
 
 
    def stopStepCounter(self) :
 
        pass
 
    def getStepCount(self) :
        return self.stepCount
 
    def isArrived(self) :
 
        return self.remainingSteps == 0
 

 
def capture():
    videoCaptureObject = cv2.VideoCapture(0)
    result = True
    while(result):
        ret,frame = videoCaptureObject.read()
        cv2.imwrite("img.jpg",frame)
        result = False
    videoCaptureObject.release()
    cv2.destroyAllWindows()
 
stepper = Stepper()
detectionSensors = DetectionSensor()
 
 
globalState = 0
def q0() :
    # This state are reset state
    stepper.driveInf(STEPPER_FORWARD)
    stepper.driveControllerLoop()
 
    # if sensor 1 read High -> Low
    if detectionSensors.s1.lastState == 1 and detectionSensors.s1.nowState == 0:
        q0_q1()
 
    if detectionSensors.s2.lastState == 0 and detectionSensors.s2.nowState == 1:
        q1_q2()
 
 
 
def q1() :
    # This state garuntee that obj is in between sensor 1 and 2
 
    stepper.driveControllerLoop()
    # if sensor 2 read Low -> High
    if detectionSensors.s2.lastState == 0 and detectionSensors.s2.nowState == 1 :
        q1_q2()
    pass
 
 
def q2() :
    stepper.driveControllerLoop()
    # if sensor 1 read Low -> High
    if detectionSensors.s1.lastState == 0 and detectionSensors.s1.nowState == 1 :
        q2_q3()
    pass
 
 
def q3() :
    stepper.driveControllerLoop()
 
    if stepper.isArrived() :
        print('Arrived @ center of Belt !!!')
        capture()
        camera.imageUpload.imageUpload(open('img.jpg'))
        q3_q4()
    pass
 
def q4() :
    pass
 
def q0_q1() :
    global globalState
    globalState = 1
    stepper.driveInf(STEPPER_FORWARD)
    pass
 
def q1_q2() :
    # timer start
    global globalState
    globalState = 2
    stepper.startStepCounter()
    stepper.driveInf(STEPPER_BACKWARD)
    pass
 
def q2_q3() :
    #timer stop stepper step is determined
    steps = stepper.getStepCount()
    stepper.stopStepCounter()
 
    toMoveBack = steps // 2
 
    stepper.driveStep(STEPPER_FORWARD , toMoveBack)
    global globalState
    globalState = 3
 
    pass
 
def q3_q4() :
    global globalState
    globalState = 4
    pass
 
def goToStart() :
    globalState = 0
    pass
statePtr = [q0 , q1 , q2 , q3 , q4]
def stateController() :
    # Update every Loops
    #print(globalState)
    #print(detectionSensors.s1.lastState , detectionSensors.s1.nowState)
    detectionSensors.updateSensorValue()
    statePtr[globalState]()
 
while True :
    stateController()
 
 
 