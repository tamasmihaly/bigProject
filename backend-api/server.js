const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan'); // logolás
const path = require('path'); // view filenál path genrál
const bodyParser = require('body-parser'); //date parse-hoz
const cookieParser = require("cookie-parser");
const helmet = require('helmet'); //helmet security problémák megoldása
const fs = require('fs'); //filesystem modul
const https = require('https'); //minden esetben https kell használnunk
const userRouter = require('./routes/user.route');
const blogpostRouter = require('./routes/post.route');
const cors = require('cors');
const rfs = require('rotating-file-stream');
const passportLocalMongoose = require('passport-local-mongoose');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const User = require('./models/user');
const db = require('./config/database.js')

const app = express();

const logDirectory = path.join(__dirname, 'log'); // morgan loghoz

const port = process.env.PORT || 8080;

// csatlakozás a mongódbhez
mongoose.connect(db.uri, db.options, () => {
    console.log('mongoDB connected');
}, err => {
    console.log('mongoDB error: ' + err)
})


/**
 * Logolás
 * napi szintent
 */
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
// napi logolás az access log fileba skippelés így
let accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
})
//combinált formátum
app.use(morgan('combined', {
    stream: accessLogStream,
    skip: function (req, res) {
        return res.statusCode < 400
    }
}))

// basic security, sok biztonsági lépést elvégez
app.use(helmet());

//
app.use(cors());


// Parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

//
app.use(cookieParser());

app.use(session({
    secret: 'YOUR_SECRET_KEY',
    resave: true,
    saveUninitialized: true
}));


// passport auth

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', userRouter)
app.use('/post', blogpostRouter)

//start
app.listen(port)
console.log("The magic happens at: " + port)