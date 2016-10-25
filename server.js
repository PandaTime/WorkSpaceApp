var express = require('express'),
    config = require('./server/config/config'),
	path = require('path'),
	bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser');
	
//initializating Mongo
//require('./server/mongo/mongoooseSetup').initialize();

// initializating Server
var app = express();
app.use(bodyParser.json());


 app.use(cookieParser('my secret here'));
 app.use(bodyParser.urlencoded({ extended: false }));

// default
app.use(express.static(path.normalize(config.rootPath + '/public')));

require('./server/routes/routes')(app, config);
app.listen(config.port,()=>{console.log(`Listening on port ${config.port}..`)});