import cv2
import schedule
import time
import boto3

camera_port = 0
ramp_frames = 30
lot_number = 1
bucket_name = 'cuhackit2019parkinglotimages'
folder = "parking_lot_images/"

def upload_photo(file_name):
	s3 = boto3.resource('s3')
	data = open(folder+file_name, 'rb')
	s3.Bucket(bucket_name).put_object(Key=file_name, Body=data)

def take_photo():
	camera = cv2.VideoCapture(camera_port)
	for i in range(ramp_frames):
		ret, image = camera.read()
	print("Taking image. . .")
	ret, image = camera.read()
	file_name = str(lot_number)+"_"+str(int(time.time()))+".jpeg"
	cv2.imwrite(folder+file_name, image)
	del(camera)
	upload_photo(file_name)

schedule.every(1).minutes.do(take_photo)

while True:
	schedule.run_pending()
	time.sleep(1)


