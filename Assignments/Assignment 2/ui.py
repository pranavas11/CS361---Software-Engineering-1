# Author: Pranav Prabhu

import time
from tkinter import Button, Label, Tk
from PIL import Image

win = Tk()

def write_to_prng():
	file = open("prng-service.txt", "w")
	file.write("run")
	time.sleep(7)
	file.close()
	win.quit()

def GUI():
	win.title("Image UI")
	win.geometry("500x200")
	
	Label(win, text = "Press Button Below", font = ("Aerial 17 bold italic")).pack(padx = 50, pady = 30)
	
	btn = Button(win, text = "Click Me", width = 9, height = 5, command = write_to_prng)
	btn.place(x = 230, y = 100)

	win.mainloop()

def main():
	user_input = int(input("\n1) Generate New Image\n2) Exit\n\n\nPlease select an option: "))
	
	while user_input > 2 or user_input < 1:
		user_input = int(input("\nPlease select a valid option: "))
	
	if user_input == 1:
		print("\nUI process is listening...")
		GUI()
	else: return
	
	while True:
		file = open("prng-service.txt", "r")
		num = file.read()
		file.close()
		
		if num.isnumeric() == True:
			file = open("image-service.txt", "w")
			file.write(num)
			time.sleep(3)
			file.close()
		else:
			continue

		with open("image-service.txt") as file:
			time.sleep(7)
			path = file.read()

			if not path: continue
			else:
				img = Image.open(path)
				img.show()
				#continue
				break

main()
