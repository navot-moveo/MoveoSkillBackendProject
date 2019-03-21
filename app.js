'use strict';

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongo = require('./db/mongooseinit');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var apiRoutes = require('./api/v1/routes/apiRoutes');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var port = process.env.port || 3000;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.listen(port, function(){
  console.log("server is listening....");
});


//todo change the routes here to my routes
//app.use('/', indexRouter);
//app.use('/users', usersRouter);
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


app.get('/', (req, res) => {
  res.send("Moveo skill final project, server is listening.....")
});
module.exports = app;
