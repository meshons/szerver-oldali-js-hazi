let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let sassMiddleware = require('node-sass-middleware');

let session = require('express-session');
let bodyParser = require('body-parser');

let indexRouter = require('./routes/index');
let authRouter = require('./routes/auth');
let beersRouter = require('./routes/beers');

let mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

let app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  key: "user_sid",
  secret: 'supersecretrandom',
  resave: false,
  saveUninitialized: true,
  cookie: { expires: 60000 }
}));

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', beersRouter);

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

mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
}).then(() => console.log('DB Connected!'))
    .catch(err => {
      console.log(`DB Connection Error: ${err.message}`);
    });

module.exports = app;
