'use strict';

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
var i=0;

io.on('connection', (socket) => {
  i++;
  console.log('user connected: ' +i);
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
    i--;
  });
  
  socket.on('add-message', (message) => {
    io.emit('message', {type:'new-message', text: message});   
    io.emit('hello',{type:'greeting',text:'Hello!'+message});
  });
});

http.listen(5000, () => {
  console.log('started on port 5000');
});
