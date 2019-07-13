'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');

/**
 * 运营管理-页面
 */
module.exports.runPage = function () {
    let response = new Response();
    response.render('back/run/run');
    this.resolve(response);
};

