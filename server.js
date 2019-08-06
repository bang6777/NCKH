// const http = require('http');
const express = require("express");
const app = express();
var session = require("express-session");
// const passport = require('passport');
var path = require("path");
const bodyParser = require("body-parser");
flash = require('connect-flash');
// app.use(express.cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true })); // session secret
app.use(flash());

// import passport and passport-jwt modules
passport = require("./api/controller/passport").getPassport(); //Define Passport
app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

var routes = require("./api/routes/bikeRoute"); //importing route
var routes_android = require("./api/routes/api/api");
var routes_locker = require("./api/routes/api/api_locker");
// routes(app);
app.use("/", routes);
app.use("/v1/", routes_locker);
app.use("/v1/", routes_android);
app.get("/init_db",function(req,res){
  require("./api/Model/createDataTest").initDatabase();
  res.status(200).send("Đã tạo thành công cơ sở dữ liệu ảo !");
});
app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

// socket io
var http = require("http").createServer(app);
// var io = require("socket.io")(http);
//var server = require("http").Server(app);
//var io = require("socket.io")(server);

// svSocket = require("./server-socket.io");
// io.on("connection", svSocket.eventSocket);

http.listen(port);
console.log("RESTful API server started on: " + port);
console.log("Thời gian hoạt động trên máy chủ là: "+Date(Date.now()).toString());
const date = new Date('2012-01-26 13:51');

console.log(date.toString());

// require("./api/Model/createDataTest").initDatabase();

// ----------------------NOTE: CHANGE TIME ZONE HEROKU -----------------
// heroku config:add TZ="Asia/Ho_Chi_Minh"

