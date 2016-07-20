var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var models = require("./models");

var app = express();

var PORT = process.env.PORT || 80;

app.use(logger('dev'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(require('express-session')({
  secret: 'eventsoccurinrealtime',
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: ( 4 * 60 * 60 * 1000 ) // 4 hours
  }
}));

var route = require('./routes/route.js');
route.routes(app);



models.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("Listening on: " + PORT)
  });
});
