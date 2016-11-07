var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    admin:{
        type: Boolean,
        default: false
    }
});

User.plugin(passportLocalMongoose);
var userModel = mongoose.model('User', User);
userModel.find({}).exec(function (err, data) {
    if(data.length == 0){
        console.log("Initialization of the users..");
        initQueriesCache(userModel);
    }
});

function initQueriesCache(userModel){
    var pwd = '123';
    userModel.register(
        new userModel({username: 'admin', admin: true}),
        pwd,
        function(err){
            if(err) console.log(err);
        }
    );
};

module.exports = userModel;