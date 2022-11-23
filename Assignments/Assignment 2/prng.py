# Author: Pranav Prabhu

import random
import time

def prng_service():
	print("\nPRNG process is listening...\n")

	time.sleep(3)

	while True:
		file = open("prng-service.txt", "r")
		line = file.readline()

		if line == "run":
			print("Generating a random number ...\n")

			random_num = random.randint(1, 9)
			time.sleep(1)
			print("Random number generated: ", random_num)
			line = line.replace(line, str(random_num))			
			file.close()
	
			with open(r'prng-service.txt', 'w') as file:
				file.write(line)
			file.close()
		else:
			continue
			# break

prng_service()