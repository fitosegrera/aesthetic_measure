#!/usr/bin python
import paramiko
from scp import SCPClient
import birkhoff
import urllib2
import uuid
from contextlib import closing
import pyqrcode

def main():
	name = generateName()
	b = birkhoff.Birkhoff()
	lines = b.process(name)
	lineInfo = b.order(lines[0], True)
	qrCode(name)
	print "Writing to server"
	transferFile('imgs/raw-' + name + '.jpg', '/var/www/fii.to/public_html/apps/aesthetic_measure/server/imgs')
	transferFile('imgs/cv-' + name + '.jpg', '/var/www/fii.to/public_html/apps/aesthetic_measure/server/imgs')
	transferFile('imgs/qr-' + name + '.png', '/var/www/fii.to/public_html/apps/aesthetic_measure/server/imgs')
	with closing(urllib2.urlopen("http://fii.to:3000/db?iname="+name+"&total="+str(lineInfo[0])+"&vertical="+str(lineInfo[1])+"&horizontal="+str(lineInfo[2]))):
		print "finished!"

def generateName():
	imgName = str(uuid.uuid4())
	imgName = imgName.replace("-","")
	print "==========================="
	print "file:", imgName, "created"
	return imgName

def qrCode(name):
	url = pyqrcode.create('http://fii.to:3000/image?name='+name)
	url.png('imgs/qr-' + name + '.png', scale=6, module_color=(0, 0, 0, 255), background=(0xff, 0xff, 0xff))

def transferFile(origin, destination):
	hostname = 'fii.to'
	port = 22
	username = 'root'
	password = 'Fito_1015!'
	ssh = paramiko.SSHClient()
	ssh.load_system_host_keys()
	ssh.connect(hostname, username=username, password=password)
	scp = SCPClient(ssh.get_transport())
	scp.put(origin, destination)

if __name__ == "__main__":
	main()
