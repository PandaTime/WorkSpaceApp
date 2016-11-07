var passport = require('passport'),
    Verify = require('./verification'),
    User = require('./../schemes/admin');

var api = {};
module.exports = api;

api.autherID = [];

api.login = function(req, res){
    passport.authenticate('local', function(err, user, info){
        if(err){
            return res.status(520).json({err});
        }
        if(!user){
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function(err){
            if(err){
                return res.status(500).json({
                    err: 'Could not log in a user'
                });
            }
            var token = Verify.getToken(user);
            var minute = 60 * 1000;
            api.autherID.push(token);
            res.status(200).cookie('token', token, { maxAge: 30 * minute });
            res.json({
                token
            }).end();
        });
    })(req, res);
};

api.logout = function(req, res){
    req.logout();
    res.clearCookie('token');
    res.status(200).redirect('/');
};

api.register = function(req, res) {
    User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
        if (err) {
            return res.status(403).json({err: "Sorry. That username already exists. Try again."});
        }
        api.login(req, res);
    });
}