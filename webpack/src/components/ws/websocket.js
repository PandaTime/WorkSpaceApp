import dataHandler from '../../reducers/dataHandler';

var socket = new WebSocket('ws://localhost:8080/');

export default socket;

socket.onopen = () => {
    // gonna send connection info in case there is token
    socket.send('connected');
    console.log('connected');
};
socket.onclose = () => {
    console.log('closed');
};
socket.onmessage = (event) => {
    var msg = JSON.parse(event.data);
    // initialize data;
    if(msg.type == 'initialize'){
        dataHandler.initialize(msg.initData.users, msg.initData.seats);
    }
    //console.log(msg);
};