var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var scoresRouter = require('./routes/smartcar');

const mongoose = require('mongoose');
const mongo_url = 'mongodb://usethistoedit:editme123@ds123444.mlab.com:23444/yhack2018_smartcar';
// const mongo_url = 'mongodb://localhost:27017/example';
mongoose.connect(mongo_url, {useNewUrlParser:true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('err', console.log.bind(console, 'mongo connection error'));

var app = express();
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/', scoresRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
app.listen(8000);

