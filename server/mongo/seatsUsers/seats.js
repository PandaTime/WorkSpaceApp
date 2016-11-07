'use strict';
var seatsModel = require('mongoose').model('seats');

var api = {};

module.exports = api;

api.update = function(seats){
    seatsModel.update({}, {data: seats}, function(err, data){
        if(err){
            console.log('ERROR: ', err);
        }
        else{
            console.log('Seats updated');
        }
    });
};
api.get = function(cb){
    seatsModel.findOne({}, function(err, data){
        if(err){
            console.log('ERROR: ', err);
        }
        else{
            cb(data);
        }
    });
}