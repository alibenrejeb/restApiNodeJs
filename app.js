var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

// mongoose.connect('mongodb://localhost:27017/urlAPI');
// mongoose.connect('mongodb://username:password@cluster0-shard-00-00-xrajz.mongodb.net:27017,cluster0-shard-00-01-xrajz.mongodb.net:27017,cluster0-shard-00-02-xrajz.mongodb.net:27017/dbapi?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
try {
    var driver = 'mongodb://dbapi:dbapi@ds157529.mlab.com:57529/scomperleur';
    mongoose.connect(driver);
    var db = mongoose.connection;
    db.once('open', function() {
        console.log('is connected ' + db.readyState);
    });
} catch (e) {
    console.error(e.toString());
}

var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');

var app = express();

// process.env.PORT = 3001
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Initiat passportjs
var User = require('./models/users');
app.use(passport.initialize());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', index);
app.use('/users', users);
app.use('/api', api)

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