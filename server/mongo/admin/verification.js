
var jwt = require('jsonwebtoken'),
    config = require('./../../config/config');

var api = {};
module.exports = api;

api.getToken = function(user){
    return jwt.sign(user, config.secretKey,{
        expiresIn: 3600
    });
};
api.verifyOrdinaryUser = function(token, connection, msg, cb){
    if(token){
        //verify secret and checks expiration time
        jwt.verify(token, config.secretKey, function(err, decoded){
            return err ? cb(true, connection, msg) : cb(false, connection, msg, decoded._doc.admin);
        });
    } else
        return cb(true, connection, msg);
};

api.verifyUserName = function(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;
    if(token){
        jwt.verify(token, config.secretKey, function(err, decoded){
            if(err){
                req.body.username = config.defaultUserName;
                next();
            }
            else{
                req.body.username = decoded._doc.username;
                next();
            }
        });
    }else{
        req.body.username = config.defaultUserName;
        next()
    }
}