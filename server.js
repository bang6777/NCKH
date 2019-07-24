// const http = require('http');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
// var session = require('express-session');
// const passport = require('passport');
var path = require('path');
const bodyParser = require('body-parser');
// app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret
// app.use(passport.initialize());
// app.use(passport.session());
// // require('dotenv').load();

// // import passport and passport-jwt modules

// const passportJWT = require('passport-jwt');
// // ExtractJwt to help extract the token
// let ExtractJwt = passportJWT.ExtractJwt;
// // JwtStrategy which is the strategy for the authentication
// let JwtStrategy = passportJWT.Strategy;
// let jwtOptions = {};
// jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// jwtOptions.secretOrKey = 'tbtlh';


// io.on("connection", function (socket) {
//   console.log("a user connected " + socket.id);
//   socket.on("disconnect", function () {
//     console.log("a user disconnected " + socket.id);
//   });
//   socket.on("Client-send-connect", function (data) {
//     console.log("Node MCU send: " + data);
//   });
//   socket.on("hardware-send-location", function (location) {
//     console.log("hardware send location: " + location);
//     socket.broadcast.emit("Server-send-location", location);
//   });
//   socket.on("Client-send-unlock", function (data) {
//     console.log("Client send unlock: " + data);
//     socket.broadcast.emit("Server-send-unlock", data);
//   });
// });

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

var routes = require("./api/routes/bikeRoute"); //importing route
// routes(app);
app.use("/", routes);
app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

// socket io
var http = require('http').createServer(app);
var io = require('socket.io')(http);
//var server = require("http").Server(app);
//var io = require("socket.io")(server);

io.on('connection', function (socket) {
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

});
http.listen(port);
console.log('RESTful API server started on: ' + port);
