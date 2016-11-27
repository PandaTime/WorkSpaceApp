var config = require('./../config/config'),
    mongoose = require('mongoose');


exports.initialize = function(){
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'error..'));
    db.on('open', function callback() {
        console.log('connected to db');
    });
};
// initialization of the models
require('./schemes/seats');
require('./schemes/users');
