'user strict';

var websocket = require('websocket'), ws,
    clients = [],
    initData = {seats: [], users: []},
    seatsMongo = require('../mongo/seatsUsers/seats'),
    usersMongo = require('../mongo/seatsUsers/users'),
    seatsMongoData = false, // для подгрузки первоначальных данных
    usersMongoData = false, // для подгрузки первоначальных данных
    usersChanged = false,   // для записи в бд
    seatsChanged = false,   // для записи в бд
    idleTime = 30 * 1000; // сколько нужжно ожидать перед перезаписью
var api = {};

var count = 0;

var autherizedID = require('../mongo/admin/authorization').autherID;
var verification = require('../mongo/admin/verification');

module.exports = api;

api.initialize = function(server){
    ws = new websocket.server({
        httpServer: server,
        autoAcceptConnections: false
    });
    seatsMongo.get(getSeatsFromMongo.bind(this));
    usersMongo.get(getUsersFromMongo.bind(this));
    checkInit();
    updateDB();
};
function checkInit(){
    setTimeout(()=>{
        if(seatsMongoData && usersMongoData){
            init();
        }else{
            checkInit()
        }
    }, 1000);
}
function getSeatsFromMongo(data){
    initData.seats = data.data;
    seatsMongoData = true;
}
function getUsersFromMongo(data){
    initData.users = data.data;
    usersMongoData = true;
}

function updateDB(){
    setInterval(()=>{
        if(usersChanged){
            console.log('updating users..');
            usersChanged = false;
            usersMongo.update(initData.users);
        }
        if(seatsChanged){
            console.log('updating seats..');
            seatsChanged = false;
            seatsMongo.update(initData.seats);
        }
    }, idleTime);
}

function init() {
    console.log('WebSocket initiated..');
    ws.on('request', (req) => {
        let connection = req.accept('', req.origin);
        connection.id = getID();
        clients.push(connection);
        console.log('CONNECTED', connection.id);
        // sending default data
        connection.send(JSON.stringify({type: 'initialize', initData}));
        connection.on('message', (message) => {
            let msg;
            try {
                msg = JSON.parse(message.utf8Data);
            } catch (ex) {
                return;
            }
            // login and verification
            if (msg.type == 'LOGIN') {
				if(msg.token){
					verification.verifyOrdinaryUser(msg.token, connection, msg, processSocket);
				}				
            }else if(connection.userType){
				processSocket(null, connection, msg);
			}
            
        });
        connection.on('close', (reasonCode, description) => {
            clients = clients.filter((v)=>v.id != connection.id);
            console.log('Disconnected ' + connection.id);
        });
    });
    function processSocket(err, connection, msg, userType){
		if(userType){
			connection.userType = userType;
			console.log('userType', userType);
		}
        if(err){
            connection.send(JSON.stringify({type: 'error', data: 'not authorized'}));
            return;
        }
        if(msg.type == 'UPDATE_SEATS'){
            seatsChanged = true;
            initData.seats = msg.seats.map((v)=>copyObj(v));
            let dataSeat = JSON.stringify({
                type: 'UPDATE_SEATS',
                seats: initData.seats
            });
            clients.forEach((v)=>{
                if(connection.id != v.id){
					console.log('send', ++count);
                    v.send(dataSeat);
                }
            });
        }else if(msg.type == 'UPDATE_USERS'){
            usersChanged = true;
            initData.users = msg.users.map((v)=>copyObj(v));
            let dataUser = JSON.stringify({
                type: 'UPDATE_USERS',
                users: initData.users
            });
            clients.forEach((v)=>{
                if(connection.id != v.id){
                    v.send(dataUser);
                }
            });
        }else if(msg.type == "LOGOUT"){
            connection.token = '';
			connection.userType = '';
        }
    }
    function copyObj(el){
        var seat = {};
        Object.keys(el).forEach((v)=>{
            seat[v] = (typeof(el[v]) == 'object' && !!el[v]) ? Object.assign({}, el[v]) : el[v];
        });
        return seat;
    }
}

function getID(){return Math.random().toString(36).substr(2, 9)};

