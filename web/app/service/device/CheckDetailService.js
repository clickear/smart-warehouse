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
    DEVICE_INFO: '/device/check/details/list',/*   */
    SAVE:'/device/check/details/add',
    UPDATE:'/device/check/details/update',
    DELETE:'/device/check/details/delete',


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

