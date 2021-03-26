import serial , time
import RPi.GPIO as GPIO
import threading


class ButtonHandler(threading.Thread):
    def __init__(self, pin, func, beltControl , edge='both', bouncetime=200):
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
            self.func(beltControl,*args)

        self.lastpinval = pinval
        self.lock.release()
        
def real_cb(beltControl , *args):
    print('Button Pressed!')
    Camera.TestCameraSystem()


class BeltControl :
    def __init__(self , port , brudrate = 9600 , sensorPin = 37) :
        #self.uart = serial.Serial(port,brudrate,timeout=0)
        #self.uart.open()
        self.uart = 'ok'
        GPIO.setmode(GPIO.BOARD)
        GPIO.setup(sensorPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
        cb = ButtonHandler(sensorPin, self.callback, self , edge='both', bouncetime=20)
        self.cb = cb
        cb.start()
        GPIO.add_event_detect(sensorPin, GPIO.RISING, callback=cb)


    def callback(self ,beltControl, *args) :
        print('CallBack')
        print(self.uart)
    def loop(self) :
        # Loop control
        pass 



