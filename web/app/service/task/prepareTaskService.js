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
    LIST:'/prepare/tasks/list',
    INSERT:'/prepare/tasks/prepareTask'

};

/**
 * 获取-未上架数量
 * @param thiz
 * @returns {Promise}
 */
module.exports.list = function (thiz, params) {
    return baseService.get(thiz, URI.LIST, params);
};

/**
 *
 * @param thiz
 * @returns {Promise}
 */
module.exports.insert = function (thiz, params) {
    return baseService.get(thiz, URI.INSERT, params);
};

