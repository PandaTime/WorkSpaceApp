var express = require('express'),
    config = require('./server/config/config'),
	path = require('path'),
	bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    websocket = require('websocket'),
    http = require('http');
	
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
//app.listen(config.port,()=>{console.log(`Listening on port ${config.port}..`)});

var server = http.createServer(app);

server.listen(config.port,()=>{console.log(`Listening on port ${config.port}..`)});

var ws = new websocket.server({
    httpServer: server,
    autoAcceptConnections: false
});

var clients = [];

var initData = {
    seats: [{
        id: "xfx175wh1",
        name: 'WINNER',
        x: 557,
        y: 141,
        radius: 20,
        floor: 8,
        fillStyle: 'rgba(147, 197, 114, 0.8)',
        assignedTo: {id: "o7hxd78d7", firstName: "GOOD", surName: "BEST"}
    }],
    users: [{
        id: "o7hxd78d7",
        firstName: "GOOD",
        surName: "BEST",
        seat: {
            id: "xfx175wh1",
            name: "WINNER"
        }
    }]
};

ws.on('request', (req) => {
    let connection = req.accept('', req.origin);
    clients.push(connection);
    console.log('Connected ' + connection.remoteAddress);

    // sending default data
    connection.send(JSON.stringify({type: 'initialize', initData}));
    
    connection.on('message', (message) => {
        let dataName = message.type + 'Data',
            data = message[dataName];
        console.dir(message);
        console.log('Received: ' + data);
        clients.forEach((client) => {
            if (connection !== client) {
                client.send(data);
            }
        });
    });
    connection.on('close', (reasonCode, description) => {
        console.log('Disconnected ' + connection.remoteAddress);
    });
});