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
    LIST: '/units/list',/* 查看租赁退板列表 */
    SAVE:'/units/insert',
    UPDATE:'/units/update',
    DELETE:'/units/delete',

};

/**
 * 获取-托盘租赁退板列表
 * @param thiz
 * @returns {Promise}
 */
module.exports.getUnit = function (thiz, params) {
    return baseService.get(thiz, URI.LIST, params);
};

/**新建货架*/
module.exports.insertUnit  = function (thiz, params) {
    return baseService.post(thiz, URI.SAVE, params);
};
/**更新货架*/
module.exports.updateUnit  = function (thiz, params) {
    return baseService.post(thiz, URI.UPDATE, params);
};
/**删除货架*/
module.exports.deleteUnit  = function (thiz, params) {
    return baseService.get(thiz, URI.DELETE, params);
};

