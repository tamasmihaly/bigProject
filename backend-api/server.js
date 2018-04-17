const express = require('express')
const path = require('path') // view filenál path genrál
const bodyParser = require('body-parser') //date parse-hoz
const mongoose = require('mongoose') // amikor a server elindul csatlakozik a mongoDB-hot
const db = require('./config/database') //konfig fájl hogy csatlakozzon
const helmet = require('helmet') //helmet security problémák megoldása
const morgan = require('morgan') // logolás
const logDirectory = path.join(__dirname, 'log') //morgan loghoz
const fs = require('fs') //filesystem modul
const https = require('https'); //minden esetben https kell használnunk
const passport = require('passport');
const postRouter = require('./routes/post.route');
const rfs = require('rotating-file-stream');
const app = express();
const passportLocalMongoose = require('passport-local-mongoose')


/**
 * Connect to MongoDB
 * hiba esetén kiírja a hibát egyébként connected
 */
mongoose.connect(db.uri, db.options).then(
    () => {
        console.log('MongoDB connected.')
    },
    err => {
        console.error('MongoDB error.:' + err)
    }
)



// Get view File Path
/*function view (path) {
  return __dirname + '/views/' + path
}*/

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// Parse application/json
app.use(bodyParser.json())

/**
 * Minden kérést logol az access.log-ban
 */

///////////////////////// logolás

// log dir ellenőrzés
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// napi logolás az access log fileba
app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode < 400
    }
}))
app.use(morgan('combined', {
    stream: rfs('access.log', {
        interval: '1d', // rotate daily
        path: logDirectory
    })
}))

//////////////////

// basic security, sok biztonsági lépést elvégez
app.use(helmet())

// Start Browser-Sync
/**
 * automatikusan refresselné az oldatl
 */
// if (app.get('env') === 'development') {
//   const browserSync = require('browser-sync')
//   const config = {
//     files: ['views/**/*.html'],
//     logLevel: 'info',
//     logSnippet: false,
//     reloadDelay: 3000,
//     reloadOnRestart: true
//   }
//   const bs = browserSync(config)
//   app.use(require('connect-browser-sync')(bs))
// }

// Home page
app.use('/post', postRouter)

// use https cert - git bash-t használj
// openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365
const httpsOptions = {
    key: fs.readFileSync('./sslcert/key.pem', 'utf8'),
    cert: fs.readFileSync('./sslcert/cert.pem', 'utf8'),
    passphrase: 'crudapi'
};

// // Start server
// const server = https.createServer(httpsOptions, app)
// server.listen(3000, function () {
//   console.log("server running at https://localhost:3000/")
// });

app.listen('3000')