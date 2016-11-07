var autherize = require('../mongo/admin/authorization')
    verification = require('../mongo/admin/verification');
var api = {};

module.exports = api;

api.login = autherize.login;
api.logout = autherize.logout;
api.verifyOrdinaryUser = verification.verifyOrdinaryUser;