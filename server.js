const express = require('express');
const app = express();
var path = require('path');
const bodyParser = require('body-parser');
// require('dotenv').load();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var routes = require('./api/routes/bikeRoute'); //importing route
// routes(app);
app.use('/', routes);
app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' });
});


// const db = require('./api/Config/db');
// db.authenticate()
// .then(() => {
//   console.log('Connection has been established successfully.');
// })
// .catch(err => {
//   console.error('Unable to connect to the database:', err);
// });

app.listen(port);
console.log('RESTful API server started on: ' + port);
