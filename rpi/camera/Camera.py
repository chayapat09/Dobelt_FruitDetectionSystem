# Camera Class that communicates with server via socket.io and restapi
# 1. Wait for event from server
# 2. Capture camera
# 3. upload to server
# 4. and each detection event need to have eventId send with it in every req , res ?? if needed
import imageUpload
import picamera
import requests

def TestCameraSystem() :
    with picamera.PiCamera(resolution='640x480', framerate=24) as camera:
        output = StreamingOutput()
        #Uncomment the next line to change your Pi's Camera rotation (in degrees)
        #camera.rotation = 180
        #camera.meter_mode = 'backlit'
        camera.brightness = 60
        #camera.led = True
        camera.capture('mock.jpg')
        data = {'model_id' : '600fac81a3cb0f68a033ac20' , 'result' : 0}
        r = requests.post('161.200.199.2:5002/edge/detection' , data = data)
        result = r.json()
        imageUpload.imageUpload(result['log_id'])


