require 'webrick'
server = WEBrick::HTTPServer.new(:Port=>1234,:DocumentRoot=>Dir::pwd )
trap("INT"){ server.shutdown }
server.start
