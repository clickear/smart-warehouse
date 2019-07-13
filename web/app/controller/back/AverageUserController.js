'use strict';
let Response = require('../../model/Response');
let RestifyProxy = require('../../util/RestifyProxy');

/**
 * 在线客服-页面
 */
module.exports.averageUserPage = function () {
    let response = new Response();
    response.render('back/customer/average-user');
    this.resolve(response);
};