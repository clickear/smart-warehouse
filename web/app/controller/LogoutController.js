'use strict';
let Response = require('../model/Response');
let StatusCode = require('../model/StatusCode');
let logger = require('../util/LoggerUtil').logger('LoginController');
let passport = require('passport');
let config = require('../../config');

/**
 * 退出
 */
module.exports.logout = function () {
    this.req.session.destroy(function () {
        this.req.logout();
        this.resolve(new Response('render', 'login'));
    }.bind(this));
};
module.exports.logoutPage = function () {
    this.resolve(new Response('render', 'logout'));
};
