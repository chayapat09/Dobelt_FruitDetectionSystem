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
    def __init__(self ,sensorCallback, port = '/dev/ttyUSB0' , brudrate = 9600 , sensorPin = 37) :
        self.sensorCallback = sensorCallback
        self.uart = serial.Serial(port,brudrate,timeout=0)
        self.uart.close()
        self.uart.open()
        GPIO.setmode(GPIO.BOARD)
        GPIO.setup(sensorPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
        cb = ButtonHandler(sensorPin, self.callback , edge='both', bouncetime=20)
        self.cb = cb
        cb.start()
        GPIO.add_event_detect(sensorPin, GPIO.RISING, callback=cb)
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
    def setBeltMoving(self) :
        self.uart.write('1'.encode())
        
    def setBeltStop(self) :
        self.uart.write('0'.encode())


