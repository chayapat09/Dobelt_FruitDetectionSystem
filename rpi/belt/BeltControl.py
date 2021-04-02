import serial , time
import RPi.GPIO as GPIO
import threading


class ButtonHandler(threading.Thread):
    def __init__(self, pin, func , edge='both', bouncetime=200):
        super().__init__(daemon=True)

        self.edge = edge
        self.func = func
        self.pin = pin
        self.bouncetime = float(bouncetime)/1000

        self.lastpinval = GPIO.input(self.pin)
        self.lock = threading.Lock()

    def __call__(self, *args):
        if not self.lock.acquire(blocking=False):
            return

        t = threading.Timer(self.bouncetime, self.read, args=args)
        t.start()

    def read(self, *args):
        pinval = GPIO.input(self.pin)

        if (
                ((pinval == 0 and self.lastpinval == 1) and
                 (self.edge in ['falling', 'both'])) or
                ((pinval == 1 and self.lastpinval == 0) and
                 (self.edge in ['rising', 'both']))
        ):
            self.func(pinval)

        self.lastpinval = pinval
        self.lock.release()
        
class BeltControl :
    def __init__(self ,sensorCallback , stepperPin = [35,36,37,38] , motorSpeed = 4 , sensorPin = 40) :
        self.sensorCallback = sensorCallback
        self.stepperPin = stepperPin
        self.motorSpeed = motorSpeed

        GPIO.setmode(GPIO.BOARD)
        GPIO.setup(sensorPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
        cb = ButtonHandler(sensorPin, self.callback , edge='both', bouncetime=20)
        self.cb = cb
        cb.start()
        GPIO.add_event_detect(sensorPin, GPIO.RISING, callback=cb)

        for i in stepperPin :
            GPIO.setup(i,GPIO.OUT)
        self.beltState = 0
        self.sensorState = GPIO.input(sensorPin)

        
        # Update First SensorState By Reading it here
    
    def callback(self, pinVal) :
        self.sensorState = pinVal
        self.sensorCallback(pinVal)

    def loop(self) :
        # Loop control
        if self.beltState == 0 :
            self.setBeltStop()
        else :
            self.setBeltMoving()

    def setBeltState(self , state) :
        self.beltState = state

    def getBeltState(self) :
        return self.beltState

    def getSensorState(self) :
        return self.sensorState


    def rotate(self , cw) :

        for i in range(8) :
            msk = (1 << (i//2)) | ( (1 << (i//2 + 1)) if (i&1) else 0)
            for j in range(4) :
                pin = self.stepperPin[3-j] if cw else self.stepperPin[j]

                if (1 << j) & msk or (1 << (j+4)) & msk :
                    GPIO.output(pin,GPIO.HIGH)
                else:
                    GPIO.output(pin,GPIO.LOW)
            
            time.sleep(self.motorSpeed / 1000)
    
    def stopRotate(self) :
        for i in range(4) :
            GPIO.output(self.stepperPin[i],GPIO.LOW)


    def setBeltMoving(self) :
        self.rotate(False)
        
    def setBeltStop(self) :
        self.stopRotate()


# Use GPIO Zero to handle bouncing / debouncing