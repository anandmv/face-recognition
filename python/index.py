import tornado.ioloop
import tornado.web
from os import system
from time import strftime

class MainHandler(tornado.web.RequestHandler):
    def get(self):
    	system('say Hai How are you, Your face looks pretty good today!')
        self.write("ok")

class TalkHandler(tornado.web.RequestHandler):
    def get(self):
    	talk = self.get_argument('talk', True)
    	system('say '+talk)
        self.write("ok")
        
class TalkHiHandler(tornado.web.RequestHandler):
    def get(self):
    	name = self.get_argument('name', True)
    	gretting = "Morning"
    	timeG = strftime("%H")
    	if timeG > 18 :
    		gretting = "Evening"
    	elif timeG >12 :
    		gretting = "Afternoon"
    	system('say Hi '+name+' , Good '+gretting )
        self.write("ok")

application = tornado.web.Application([
    (r"/hai", MainHandler),
    (r"/say", TalkHandler),
    (r"/sayHi", TalkHiHandler)
])

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
