'use strict';
var usersModel = require('mongoose').model('seatUsers');

var api = {};

module.exports = api;

api.update = function(users){
    usersModel.update({}, {data: users}, function(err, data){
        if(err){
            console.log('ERROR: ', err);
        }
        else{
            console.log('Seats updated');
        }
    });
};
api.get = function(cb){
    usersModel.findOne({}, function(err, data){
        if(err){
            console.log('ERROR: ', err);
        }
        else{
            cb(data);
        }
    });
}