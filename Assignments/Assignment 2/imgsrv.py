# Author: Pranav Prabhu

import time
import os

def image_service():
	print("\nIMGSRV process is listening...\n")
	
	while True:
		with open("image-service.txt") as file:
			num = file.read()
			time.sleep(1)

			if not num:
				continue
		
			if (num.isnumeric() == True):
				path = "./images/"
				images = os.listdir(path)
				
				if int(num) <= len(images):
					image_path = path + str(images[int(num) - 1])
				else:
					image_num = int(num) % len(images)
					image_path = path + str(images[image_num])
		
				with open("image-service.txt", "w") as object:
					object.write(image_path)

				print("Path:", image_path)

				file.close()
			else:
				continue
				# break

image_service()