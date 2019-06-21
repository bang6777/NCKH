const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// require('dotenv').load();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let routes = require('./api/routes/TK_routes'); //importing route
routes(app);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'});
});

const db = require('./api/Config/db');
db.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

app.listen(port);
console.log('RESTful API server started on: ' + port);
