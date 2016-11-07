var express = require('express'),
	path = require('path'),
	userHandler = require('../handlers/userHandler');

var config = require('./../config/config');

module.exports = function(app, config){
	app.all('*', function(req, res, next){
		console.log(req.url);
		//console.log(req.body);
		next();
	});
	app.post('/login', function(req, res){
		userHandler.login(req, res);
	});
	app.get('/logout', userHandler.logout);
	app.get('/images/:name', function(req, res){
		res.sendFile(path.join(__dirname, '../images', 'floor18.svg'));
	});
	app.get('*', function(req, res){
        res.sendFile(config.publicPath + '\\index.html');
    });
};