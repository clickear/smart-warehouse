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
    CELL: '/cell/infos/list',/* 查看货位列表 */
    SAVE:'/cell/infos/insert',
    SEVE_ALL:'/cell/infos/batchAdd',
    UPDATE:'/cell/infos/update'

};

/**
 * 获取-货位列表
 * @param thiz
 * @returns {Promise}
 */
module.exports.getCell= function (thiz, params) {
    return baseService.get(thiz, URI.CELL, params);
};

/**新建货位*/
module.exports.createCell  = function (thiz, params) {
    return baseService.post(thiz, URI.SAVE, params);
};

/**批量货位*/
module.exports.createCellAll  = function (thiz, params) {
    return baseService.post(thiz, URI.SEVE_ALL, params);
};

/**修改货位*/
module.exports.update  = function (thiz, params) {
    return baseService.post(thiz, URI.UPDATE, params);
};

