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
    WAREHOUSE: '/ware/infos/list',/* 查看租赁退板列表 */
    SAVE:'/ware/infos/insert',
    UPDATE:'/ware/infos/update',
    DELETE:'/ware/infos/delete',


};

/**
 * 获取-仓库列表
 * @param thiz
 * @returns {Promise}
 */
module.exports.getWare = function (thiz, params) {
    return baseService.get(thiz, URI.WAREHOUSE, params);
};

/**新建仓库*/
module.exports.createWare  = function (thiz, params) {
    return baseService.post(thiz, URI.SAVE, params);
};

/**更新仓库*/
module.exports.updateWare  = function (thiz, params) {
    return baseService.post(thiz, URI.UPDATE, params);
};

/**删除仓库*/
module.exports.deleteWare  = function (thiz, params) {
    return baseService.get(thiz, URI.DELETE, params);
};

