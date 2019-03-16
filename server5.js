var express = require('express');
const app = new express();
var server = require('http').Server(app);
const io = require('socket.io')(server);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/www/chat.html');
});

io.on('connection', socket => {
  console.log('a user connected ' + socket.id);
  socket.on('disconnect', function(){
    console.log('user disconnected ' + socket.id);
  });

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

server.listen(8080,() => {
  console.log(`Server is started at port 8080`);
})
