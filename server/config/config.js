var path = require('path');

module.exports = {
    rootPath: path.normalize(__dirname + '/../../'),
	publicPath : path.normalize(__dirname + '/../../public'),
    port: process.env.PORT || 8080,
    db: 'mongodb://admin:admin@ds061076.mlab.com:61076/omdbfilms',
    // needed values for correct omdb requests
    elemPerPage: 10, // omdb value
    maximumDelayTime: 5000,
    cache:{
        queryCache : 'queryCache'
    },
	secretKey: '12345-67890-09876-54321',
    defaultUserName: 'Anonymous'
}