import dataHandler from '../../reducers/dataHandler';
import initValues from '../home/initValues';
require('es6-promise').polyfill();
require('isomorphic-fetch');
var socket = new WebSocket('ws://' + window.location.href.replace(/(http:\/\/|https:\/\/)/g, '')),
    api = {};

export default api;

api.init = function(store){
    api.store = store;
    api.store.subscribe(handleChange);
};

api.logout = function(){
    dataHandler.logout();
    fetch('/logout', {
        credentials: 'same-origin',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    socket.send(JSON.stringify({type: 'LOGOUT'}));
}

api.autherization = function(login, pwd){
    fetch('/login', {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: login,
            password: pwd,
        })
    }).then((res)=>{
        return res.text();
    }).then((body)=>{
        return JSON.parse(body);
    }).then((body)=>{
        if(body.token){
            dataHandler.login(login);
            socket.send(JSON.stringify({type:'LOGIN', token: body.token}));
        }
    });
}

api.updateSeats = function(seats){
    if(changeSource(api.store.getState())==initValues.changeSource.user) {
        socket.send(JSON.stringify({type: 'UPDATE_SEATS', seats}));
    }
};
api.updateUsers = function(users){
    if(changeSource(api.store.getState())==initValues.changeSource.user){
        socket.send(JSON.stringify({type:'UPDATE_USERS', users}));
    }
};

function handleChange(){
    var {users, seats} = getUsersSeatsArr(api.store.getState());
    api.updateSeats(seats);
    api.updateUsers(users);
}
function getUsersSeatsArr(state){
    return {users: state.arrUsersReducer, seats: state.arrSeatsReducer};
}
function changeSource(state){
    return state.dataSourceReducer;
}

socket.onopen = () => {
    // gonna send connection info in case there is a token
    socket.send('connected');
    console.log(socket);
    console.log('connected');
};
socket.onclose = () => {
    console.log('closed');
};
socket.onmessage = (event) => {
    let msg = JSON.parse(event.data);
    // initialize data;
    if(msg.type == 'initialize'){
        dataHandler.initialize(msg.initData.users, msg.initData.seats);
    }else if(msg.type == 'UPDATE_SEATS'){
        dataHandler.updateSeats(msg.seats);
    }else if(msg.type == 'UPDATE_USERS'){
        dataHandler.updateUsers(msg.users);
    }else{
        console.log(msg);
    }

};