import cv2
import schedule
import time

camera_port = 0
ramp_frames = 30
lot_number = 1

def take_photo():
	camera = cv2.VideoCapture(camera_port)
	for i in range(ramp_frames):
		ret, image = camera.read()
	print("Taking image. . .")
	ret, image = camera.read()
	cv2.imwrite("parking_lot_images/"+str(lot_number)+"_"+str(int(time.time()))+".jpeg", image)
	del(camera)

schedule.every(1).minutes.do(take_photo)

while True:
	schedule.run_pending()
	time.sleep(1)


