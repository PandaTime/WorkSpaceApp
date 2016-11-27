var express = require('express'),
    config = require('./server/config/config'),
	path = require('path'),
	bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
	LocalStrategy = require('passport-local').Strategy,
	passport = require('passport'),
	User = require('./server/mongo/schemes/admin');
    http = require('http');
	
//initializating Mongo
require('./server/mongo/mongooseSetup').initialize();

// initializating Server
var app = express();
app.use(bodyParser.json());


app.use(cookieParser('my secret here'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// default
app.use(express.static(path.normalize(config.rootPath + '/public')));

require('./server/routes/routes')(app, config);
//app.listen(config.port,()=>{console.log(`Listening on port ${config.port}..`)});

var server = http.createServer(app);
console.log('port', config.port);
server.listen(config.port, ()=>{console.log(`Listening on port ${config.port}..`)});

// initializing WebSocket server
require('./server/ws/wsServer').initialize(server);
