require('dotenv').config(); //added
//added

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet'); //added security

var cors = require('cors')
var mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
const gameRouter = require("./routes/game.route")
const postRouter = require('./routes/post')

const PORT = process.env.PORT; //added


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());  //added security
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"})); //added security
app.set('trust proxy', 1);
app.enable('trust proxy');

app.use(
    cors({
      origin: [process.env.REACT_APP_URI]  // <== URL of our future React app
    })
  );

// app.use(
//     cors()
//   );

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/post', postRouter); //added
app.use('/auth', authRouter);
app.use('/games', gameRouter)

app.use((req, res, next) => {   //added
  // Middleware to disable CORS
  res.header("Access-Control-Allow-Origin", "*");   //added
  next();   //added
});  

//added maybe for later

// app.get("/books/:bookId/details", (req, res, next) => {
//   console.log("req.params -> ", req.params);
  
//   res.send(req.params);
// });

mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

module.exports = app;
