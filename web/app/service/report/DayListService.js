'use strict';
/**
 * @type {*}
 */
let underscore = require('underscore');
let RestifyProxy = require('../../util/RestifyProxy');
let StringUtil = require('../../util/StringUtil');
let Constant = require('../../model/Constant');
let baseService = require('./../BaseService');
const URI = {
    LIST: '/inventory/reports/list',/*   */


};

/**
 * 获取-
 * @param thiz
 * @returns {Promise}
 */
module.exports.List = function (thiz, params) {
    return baseService.get(thiz, URI.LIST, params);
};



