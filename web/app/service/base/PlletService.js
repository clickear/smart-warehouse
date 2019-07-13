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
    LIST: '/pallets/list',/* 查看租赁退板列表 */
    SAVE:'/pallets/insert',
    UPDATE:'/pallets/update',
    DELETE:'/pallets/delete',
    BATCH:'/pallet/batchs/getCellInfo',

};

/**
 * 获取-托盘租赁退板列表
 * @param thiz
 * @returns {Promise}
 */
module.exports.getPllet = function (thiz, params) {
    return baseService.get(thiz, URI.LIST, params);
};

/**新建货架*/
module.exports.insertPllet  = function (thiz, params) {
    return baseService.post(thiz, URI.SAVE, params);
};
/**更新货架*/
module.exports.updatePllet  = function (thiz, params) {
    return baseService.post(thiz, URI.UPDATE, params);
};
/**删除货架*/
module.exports.deletePllet  = function (thiz, params) {
    return baseService.get(thiz, URI.DELETE, params);
};

/** */
module.exports.batch  = function (thiz, params) {
    return baseService.get(thiz, URI.BATCH, params);
};

