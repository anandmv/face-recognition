Face-recognition
================

It will automatically recognise your face, captured from a webcam


The system will recognise you face once 4 of your emotions is saved[happy,sad,worried,calm] with your name, then next time when you run the app it willdetect you face and say "Hi Master , good afternoon ". How does that sound :)

### Requirment

* Node.js
* Python
* Tornado
  I have currently developed it to talk in Mac with built os, you could install espeak/festival/dragonfly/speak and try for other operating system
Do 'npm install' from node folder to install all the required directory

### To run it

From root directory
* Node.js
	`node node/app.js`
* Tornado
	`python python/index.py`


### How It Works !

The front end part detects you head and once its done, it sends you image captured in html5 canvas to the backend python pyfaces, it then checks out using eigen faces and finds out a image corresponding to it[if available] and then searches csv files which saves name against image file name.


For testing face recognition you may try , from root directory
  `python pyfaces .\checkImage\test.png .\imagesDB\ 6 3`
  [the last two params are eignen values used]

