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
    DEVICE_INFO: '/check/results/list',/*   */
    SAVE:'/check/results/insert',
    UPDATE:'/check/results/update',
    DELETE:'/check/results/delete',
    RESULT:'/check/results/result',



};

/**
 * 获取- 列表
 * @param thiz
 * @returns {Promise}
 */
module.exports.list = function (thiz, params) {
    return baseService.get(thiz, URI.DEVICE_INFO, params);
};

/**新建 */
module.exports.create  = function (thiz, params) {
    return baseService.post(thiz, URI.SAVE, params);
};

/**更新 */
module.exports.update  = function (thiz, params) {
    return baseService.post(thiz, URI.UPDATE, params);
};

/**删除 */
module.exports.delete  = function (thiz, params) {
    return baseService.get(thiz, URI.DELETE, params);
};

/**检查结果 */
module.exports.result  = function (thiz, params) {
    return baseService.post(thiz, URI.RESULT, params);
};

