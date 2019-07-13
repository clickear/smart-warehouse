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
    SHELF: '/shelf/infos/list',/* 查看租赁退板列表 */
    SAVE:'/shelf/infos/insert',
    UPDATE:'/shelf/infos/update',
    DELETE:'/shelf/infos/delete',

};

/**
 * 获取-托盘租赁退板列表
 * @param thiz
 * @returns {Promise}
 */
module.exports.getShelf = function (thiz, params) {
    return baseService.get(thiz, URI.SHELF, params);
};

/**新建货架*/
module.exports.createShelf  = function (thiz, params) {
    return baseService.post(thiz, URI.SAVE, params);
};
/**更新货架*/
module.exports.updateShelf  = function (thiz, params) {
    return baseService.post(thiz, URI.UPDATE, params);
};
/**删除货架*/
module.exports.deleteShelf  = function (thiz, params) {
    return baseService.get(thiz, URI.DELETE, params);
};

