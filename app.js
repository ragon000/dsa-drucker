var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var index = require('./routes/index');
var zauber = require('./routes/zauber');
var rituale = require('./routes/rituale');
var tricks= require('./routes/tricks');

var zeremonien= require('./routes/zeremonien');
var segnungen= require('./routes/segnungen');
var litrugien= require('./routes/litrugien');
// scrape.scrape((cb)=>{
// console.log(cb);
// });

var app = express();
app.use(compression());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/stylesheets/w3.css', express.static(path.join(__dirname, 'node_modules/w3-css/w3.css')));
app.use('/', index);

app.use('/zauber', zauber);
app.use('/tricks', tricks);

app.use('/rituale', rituale);
app.use('/segnungen', segnungen);
app.use('/zeremonien', zeremonien);
app.use('/litrugien', litrugien);








// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
