var createError = require('http-errors');
var express = require('express');
const session = require('express-session')   
var FileStore = require('session-file-store')(session);


var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser"); 

var indexRouter = require('./routes/index');
const loginRouter = require('./routes/login')
const signUpRouter = require('./routes/signup');
const adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');

const sql = require('./sql')

const TWO_HOURS = 1000 * 60 * 60 * 2
const {
  NODE_ENV = 'dev',
  SESS_LIFETIME = TWO_HOURS
} = process.env


var app = express()

app.use(session({
  key: 'sid',
  secret: 'sseeccrreett',
  resave: false,
  saveUninitialized: true,
  store: new FileStore,
  cookie: {
      maxAge: SESS_LIFETIME
  }
}))

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({ extended: false }));

function cb(username, password, done) {
      let userInfo = sql.query(`SELECT * FROM users where id='${username}';`)
      console.log(userInfo)
      if(userInfo.length===0) {  // Invalid ID
        return done(null, false, { message: 'Incorrect username'})
      }
      if(userInfo[0].pw.trim() !== password.trim()) {  // Invalid Password
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, userInfo[0])

}

passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pw'
  },cb))

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  done(null, id)
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter)
app.use('/sign_up', signUpRouter)
app.use('/admin', adminRouter)
app.use('/users', usersRouter);

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

module.exports = app
