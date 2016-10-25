var express = require('express'),
	path = require('path');

var config = require('./../config/config');

module.exports = function(app, config){
	app.all('*', function(req, res, next){
		console.log(req.url);
		console.log(req.body);
		next();
	});

	app.get('*', function(req, res){
        res.sendFile(config.publicPath + '\\index.html');
    });
};