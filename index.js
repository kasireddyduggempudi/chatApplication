const express = require("express");
const socket = require("socket.io");

var app = express();

var server = app.listen(4000, ()=>{
    console.log("connected on port 4000");
})


app.use(express.static(__dirname+"/public"))

// Socket connection setup & pass chat data
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat message event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle "user is typing" event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});