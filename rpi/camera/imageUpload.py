import requests


# open('/Users/chayapat/Desktop/frames/2021-2-16_2_1_R.jpg', 'rb')

def imageUpload(log_id = '605747214465273bf8544720' , fileBuffer = open('mock.jpg' , 'rb') ) :
    # TODO : change to Edge UPLOAD ENDPOINT
    UPLOAD_ENDPOINT = 'http://localhost:5002/api/gallery/upload' 
    files = {
        'image': (
            'img.jpg', 
            fileBuffer , 
            'image/jpeg')
    }

    data = {'log_id' : log_id}
    r1 = requests.post(UPLOAD_ENDPOINT , files = files,data = data)

