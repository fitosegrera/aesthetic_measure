#!/usr/bin python
# -*- coding: utf-8 -*-

from SimpleCV import Image, Display, DrawingLayer, Color
import picamera

class Birkhoff:

	def order(self, lines, verbose):
		#calculate the order based on lines
		lineSum = 0
		vertical = 0
		horizontal = 0
		other = 0
		total = 0
		for line in lines:
			total+=1
			lineSum+=line.angle()
			if line.angle() < 95 and line.angle() > 85 or line.angle() > -95 and line.angle() < -85:
				vertical+=1
			elif line.angle() > -5 and line.angle() < 5:
				horizontal+=1
			else:
				other+=1

		averageAngle = lineSum/len(lines)

		if verbose:
			print "==============ORDER=================="
			print "total lines:", total
			print "average line angle:", averageAngle
			print "horizontal lines:", horizontal
			print "vertical lines:", vertical
			print "other lines:", other
		
		return [total, vertical, horizontal, other]
		
	#################################################

	def process(self, iname):
		
		cam = picamera.PiCamera()
		cam.capture("imgs/moment.jpg")
	
		img = Image("imgs/moment.jpg")
		flip = img.flipVertical()
		binaryFlip = flip.binarize().invert()
		edges = binaryFlip.edges()
		#boxLayer = DrawingLayer((img.width, img.height))
		#boxLayer.rectangle((0, 0), (img.width, img.height), 
		#	color=Color.BLACK, filled=True)

		print "Processing image..."
		print "Please wait"

		#winsize = (img.width, img.height)#Set size for display
		#display = Display(winsize)#Create a display

		#blobs = flip.edges().findBlobs() #make the image with only edges and finde its blobs
		#blobs.image = img
		#img.addDrawingLayer(boxLayer)

		#blobs[-1].drawHull(color=Color.BLUE)

		#Correct rotation axis
		#correctAngle = blobs[-1].angle()
		#rot = img.rotate(correctAngle)
		#blobs[-1].rotate(correctAngle)
		
		#rotBlob = rot.findBlobs()

		#flip.dl().polygon(blobs[-1].mConvexHull,color=Color.RED, width=2)

		#rot.addDrawingLayer(boxLayer)#make the rot layer black

		lines = edges.findLines(threshold=10)#find lines in rotated image
		lines.draw(width=2, color=(255,0,0))#draw all lines in rotated image

		# while not display.isDone():
		# 	#rotBlob[-1].show()
		# 	rot.show()

		flip.save("imgs/raw-" + iname + ".jpg")
		edges.save("imgs/cv-" + iname + ".jpg")
		#rot.save("imgs/" + iname + ".jpg")
		# writeToServer('imgs/saved/1.jpg')
		return [lines]
