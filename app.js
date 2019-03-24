'use strict';


var express = require('express');


var mongo = require('./db/mongooseinit');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var apiRoutes = require('./api/v1/routes/apiRoutes');

var port = process.env.port || 3000;
var app = express();

app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());


app.use('/api/',apiRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  if(err.message === undefined){
    res.send(err);
  } else{
    res.send(err.message);
  }
});



module.exports = app;
