




state = [i for i in range(7)]

statePtr = [q0 , q1 , q2 , q3 , q4]
STEPPER_BACKWARD = 0
STEPPER_FORWARD = 1

# 2 sensors // Emitted event for each sensors

class Sensor :
    def __init__(self , pin = 0) :
        self.lastState = 0
        self.nowState = 0
        self.pin = pin

    def readSensorValue(self) :
        readVal = 0

        self.lastState = self.nowState
        self.nowState = readVal

    
class DetectionSensor :
    def __init__(self) :
        self.s1 = Sensor()
        self.s2 = Sensor()

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
        self.remainingSteps = int(1e9 + 7)

    def driveStep(self , dir , step) :
        # dir in [0,1] == True
        self.remainingSteps = step

    def driveControllerLoop(self) :
        # Count step here !
        if self.dir == STEPPER_FORWARD :
            print('drive Forward one step')
        if self.dir == STEPPER_BACKWARD:
            print('drive Backward one step')
        # drive One step code
        

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
stepper = Stepper()
detectionSensors = DetectionSensor()


globalState = 0
def q0() :
    # This state are reset state
    stepper.driveForward()
    stepper.driveControllerLoop()

    # if sensor 1 read High -> Low
    if detectionSensors.s1.lastState == 1 and detectionSensors.s1.nowState == 0:
        q0_q1()
    pass



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
    pass

def q4() :
    pass

def q0_q1() :
    globalState = 1
    stepper.driveInf(STEPPER_FORWARD)
    pass

def q1_q2() :
    # timer start
    globalState = 2
    stepper.startStepCounter()
    stepper.driveInf(STEPPER_BACKWARD)
    pass

def q2_q3() :
    #timer stop stepper step is determined
    steps = stepper.getStepCount()
    stepper.stopStepCounter()

    toMoveBack = steps // 2

    stepper.driveBackward(STEPPER_FORWARD , toMoveBack)

    globalState = 3
    
    pass

def q3_q4() :

    globalState = 4
    pass

def goToStart() :
    globalState = 0
    pass
def stateController() :
    # Update every Loops
    detectionSensors.updateSensorValue()
    statePtr[globalState]()

while True :
    stateController()
    
