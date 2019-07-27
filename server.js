// const http = require('http');
const express = require("express");
const app = express();
var session = require("express-session");
// const passport = require('passport');
var path = require("path");
const bodyParser = require("body-parser");
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true })); // session secret

// import passport and passport-jwt modules
passport = require("./api/controller/passport").getPassport(); //Define Passport
app.use(passport.initialize());
// app.use(passport.session());

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

var routes = require("./api/routes/bikeRoute"); //importing route
var routes_android = require("./api/routes/api/api");
// routes(app);
app.use("/", routes);
app.use("/v1/", routes_android);
app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

// socket io
var http = require("http").createServer(app);
var io = require("socket.io")(http);
//var server = require("http").Server(app);
//var io = require("socket.io")(server);

svSocket = require("./server-socket.io");
io.on("connection", svSocket.eventSocket);

http.listen(port);
console.log("RESTful API server started on: " + port);

require("./api/Model/createDataTest").initDatabase();
