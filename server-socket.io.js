exports.eventSocket = function (socket) {
    console.log('a user connected ' + socket.id);
    socket.on('disconnect', function () {
      console.log('a user disconnected ' + socket.id);
    });
    socket.on('Client-send-connect', function (data) {
      console.log('Node MCU send: ' + data);
    });
    socket.on('hardware-send-location', function (data) {
      console.log('hardware send location: ' + data);
      socket.broadcast.emit("Server-send-location", data);
    });
    socket.on('hardware-send-location1', function (data) {
      console.log('hardware send location: ' + data);
      socket.broadcast.emit("Server-send-location1", data);
    });
    socket.on('Client-send-unlock', function (data) {
      console.log('Client send unlock: ' + JSON.stringify(data));
      socket.broadcast.emit("Server-send-unlock", "unlock");
      if (data.unlock) {
        socket.broadcast.emit("Server-send-unlock", "unlock-2");
      }
  
    });
}