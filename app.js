const express = require('express'),
exphbs = require('express-handlebars'),
app = express(),
server = require('http').createServer(app),
passport = require('passport'),
util = require('util'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
session = require('express-session'),
RedisStore = require('connect-redis')(session),
GoogleStrategy = require('passport-google-oauth2').Strategy,
PORT = process.env.PORT || 3000;

// API Access link for creating client ID and secret:
// https://code.google.com/apis/console/
const GOOGLE_CLIENT_ID = "319083739424-co5ollte0dclmg00spkhg111c3l8bah4.apps.googleusercontent.com",
GOOGLE_CLIENT_SECRET = "QvJTj_l8BgVGrqZjnSxDyp5M";

var mongoose = require("mongoose");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

var apirouter = require('./controllers/dataapis');


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Google profile is
//   serialized and deserialized.
passport.serializeUser(function(user, done) {
done(null, user);
});

passport.deserializeUser(function(obj, done) {
done(null, obj);
});


// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
},

function(request, accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function() {
        // To keep the example simple, the user's Google profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Google account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
    });
}
));

// Configure Views using handlebars
app.engine("handlebars", exphbs({
defaultLayout: "main"
}));
app.set("view engine", "handlebars");
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
// Adding Cookie Parser
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));

//Creating user session for login
app.use(session({
secret: 'cookie_secret',
name: 'kaas',
proxy: true,
resave: true,
saveUninitialized: true
}));
//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

var allowCrossDomain = function(req, res, next) {
if ('OPTIONS' == req.method) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send(200);
} else {
    next();
}
};
app.use(allowCrossDomain);

//Call controllers
require('./controllers/routes.js')(app, passport);

// Configure api path
var apirouter2 = require('./controllers/dataApi2');
//Changed to use ApiRouter2
app.use('/api', apirouter2);
app.use('/api', apirouter);
// Database configuration with mongoose
// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var dburistring = process.env.MONGODB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/pacs';

// // MongoDB Configuration
// mongoose.connect("mongodb://heroku_4c80hglr:ctpgelbtcm86l2vuut6040o7q2@ds135364.mlab.com:35364/heroku_4c80hglr");
// const db = mongoose.connection;

var promise = mongoose.connect(dburistring, {
  useMongoClient: true,
  /* other options */
});

promise.then(function(db) {


   console.log("Mongoose connection successful.");
});

//Create server
app.listen(PORT, function() {
console.log("App listening on PORT " + PORT);
});