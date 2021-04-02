import RPi.GPIO as GPIO
import threading
import Camera
import time
# Note run on boot
'''
sudo nano /etc/rc.local
add 'sudo python3 {FULLpath to this file}' to file
'''
class ButtonHandler(threading.Thread):
    def __init__(self, pin, func, edge='both', bouncetime=200):
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
            self.func(*args)

        self.lastpinval = pinval
        self.lock.release()
        
def real_cb(*args):
    print('Button Pressed!')
    Camera.TestCameraSystem()

BUTTON_PIN = 40
GPIO.setmode(GPIO.BOARD)
GPIO.setup(BUTTON_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)
cb = ButtonHandler(BUTTON_PIN, real_cb, edge='rising', bouncetime=20)
cb.start()
GPIO.add_event_detect(BUTTON_PIN, GPIO.RISING, callback=cb)
time.sleep(3600 * 100)