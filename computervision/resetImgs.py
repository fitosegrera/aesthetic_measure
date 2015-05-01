#!/usr/bin python
import os

def main():
	os.system("rm imgs/raw-*")
	os.system("rm imgs/cv-*")
	os.system("rm imgs/qr-*")

if __name__ == "__main__":
	main()