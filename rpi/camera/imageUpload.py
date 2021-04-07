import requests


# open('/Users/chayapat/Desktop/frames/2021-2-16_2_1_R.jpg', 'rb')

def imageUpload( fileBuffer ) :
    # TODO : change to Edge UPLOAD ENDPOINT
    UPLOAD_ENDPOINT = 'http://161.200.199.2:5000/api/prediction' 
    files = {
        'image': (
            'img.jpg', 
            fileBuffer , 
            'image/jpeg')
    }

    data = {}
    r1 = requests.post(UPLOAD_ENDPOINT , files = files,data = data)
